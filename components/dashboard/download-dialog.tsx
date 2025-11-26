"use client";

import { Download, FileImage, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getS3Url } from "@/lib/s3-upload";
import type { FloorPlan } from "./types";

interface DownloadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedItem: FloorPlan | null;
}

export function DownloadDialog({
  open,
  onOpenChange,
  selectedItem,
}: DownloadDialogProps) {
  if (!selectedItem) return null;

  const handleDownload = async (type: "reference" | "generated") => {
    const s3Key =
      type === "reference"
        ? selectedItem.referenceS3Key
        : selectedItem.generatedS3Key;
    const url = getS3Url(s3Key);

    try {
      // Fetch the image
      const response = await fetch(url);
      const blob = await response.blob();

      // Create a download link
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${selectedItem.stagingStyle}-${type}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      // Close dialog after download
      onOpenChange(false);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Download Floor Plan</DialogTitle>
          <DialogDescription>
            Choose which version to download for "{selectedItem.stagingStyle}".
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 py-4">
          {/* Generated Image Option */}
          <Button
            variant="outline"
            onClick={() => handleDownload("generated")}
            className="h-auto py-4 flex items-start gap-4 justify-start hover:border-foreground transition-colors"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center shrink-0">
              <ImageIcon className="w-5 h-5 text-primary" />
            </div>
            <div className="text-left flex-1">
              <p className="font-medium text-sm mb-1">Generated Floor Plan</p>
              <p className="text-xs text-muted-foreground">
                The AI-generated staged layout
              </p>
            </div>
            <Download className="w-4 h-4 text-muted-foreground" />
          </Button>

          {/* Reference Image Option */}
          <Button
            variant="outline"
            onClick={() => handleDownload("reference")}
            className="h-auto py-4 flex items-start gap-4 justify-start hover:border-foreground transition-colors"
          >
            <div className="w-10 h-10 bg-secondary/50 rounded-md flex items-center justify-center shrink-0">
              <FileImage className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div className="text-left flex-1">
              <p className="font-medium text-sm mb-1">Original Reference</p>
              <p className="text-xs text-muted-foreground">
                The original floor plan image
              </p>
            </div>
            <Download className="w-4 h-4 text-muted-foreground" />
          </Button>
        </div>

        <div className="flex justify-end">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="text-sm"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
