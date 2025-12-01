"use client";

import {
  Archive,
  ArchiveRestore,
  Download,
  Folder,
  MoreVertical,
  Pencil,
  Star,
  StarOff,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getS3Url } from "@/lib/s3-upload";
import type { FloorPlan } from "./types";

interface FloorPlanCardProps {
  plan: FloorPlan;
  isArchiving: boolean;
  onToggleFavorite: (plan: FloorPlan) => void;
  onToggleArchive: (plan: FloorPlan) => void;
  onRename: (plan: FloorPlan) => void;
  onMove: (plan: FloorPlan) => void;
  onDownload: (plan: FloorPlan) => void;
  onDelete: (plan: FloorPlan) => void;
}

export function FloorPlanCard({
  plan,
  isArchiving,
  onToggleFavorite,
  onToggleArchive,
  onRename,
  onMove,
  onDownload,
  onDelete,
}: FloorPlanCardProps) {
  const generatedUrl = getS3Url(plan.generatedS3Key);
  const referenceUrl = getS3Url(plan.referenceS3Key);

  return (
    <div className="group border hover:border-foreground/50 transition-colors">
      {/* Thumbnail - Click to open slideshow */}
      <div className="relative">
        <PhotoProvider>
          <PhotoView src={generatedUrl}>
            <div className="aspect-4/3 bg-muted relative cursor-pointer">
              <Image
                src={generatedUrl}
                className="absolute inset-0 w-full h-full object-cover"
                fill
                alt={plan.stagingStyle}
              />
            </div>
          </PhotoView>
          {/* Hidden PhotoView for reference image - will be in slideshow */}
          <PhotoView src={referenceUrl} />
        </PhotoProvider>

        {/* Favorite button */}
        <Button
          variant="secondary"
          size="icon"
          onClick={() => onToggleFavorite(plan)}
          className="absolute top-2 left-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {plan.isFavorite ? (
            <Star className="w-4 h-4 fill-current" />
          ) : (
            <StarOff className="w-4 h-4" />
          )}
        </Button>

        {/* Actions menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onRename(plan)}>
              <Pencil className="w-4 h-4 mr-2" />
              Rename
            </DropdownMenuItem>
            {!plan.isArchived && (
              <DropdownMenuItem onClick={() => onMove(plan)}>
                <Folder className="w-4 h-4 mr-2" />
                Move to folder
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => onDownload(plan)}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onToggleArchive(plan)}
              disabled={isArchiving}
            >
              {plan.isArchived ? (
                <>
                  <ArchiveRestore className="w-4 h-4 mr-2" />
                  Unarchive
                </>
              ) : (
                <>
                  <Archive className="w-4 h-4 mr-2" />
                  Archive
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(plan)} variant="destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-sm font-medium truncate">{plan.stagingStyle}</p>
        <p className="text-xs text-muted-foreground">
          {new Date(plan.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
