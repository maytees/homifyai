"use client";

import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { FloorPlan, FolderItem } from "./types";
import { folderColors } from "./types";

interface FloorPlanDialogsProps {
  // Delete Dialog
  deleteDialogOpen: boolean;
  onDeleteDialogChange: (open: boolean) => void;
  onConfirmDelete: () => void;
  isDeleting: boolean;
  selectedItem: FloorPlan | null;

  // Rename Dialog
  renameDialogOpen: boolean;
  onRenameDialogChange: (open: boolean) => void;
  onConfirmRename: () => void;
  isRenaming: boolean;
  newName: string;
  onNewNameChange: (name: string) => void;

  // New Folder Dialog
  newFolderDialogOpen: boolean;
  onNewFolderDialogChange: (open: boolean) => void;
  onConfirmCreateFolder: () => void;
  isCreatingFolder: boolean;
  newFolderName: string;
  onNewFolderNameChange: (name: string) => void;

  // Move to Folder Dialog
  moveToFolderDialogOpen: boolean;
  onMoveToFolderDialogChange: (open: boolean) => void;
  onConfirmMoveToFolder: (folderId: string | null) => void;
  isMovingPlan: boolean;
  folders: FolderItem[];
}

export function FloorPlanDialogs({
  deleteDialogOpen,
  onDeleteDialogChange,
  onConfirmDelete,
  isDeleting,
  selectedItem,
  renameDialogOpen,
  onRenameDialogChange,
  onConfirmRename,
  isRenaming,
  newName,
  onNewNameChange,
  newFolderDialogOpen,
  onNewFolderDialogChange,
  onConfirmCreateFolder,
  isCreatingFolder,
  newFolderName,
  onNewFolderNameChange,
  moveToFolderDialogOpen,
  onMoveToFolderDialogChange,
  onConfirmMoveToFolder,
  isMovingPlan,
  folders,
}: FloorPlanDialogsProps) {
  return (
    <>
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={onDeleteDialogChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete floor plan</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedItem?.stagingStyle}"?
              This action cannot be undone. Consider archiving instead.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => onDeleteDialogChange(false)}
              disabled={isDeleting}
              className="bg-transparent"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={onConfirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rename Dialog */}
      <Dialog open={renameDialogOpen} onOpenChange={onRenameDialogChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename floor plan</DialogTitle>
            <DialogDescription>
              Enter a new name for this floor plan.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={newName}
            onChange={(e) => onNewNameChange(e.target.value)}
            placeholder="Floor plan name"
            className="mt-2"
            disabled={isRenaming}
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => onRenameDialogChange(false)}
              disabled={isRenaming}
              className="bg-transparent"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirmRename}
              disabled={!newName.trim() || isRenaming}
            >
              {isRenaming ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Folder Dialog */}
      <Dialog open={newFolderDialogOpen} onOpenChange={onNewFolderDialogChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new folder</DialogTitle>
            <DialogDescription>
              Enter a name for your new folder.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={newFolderName}
            onChange={(e) => onNewFolderNameChange(e.target.value)}
            placeholder="Folder name"
            className="mt-2"
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => onNewFolderDialogChange(false)}
              disabled={isCreatingFolder}
              className="bg-transparent"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirmCreateFolder}
              disabled={!newFolderName.trim() || isCreatingFolder}
            >
              {isCreatingFolder ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Move to Folder Dialog */}
      <Dialog
        open={moveToFolderDialogOpen}
        onOpenChange={onMoveToFolderDialogChange}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Move to folder</DialogTitle>
            <DialogDescription>
              Select a folder to move "{selectedItem?.stagingStyle}" to.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-1 mt-2">
            <Button
              variant={selectedItem?.folderId === null ? "secondary" : "ghost"}
              onClick={() => onConfirmMoveToFolder(null)}
              className="w-full justify-start gap-3"
            >
              <Home className="w-4 h-4" />
              No folder
            </Button>
            {folders.map((folder, index) => (
              <Button
                key={folder.id}
                variant={
                  selectedItem?.folderId === folder.id ? "secondary" : "ghost"
                }
                onClick={() => onConfirmMoveToFolder(folder.id)}
                className="w-full justify-start gap-3"
              >
                <div
                  className={cn(
                    "w-3 h-3 rounded-sm",
                    folderColors[index % folderColors.length],
                  )}
                />
                {folder.name}
              </Button>
            ))}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => onMoveToFolderDialogChange(false)}
              disabled={isMovingPlan}
              className="bg-transparent"
            >
              {isMovingPlan ? "Moving..." : "Cancel"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
