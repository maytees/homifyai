"use client";

import { Archive, FolderPlus, Home, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { FloorPlan, FolderItem } from "./types";
import { folderColors } from "./types";

interface LibrarySidebarProps {
  floorPlans: FloorPlan[];
  folders: FolderItem[];
  selectedFolder: string | null;
  showFavorites: boolean;
  showArchived: boolean;
  onSelectAll: () => void;
  onSelectFavorites: () => void;
  onSelectArchived: () => void;
  onSelectFolder: (folderId: string) => void;
  onCreateFolder: () => void;
  onDeleteFolder: (folderId: string) => void;
}

export function LibrarySidebar({
  floorPlans,
  folders,
  selectedFolder,
  showFavorites,
  showArchived,
  onSelectAll,
  onSelectFavorites,
  onSelectArchived,
  onSelectFolder,
  onCreateFolder,
  onDeleteFolder,
}: LibrarySidebarProps) {
  return (
    <aside className="w-56 shrink-0">
      <nav className="space-y-1">
        {/* All Plans */}
        <Button
          variant={
            !selectedFolder && !showFavorites && !showArchived
              ? "secondary"
              : "ghost"
          }
          onClick={onSelectAll}
          className="w-full justify-start gap-3"
        >
          <Home className="w-4 h-4" />
          All Floor Plans
          <span className="ml-auto text-xs text-muted-foreground">
            {floorPlans.filter((p) => !p.isArchived).length}
          </span>
        </Button>

        {/* Favorites */}
        <Button
          variant={showFavorites ? "secondary" : "ghost"}
          onClick={onSelectFavorites}
          className="w-full justify-start gap-3"
        >
          <Star className="w-4 h-4" />
          Favorites
          <span className="ml-auto text-xs text-muted-foreground">
            {floorPlans.filter((p) => p.isFavorite && !p.isArchived).length}
          </span>
        </Button>

        {/* Archived */}
        <Button
          variant={showArchived ? "secondary" : "ghost"}
          onClick={onSelectArchived}
          className="w-full justify-start gap-3"
        >
          <Archive className="w-4 h-4" />
          Archived
          <span className="ml-auto text-xs text-muted-foreground">
            {floorPlans.filter((p) => p.isArchived).length}
          </span>
        </Button>

        {/* Divider */}
        <div className="h-px bg-border my-3" />

        {/* Folders Header */}
        <div className="flex items-center justify-between px-3 py-1">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Folders
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCreateFolder}
            className="h-6 w-6"
          >
            <FolderPlus className="w-4 h-4" />
          </Button>
        </div>

        {/* Folder List */}
        {folders.map((folder, index) => (
          <div key={folder.id} className="group flex items-center">
            <Button
              variant={selectedFolder === folder.id ? "secondary" : "ghost"}
              onClick={() => onSelectFolder(folder.id)}
              className="flex-1 justify-start gap-3"
            >
              <div
                className={cn(
                  "w-3 h-3 rounded-sm",
                  folderColors[index % folderColors.length],
                )}
              />
              <span className="truncate">{folder.name}</span>
              <span className="ml-auto text-xs text-muted-foreground">
                {floorPlans.filter((p) => p.folderId === folder.id).length}
              </span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDeleteFolder(folder.id)}
              className="h-8 w-8 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        ))}
      </nav>
    </aside>
  );
}
