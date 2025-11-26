"use client";

import {
  ChevronRight,
  Download,
  Folder,
  FolderPlus,
  Grid3X3,
  Home,
  List,
  MoreVertical,
  Pencil,
  Search,
  Star,
  StarOff,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import type { FloorplansDataType } from "@/data/get-floorplans";
import { getS3Url } from "@/lib/s3-upload";
import { cn } from "@/lib/utils";

interface FloorPlan {
  id: string;
  stagingStyle: string;
  furnishingDensity: string;
  colorTone: string;
  angle: string;
  additionalNotes: string | null;
  isFavorite: boolean;
  isArchived: boolean;
  createdAt: Date;
  referenceS3Key: string;
  generatedS3Key: string;
  folderId: string | null;
}

interface FolderItem {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  plans: FloorPlan[];
}

const folderColors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-orange-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-red-500",
  "bg-yellow-500",
];

export function SavedFloorPlans({ data }: { data: FloorplansDataType }) {
  // Initialize from server data
  const initialFolders: FolderItem[] =
    data?.folders.map((folder) => ({
      ...folder,
      plans: folder.plans,
    })) || [];

  const initialFloorPlans: FloorPlan[] = data?.floorplans || [];

  const [folders, setFolders] = useState<FolderItem[]>(initialFolders);
  const [floorPlans, setFloorPlans] = useState<FloorPlan[]>(initialFloorPlans);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);

  // Dialog states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [newFolderDialogOpen, setNewFolderDialogOpen] = useState(false);
  const [moveToFolderDialogOpen, setMoveToFolderDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FloorPlan | null>(null);
  const [newName, setNewName] = useState("");
  const [newFolderName, setNewFolderName] = useState("");

  // Filter floor plans based on search, folder, favorites, and archived status
  const filteredPlans = floorPlans.filter((plan) => {
    // Don't show archived plans unless in a specific folder
    if (plan.isArchived && !selectedFolder) return false;

    const matchesSearch =
      plan.stagingStyle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.furnishingDensity
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      plan.colorTone.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFolder = selectedFolder
      ? plan.folderId === selectedFolder
      : true;
    const matchesFavorites = showFavorites ? plan.isFavorite : true;
    return matchesSearch && matchesFolder && matchesFavorites;
  });

  const handleDelete = () => {
    if (selectedItem) {
      setFloorPlans(floorPlans.filter((p) => p.id !== selectedItem.id));
      setDeleteDialogOpen(false);
      setSelectedItem(null);
    }
  };

  const handleRename = () => {
    if (selectedItem && newName.trim()) {
      // Note: This is client-side only for now
      // You'll need to create a server action for this later
      setFloorPlans(
        floorPlans.map((p) =>
          p.id === selectedItem.id ? { ...p, stagingStyle: newName.trim() } : p,
        ),
      );
      setRenameDialogOpen(false);
      setSelectedItem(null);
      setNewName("");
    }
  };

  const handleToggleFavorite = (plan: FloorPlan) => {
    setFloorPlans(
      floorPlans.map((p) =>
        p.id === plan.id ? { ...p, isFavorite: !p.isFavorite } : p,
      ),
    );
  };

  const handleMoveToFolder = (folderId: string | null) => {
    if (selectedItem) {
      setFloorPlans(
        floorPlans.map((p) =>
          p.id === selectedItem.id ? { ...p, folderId } : p,
        ),
      );
      setMoveToFolderDialogOpen(false);
      setSelectedItem(null);
    }
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      // Note: This is client-side only for now
      // You'll need to create a server action for this later
      const newFolder: FolderItem = {
        id: Date.now().toString(),
        name: newFolderName.trim(),
        createdAt: new Date(),
        updatedAt: new Date(),
        plans: [],
      };
      setFolders([...folders, newFolder]);
      setNewFolderDialogOpen(false);
      setNewFolderName("");
    }
  };

  const handleDeleteFolder = (folderId: string) => {
    setFolders(folders.filter((f) => f.id !== folderId));
    // Move plans from deleted folder to no folder
    setFloorPlans(
      floorPlans.map((p) =>
        p.folderId === folderId ? { ...p, folderId: null } : p,
      ),
    );
    if (selectedFolder === folderId) {
      setSelectedFolder(null);
    }
  };

  const openRenameDialog = (plan: FloorPlan) => {
    setSelectedItem(plan);
    setNewName(plan.stagingStyle);
    setRenameDialogOpen(true);
  };

  const openDeleteDialog = (plan: FloorPlan) => {
    setSelectedItem(plan);
    setDeleteDialogOpen(true);
  };

  const openMoveDialog = (plan: FloorPlan) => {
    setSelectedItem(plan);
    setMoveToFolderDialogOpen(true);
  };

  const currentFolderName = selectedFolder
    ? folders.find((f) => f.id === selectedFolder)?.name
    : showFavorites
      ? "Favorites"
      : "All Floor Plans";

  return (
    <PhotoProvider>
      <div className="px-8 py-12">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl font-medium tracking-tight mb-2">
            Saved Floor Plans
          </h1>
          <p className="text-sm text-muted-foreground">
            Organize and manage your staged layouts
          </p>
        </header>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-56 shrink-0">
            <nav className="space-y-1">
              {/* All Plans */}
              <Button
                variant={
                  !selectedFolder && !showFavorites ? "secondary" : "ghost"
                }
                onClick={() => {
                  setSelectedFolder(null);
                  setShowFavorites(false);
                }}
                className="w-full justify-start gap-3"
              >
                <Home className="w-4 h-4" />
                All Floor Plans
                <span className="ml-auto text-xs text-muted-foreground">
                  {floorPlans.length}
                </span>
              </Button>

              {/* Favorites */}
              <Button
                variant={showFavorites ? "secondary" : "ghost"}
                onClick={() => {
                  setSelectedFolder(null);
                  setShowFavorites(true);
                }}
                className="w-full justify-start gap-3"
              >
                <Star className="w-4 h-4" />
                Favorites
                <span className="ml-auto text-xs text-muted-foreground">
                  {floorPlans.filter((p) => p.isFavorite).length}
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
                  onClick={() => setNewFolderDialogOpen(true)}
                  className="h-6 w-6"
                >
                  <FolderPlus className="w-4 h-4" />
                </Button>
              </div>

              {/* Folder List */}
              {folders.map((folder, index) => (
                <div key={folder.id} className="group flex items-center">
                  <Button
                    variant={
                      selectedFolder === folder.id ? "secondary" : "ghost"
                    }
                    onClick={() => {
                      setSelectedFolder(folder.id);
                      setShowFavorites(false);
                    }}
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
                      {
                        floorPlans.filter((p) => p.folderId === folder.id)
                          .length
                      }
                    </span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteFolder(folder.id)}
                    className="h-8 w-8 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center gap-3 mb-6">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search floor plans..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9"
                />
              </div>

              {/* View Toggle */}
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-4 text-sm">
              <Button
                variant="link"
                onClick={() => {
                  setSelectedFolder(null);
                  setShowFavorites(false);
                }}
                className="h-auto p-0 text-muted-foreground"
              >
                All
              </Button>
              {(selectedFolder || showFavorites) && (
                <>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{currentFolderName}</span>
                </>
              )}
            </div>

            {/* Floor Plans Grid/List */}
            {filteredPlans.length === 0 ? (
              <div className="border border-dashed p-12 text-center">
                <Folder className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  No floor plans found
                </p>
                <p className="text-xs text-muted-foreground">
                  {searchQuery
                    ? "Try a different search term"
                    : "Generate your first floor plan to get started"}
                </p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPlans.map((plan) => {
                  const generatedUrl = getS3Url(plan.generatedS3Key);
                  const referenceUrl = getS3Url(plan.referenceS3Key);

                  return (
                    <div
                      key={plan.id}
                      className="group border hover:border-foreground/50 transition-colors"
                    >
                      {/* Thumbnail - Click to open slideshow */}
                      <div className="relative">
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

                        {/* Favorite button */}
                        <Button
                          variant="secondary"
                          size="icon"
                          onClick={() => handleToggleFavorite(plan)}
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
                            <DropdownMenuItem
                              onClick={() => openRenameDialog(plan)}
                            >
                              <Pencil className="w-4 h-4 mr-2" />
                              Rename
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => openMoveDialog(plan)}
                            >
                              <Folder className="w-4 h-4 mr-2" />
                              Move to folder
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => openDeleteDialog(plan)}
                              variant="destructive"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      {/* Info */}
                      <div className="p-3">
                        <p className="text-sm font-medium truncate">
                          {plan.stagingStyle}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(plan.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="border divide-y">
                {filteredPlans.map((plan) => {
                  const generatedUrl = getS3Url(plan.generatedS3Key);
                  const referenceUrl = getS3Url(plan.referenceS3Key);

                  return (
                    <div
                      key={plan.id}
                      className="flex items-center gap-4 p-3 hover:bg-foreground/5 transition-colors group"
                    >
                      {/* Thumbnail - Click to open slideshow */}
                      <PhotoView src={generatedUrl}>
                        <div className="w-16 h-12 bg-muted flex items-center justify-center shrink-0 cursor-pointer overflow-hidden">
                          <Image
                            src={generatedUrl}
                            fill
                            className="w-full h-full object-cover"
                            alt={plan.stagingStyle}
                          />
                        </div>
                      </PhotoView>
                      {/* Hidden PhotoView for reference image */}
                      <PhotoView src={referenceUrl} />
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {plan.stagingStyle}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {plan.furnishingDensity} · {plan.colorTone} ·{" "}
                          {new Date(plan.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      {/* Favorite */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleFavorite(plan)}
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
                          <DropdownMenuItem
                            onClick={() => openRenameDialog(plan)}
                          >
                            <Pencil className="w-4 h-4 mr-2" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => openMoveDialog(plan)}
                          >
                            <Folder className="w-4 h-4 mr-2" />
                            Move to folder
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => openDeleteDialog(plan)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete floor plan</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{selectedItem?.stagingStyle}"?
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
                className="bg-transparent"
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Rename Dialog */}
        <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Rename floor plan</DialogTitle>
              <DialogDescription>
                Enter a new name for this floor plan.
              </DialogDescription>
            </DialogHeader>
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Floor plan name"
              className="mt-2"
            />
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setRenameDialogOpen(false)}
                className="bg-transparent"
              >
                Cancel
              </Button>
              <Button onClick={handleRename} disabled={!newName.trim()}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* New Folder Dialog */}
        <Dialog
          open={newFolderDialogOpen}
          onOpenChange={setNewFolderDialogOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create new folder</DialogTitle>
              <DialogDescription>
                Enter a name for your new folder.
              </DialogDescription>
            </DialogHeader>
            <Input
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Folder name"
              className="mt-2"
            />
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setNewFolderDialogOpen(false)}
                className="bg-transparent"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateFolder}
                disabled={!newFolderName.trim()}
              >
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Move to Folder Dialog */}
        <Dialog
          open={moveToFolderDialogOpen}
          onOpenChange={setMoveToFolderDialogOpen}
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
                variant={
                  selectedItem?.folderId === null ? "secondary" : "ghost"
                }
                onClick={() => handleMoveToFolder(null)}
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
                  onClick={() => handleMoveToFolder(folder.id)}
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
                onClick={() => setMoveToFolderDialogOpen(false)}
                className="bg-transparent"
              >
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PhotoProvider>
  );
}
