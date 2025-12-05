"use client";

import {
  ChevronRight,
  Filter,
  Folder,
  Grid3X3,
  List,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  createFolder,
  deleteFloorplan,
  deleteFolder,
  moveFloorplanToFolder,
  renameFloorplan,
  toggleArchiveFloorplan,
  toggleFavoriteFloorplan,
} from "@/app/dashboard/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { FloorplansDataType } from "@/data/get-floorplans";
import { tryCatch } from "@/lib/try-catch";
import { DownloadDialog } from "./download-dialog";
import { FloorPlanCard } from "./floor-plan-card";
import { FloorPlanDialogs } from "./floor-plan-dialogs";
import { FloorPlanListItem } from "./floor-plan-list-item";
import { LibrarySidebar } from "./library-sidebar";
import type { FloorPlan, FolderItem } from "./types";

export function SavedFloorPlans({ data }: { data: FloorplansDataType }) {
  // Initialize from server data
  const initialFolders: FolderItem[] =
    data?.folders.map((folder) => ({
      ...folder,
      plans: folder.plans,
    })) || [];
  const router = useRouter();

  const initialFloorPlans: FloorPlan[] = data?.floorplans || [];

  const [folders, setFolders] = useState<FolderItem[]>(initialFolders);
  const [floorPlans, setFloorPlans] = useState<FloorPlan[]>(initialFloorPlans);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  // Dialog states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [newFolderDialogOpen, setNewFolderDialogOpen] = useState(false);
  const [moveToFolderDialogOpen, setMoveToFolderDialogOpen] = useState(false);
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FloorPlan | null>(null);
  const [newName, setNewName] = useState("");
  const [newFolderName, setNewFolderName] = useState("");

  // Transition states for async operations
  const [isCreatingFolder, startCreateFolder] = useTransition();
  const [_isDeletingFolder, startDeleteFolder] = useTransition();
  const [isMovingPlan, startMovePlan] = useTransition();
  const [isArchiving, startArchive] = useTransition();
  const [isDeleting, startDelete] = useTransition();
  const [isRenaming, startRename] = useTransition();
  const [_isFavoriting, startFavorite] = useTransition();

  // Filter floor plans based on search, folder, favorites, and archived status
  const filteredPlans = floorPlans.filter((plan) => {
    const matchesSearch =
      plan.stagingStyle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.furnishingDensity
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      plan.colorTone.toLowerCase().includes(searchQuery.toLowerCase());

    // If showing archived, only show archived plans
    if (showArchived) {
      return plan.isArchived && matchesSearch;
    }

    // Otherwise, hide archived plans from all views (folders, favorites, all plans)
    if (plan.isArchived) return false;

    const matchesFolder = selectedFolder
      ? plan.folderId === selectedFolder
      : true;
    const matchesFavorites = showFavorites ? plan.isFavorite : true;
    return matchesSearch && matchesFolder && matchesFavorites;
  });

  const handleDelete = () => {
    if (!selectedItem) return;

    startDelete(async () => {
      const { data: result, error } = await tryCatch(
        deleteFloorplan(selectedItem.id),
      );

      if (error) {
        toast.error("An unexpected error occurred. Please try again.");
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
        // Update local state
        setFloorPlans(floorPlans.filter((p) => p.id !== selectedItem.id));
        setDeleteDialogOpen(false);
        setSelectedItem(null);
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleRename = () => {
    if (!selectedItem || !newName.trim()) return;

    startRename(async () => {
      const { data: result, error } = await tryCatch(
        renameFloorplan(selectedItem.id, newName.trim()),
      );

      if (error) {
        toast.error("An unexpected error occurred. Please try again.");
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
        // Update local state
        setFloorPlans(
          floorPlans.map((p) =>
            p.id === selectedItem.id
              ? { ...p, stagingStyle: newName.trim() }
              : p,
          ),
        );
        setRenameDialogOpen(false);
        setSelectedItem(null);
        setNewName("");
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleToggleFavorite = (plan: FloorPlan) => {
    const newFavoriteState = !plan.isFavorite;

    startFavorite(async () => {
      const { data: result, error } = await tryCatch(
        toggleFavoriteFloorplan(plan.id, newFavoriteState),
      );

      if (error) {
        toast.error("An unexpected error occurred. Please try again.");
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
        // Update local state
        setFloorPlans(
          floorPlans.map((p) =>
            p.id === plan.id ? { ...p, isFavorite: newFavoriteState } : p,
          ),
        );
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleToggleArchive = (plan: FloorPlan) => {
    const newArchivedState = !plan.isArchived;

    startArchive(async () => {
      const { data: result, error } = await tryCatch(
        toggleArchiveFloorplan(plan.id, newArchivedState),
      );

      if (error) {
        toast.error("An unexpected error occurred. Please try again.");
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
        // Update local state
        setFloorPlans(
          floorPlans.map((p) =>
            p.id === plan.id ? { ...p, isArchived: newArchivedState } : p,
          ),
        );
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleMoveToFolder = (folderId: string | null) => {
    if (!selectedItem) return;

    startMovePlan(async () => {
      const { data: result, error } = await tryCatch(
        moveFloorplanToFolder(selectedItem.id, folderId),
      );

      if (error) {
        toast.error("An unexpected error occurred. Please try again.");
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
        // Update local state
        setFloorPlans(
          floorPlans.map((p) =>
            p.id === selectedItem.id ? { ...p, folderId } : p,
          ),
        );
        setMoveToFolderDialogOpen(false);
        setSelectedItem(null);
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return;

    startCreateFolder(async () => {
      const { data: result, error } = await tryCatch(
        createFolder(newFolderName),
      );

      if (error) {
        toast.error("An unexpected error occurred. Please try again.");
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
        // Optimistically add to local state (will be corrected on next page load)
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
        // Reload page to get fresh data with correct IDs
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleDeleteFolder = (folderId: string) => {
    startDeleteFolder(async () => {
      const { data: result, error } = await tryCatch(deleteFolder(folderId));

      if (error) {
        toast.error("An unexpected error occurred. Please try again.");
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
        // Update local state
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
      } else {
        toast.error(result.message);
      }
    });
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

  const openDownloadDialog = (plan: FloorPlan) => {
    setSelectedItem(plan);
    setDownloadDialogOpen(true);
  };

  const currentFolderName = selectedFolder
    ? folders.find((f) => f.id === selectedFolder)?.name
    : showFavorites
      ? "Favorites"
      : showArchived
        ? "Archived"
        : "All Floor Plans";

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      {/* Header */}
      <header className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-medium tracking-tight mb-2">
          Saved Floor Plans
        </h1>
        <p className="text-sm text-muted-foreground">
          Organize and manage your staged layouts
        </p>
      </header>

      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <LibrarySidebar
            floorPlans={floorPlans}
            folders={folders}
            selectedFolder={selectedFolder}
            showFavorites={showFavorites}
            showArchived={showArchived}
            onSelectAll={() => {
              setSelectedFolder(null);
              setShowFavorites(false);
              setShowArchived(false);
            }}
            onSelectFavorites={() => {
              setSelectedFolder(null);
              setShowFavorites(true);
              setShowArchived(false);
            }}
            onSelectArchived={() => {
              setSelectedFolder(null);
              setShowFavorites(false);
              setShowArchived(true);
            }}
            onSelectFolder={(folderId) => {
              setSelectedFolder(folderId);
              setShowFavorites(false);
              setShowArchived(false);
            }}
            onCreateFolder={() => setNewFolderDialogOpen(true)}
            onDeleteFolder={handleDeleteFolder}
          />
        </div>

        {/* Mobile Sidebar Sheet */}
        <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
          <SheetContent side="left" className="w-72 p-0">
            <SheetHeader className="px-6 py-4 border-b">
              <SheetTitle>Filters & Folders</SheetTitle>
            </SheetHeader>
            <div className="p-4">
              <LibrarySidebar
                floorPlans={floorPlans}
                folders={folders}
                selectedFolder={selectedFolder}
                showFavorites={showFavorites}
                showArchived={showArchived}
                onSelectAll={() => {
                  setSelectedFolder(null);
                  setShowFavorites(false);
                  setShowArchived(false);
                  setMobileFiltersOpen(false);
                }}
                onSelectFavorites={() => {
                  setSelectedFolder(null);
                  setShowFavorites(true);
                  setShowArchived(false);
                  setMobileFiltersOpen(false);
                }}
                onSelectArchived={() => {
                  setSelectedFolder(null);
                  setShowFavorites(false);
                  setShowArchived(true);
                  setMobileFiltersOpen(false);
                }}
                onSelectFolder={(folderId) => {
                  setSelectedFolder(folderId);
                  setShowFavorites(false);
                  setShowArchived(false);
                  setMobileFiltersOpen(false);
                }}
                onCreateFolder={() => {
                  setNewFolderDialogOpen(true);
                  setMobileFiltersOpen(false);
                }}
                onDeleteFolder={(folderId) => {
                  handleDeleteFolder(folderId);
                  setMobileFiltersOpen(false);
                }}
              />
            </div>
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center gap-3 mb-6">
            {/* Mobile Filter Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden shrink-0"
            >
              <Filter className="w-4 h-4" />
            </Button>

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
            <div className="flex border rounded-md shrink-0">
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
                setShowArchived(false);
              }}
              className="h-auto p-0 text-muted-foreground"
            >
              All
            </Button>
            {(selectedFolder || showFavorites || showArchived) && (
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPlans.map((plan) => (
                <FloorPlanCard
                  key={plan.id}
                  plan={plan}
                  isArchiving={isArchiving}
                  onToggleFavorite={handleToggleFavorite}
                  onToggleArchive={handleToggleArchive}
                  onRename={openRenameDialog}
                  onMove={openMoveDialog}
                  onDownload={openDownloadDialog}
                  onDelete={openDeleteDialog}
                />
              ))}
            </div>
          ) : (
            <div className="border divide-y">
              {filteredPlans.map((plan) => (
                <FloorPlanListItem
                  key={plan.id}
                  plan={plan}
                  isArchiving={isArchiving}
                  onToggleFavorite={handleToggleFavorite}
                  onToggleArchive={handleToggleArchive}
                  onRename={openRenameDialog}
                  onMove={openMoveDialog}
                  onDownload={openDownloadDialog}
                  onDelete={openDeleteDialog}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Dialogs */}
      <FloorPlanDialogs
        deleteDialogOpen={deleteDialogOpen}
        onDeleteDialogChange={setDeleteDialogOpen}
        onConfirmDelete={handleDelete}
        isDeleting={isDeleting}
        selectedItem={selectedItem}
        renameDialogOpen={renameDialogOpen}
        onRenameDialogChange={setRenameDialogOpen}
        onConfirmRename={handleRename}
        isRenaming={isRenaming}
        newName={newName}
        onNewNameChange={setNewName}
        newFolderDialogOpen={newFolderDialogOpen}
        onNewFolderDialogChange={setNewFolderDialogOpen}
        onConfirmCreateFolder={handleCreateFolder}
        isCreatingFolder={isCreatingFolder}
        newFolderName={newFolderName}
        onNewFolderNameChange={setNewFolderName}
        moveToFolderDialogOpen={moveToFolderDialogOpen}
        onMoveToFolderDialogChange={setMoveToFolderDialogOpen}
        onConfirmMoveToFolder={handleMoveToFolder}
        isMovingPlan={isMovingPlan}
        folders={folders}
      />

      {/* Download Dialog */}
      <DownloadDialog
        open={downloadDialogOpen}
        onOpenChange={setDownloadDialogOpen}
        selectedItem={selectedItem}
      />
    </div>
  );
}
