"use client";

import { Loader2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useFileUpload } from "@/hooks/use-file-uploads";
import { cn } from "@/lib/utils";

interface AvatarUploadProps {
  maxSize?: number;
  className?: string;
  onUploadComplete?: (url: string) => void;
  defaultAvatar?: string;
  userName?: string;
}

export function AvatarUpload({
  maxSize = 2 * 1024 * 1024, // 2MB
  className,
  onUploadComplete,
  defaultAvatar,
  userName = "U",
}: AvatarUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(defaultAvatar || "");

  const [
    { files, isDragging, errors },
    {
      removeFile,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      getInputProps,
    },
  ] = useFileUpload({
    maxFiles: 1,
    maxSize,
    accept: "image/*",
    multiple: false,
  });

  const currentFile = files[0];
  const previewUrl = currentFile?.preview || uploadedUrl;

  const handleRemove = () => {
    if (currentFile) {
      removeFile(currentFile.id);
    }
    setUploadedUrl("");
    onUploadComplete?.("");
  };

  const uploadToS3 = async (file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "avatar");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Upload failed");
      }

      const data = await response.json();
      setUploadedUrl(data.url);
      onUploadComplete?.(data.url);
      toast.success("Avatar uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to upload avatar",
      );
      if (currentFile) {
        removeFile(currentFile.id);
      }
    } finally {
      setIsUploading(false);
    }
  };

  // Auto-upload when file is selected
  if (
    currentFile &&
    currentFile.file instanceof File &&
    !isUploading &&
    !uploadedUrl
  ) {
    uploadToS3(currentFile.file);
  }

  const openFileDialog = () => {
    const input = document.querySelector(
      'input[type="file"][accept="image/*"]',
    ) as HTMLInputElement;
    input?.click();
  };

  const getInitials = () => {
    return userName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {/* Avatar Preview */}
      <div className="relative">
        <button
          type="button"
          className={cn(
            "group/avatar relative cursor-pointer overflow-hidden rounded-full border border-dashed transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-muted-foreground/20",
            previewUrl && "border-solid",
            isUploading && "opacity-50 cursor-not-allowed",
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={!isUploading ? openFileDialog : undefined}
          disabled={isUploading}
          aria-label="Upload avatar"
        >
          <input {...getInputProps()} className="sr-only" />

          <Avatar className="h-24 w-24">
            <AvatarImage src={previewUrl} alt="Avatar" />
            <AvatarFallback className="text-2xl font-semibold">
              {getInitials()}
            </AvatarFallback>
          </Avatar>

          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-full">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          )}
        </button>

        {/* Remove Button - only show when file is uploaded */}
        {(currentFile || uploadedUrl) && !isUploading && (
          <Button
            size="icon"
            variant="outline"
            onClick={handleRemove}
            className="size-6 absolute end-0 top-0 rounded-full"
            aria-label="Remove avatar"
          >
            <X className="size-3.5" />
          </Button>
        )}
      </div>

      {/* Upload Instructions */}
      <div className="text-center space-y-0.5">
        <p className="text-sm font-medium">
          {currentFile || uploadedUrl ? "Avatar uploaded" : "Upload avatar"}
        </p>
        <p className="text-xs text-muted-foreground">
          PNG, JPG up to {Math.round(maxSize / (1024 * 1024))}MB
        </p>
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="w-full text-sm text-destructive">
          {errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}
    </div>
  );
}
