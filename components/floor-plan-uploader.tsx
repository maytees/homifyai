"use client";

import { useCallback, useEffect, useState } from "react";
import { CloudUpload, ImageIcon, Loader2, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useFileUpload, type FileWithPreview } from "@/hooks/use-file-uploads";

interface FloorPlanUploaderProps {
  onFileSelect: (file: File) => void;
  onRemove?: () => void;
  className?: string;
}

export function FloorPlanUploader({
  onFileSelect,
  onRemove,
  className,
}: FloorPlanUploaderProps) {

  const [{ files, isDragging, errors }, { addFiles, removeFile, clearErrors, getInputProps, handleDragEnter, handleDragLeave, handleDragOver, handleDrop }] =
    useFileUpload({
      maxFiles: 1,
      maxSize: 10 * 1024 * 1024, // 10MB
      accept: "image/*",
      multiple: false,
    });

  // Handle paste event
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (const item of Array.from(items)) {
        if (item.type.startsWith("image/")) {
          e.preventDefault();
          const file = item.getAsFile();
          if (file) {
            addFiles([file]);
          }
        }
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [addFiles]);

  // Notify parent when file is added
  useEffect(() => {
    if (files.length > 0 && files[0].file instanceof File) {
      onFileSelect(files[0].file);
    }
  }, [files, onFileSelect]);

  const handleRemove = () => {
    if (files[0]) {
      removeFile(files[0].id);
    }
    onRemove?.();
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return (
    <div className={cn("w-full", className)}>
      {files.length > 0 && files[0].preview ? (
        <div className="space-y-4">
          {/* Preview */}
          <Card className="shadow-none overflow-hidden relative group">
            <img
              src={files[0].preview}
              className="w-full h-48 object-cover"
              alt="Floor plan preview"
            />
            <Button
              onClick={handleRemove}
              variant="secondary"
              size="icon"
              className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <XIcon className="w-4 h-4" />
            </Button>
          </Card>
        </div>
      ) : (
        <Card
          className={cn(
            "border-dashed shadow-none transition-colors cursor-pointer",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-muted-foreground/50",
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <CardContent className="text-center py-12">
            <div className="flex items-center justify-center w-12 h-12 rounded-full border border-border mx-auto mb-4">
              <CloudUpload className="w-5 h-5" />
            </div>
            <h3 className="text-sm text-foreground font-semibold mb-1">
              Drop your floor plan here
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              or click to browse • You can also paste (Ctrl+V)
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              PNG, JPG, JPEG up to 10MB
            </p>
            <input {...getInputProps()} className="hidden" />
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                const input = document.querySelector('input[type="file"]') as HTMLInputElement;
                input?.click();
              }}
            >
              Browse File
            </Button>
          </CardContent>
        </Card>
      )}

      {errors.length > 0 && (
        <p className="text-sm text-destructive mt-2">{errors[0]}</p>
      )}
    </div>
  );
}
