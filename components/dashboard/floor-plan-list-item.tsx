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

interface FloorPlanListItemProps {
  plan: FloorPlan;
  isArchiving: boolean;
  onToggleFavorite: (plan: FloorPlan) => void;
  onToggleArchive: (plan: FloorPlan) => void;
  onRename: (plan: FloorPlan) => void;
  onMove: (plan: FloorPlan) => void;
  onDownload: (plan: FloorPlan) => void;
  onDelete: (plan: FloorPlan) => void;
}

export function FloorPlanListItem({
  plan,
  isArchiving,
  onToggleFavorite,
  onToggleArchive,
  onRename,
  onMove,
  onDownload,
  onDelete,
}: FloorPlanListItemProps) {
  const generatedUrl = getS3Url(plan.generatedS3Key);
  const referenceUrl = getS3Url(plan.referenceS3Key);

  return (
    <div className="flex items-center gap-4 p-3 hover:bg-foreground/5 transition-colors group">
      {/* Thumbnail - Click to open slideshow */}
      <PhotoProvider>
        <PhotoView src={generatedUrl}>
          <div className="w-16 h-12 bg-muted flex items-center justify-center shrink-0 cursor-pointer overflow-hidden">
            <Image
              src={generatedUrl}
              height={64}
              width={64}
              className="w-full h-full object-cover"
              alt={plan.stagingStyle}
            />
          </div>
        </PhotoView>
        {/* Hidden PhotoView for reference image */}
        <PhotoView src={referenceUrl} />
      </PhotoProvider>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{plan.stagingStyle}</p>
        <p className="text-xs text-muted-foreground">
          {plan.furnishingDensity} · {plan.colorTone} ·{" "}
          {new Date(plan.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Favorite */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onToggleFavorite(plan)}
        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {plan.isFavorite ? (
          <Star className="w-4 h-4 fill-current" />
        ) : (
          <StarOff className="w-4 h-4" />
        )}
      </Button>

      {/* Actions */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
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
          <DropdownMenuItem
            onClick={() => onDelete(plan)}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
