"use client";

import { Check, Crown, Search, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  getFreeStyles,
  getProStyles,
  type InteriorStyle,
} from "@/lib/interior-styles";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";

interface StyleSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectStyle: (styleId: string) => void;
  selectedStyleId: string | null;
  userPlan: "free" | "pro";
}

export function StyleSelectionDialog({
  open,
  onOpenChange,
  onSelectStyle,
  selectedStyleId,
  userPlan,
}: StyleSelectionDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const freeStyles = getFreeStyles();
  const proStyles = getProStyles();

  const filterStyles = (styles: InteriorStyle[]) => {
    if (!searchQuery) return styles;
    return styles.filter(
      (style) =>
        style.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        style.description.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  };

  const filteredFreeStyles = filterStyles(freeStyles);
  const filteredProStyles = filterStyles(proStyles);

  const handleStyleClick = (style: InteriorStyle) => {
    if (style.category === "pro" && userPlan === "free") {
      // Don't allow selection, just show it's locked
      return;
    }
    onSelectStyle(style.id);
    onOpenChange(false);
  };

  const StyleCard = ({ style }: { style: InteriorStyle }) => {
    const isLocked = style.category === "pro" && userPlan === "free";
    const isSelected = selectedStyleId === style.id;

    return (
      <button
        type="button"
        onClick={() => handleStyleClick(style)}
        disabled={isLocked}
        className={cn(
          "relative flex flex-col gap-3 p-4 border text-left transition-all",
          isSelected && !isLocked
            ? "border-foreground bg-foreground/5 shadow-sm"
            : "border-border hover:border-foreground/50",
          isLocked && "opacity-60 cursor-not-allowed",
        )}
      >
        {/* Pro Badge */}
        {style.category === "pro" && (
          <div className="absolute top-2 right-2">
            <div
              className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                isLocked
                  ? "bg-muted text-muted-foreground"
                  : "bg-primary text-primary-foreground",
              )}
            >
              <Crown className="w-3 h-3" />
              Pro
            </div>
          </div>
        )}

        {/* Selected Indicator */}
        {isSelected && !isLocked && (
          <div className="absolute top-2 right-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-foreground text-background">
              <Check className="w-4 h-4" />
            </div>
          </div>
        )}

        {/* Style Title */}
        <div className="pr-12">
          <h3 className="text-sm font-semibold">{style.title}</h3>
        </div>

        {/* Style Description */}
        <p className="text-xs text-muted-foreground leading-relaxed">
          {style.description}
        </p>

        {/* Locked Message */}
        {isLocked && (
          <div className="text-xs font-medium text-primary">
            Upgrade to Pro to unlock
          </div>
        )}
      </button>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:min-w-4xl sm:max-h-[min(640px,80vh)] p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Choose Your Staging Style</DialogTitle>
          <DialogDescription>
            Select from our curated collection of interior design styles
          </DialogDescription>
        </DialogHeader>

        {/* Search */}
        <div className="px-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search styles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchQuery("")}
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Styles List */}
        {/* <ScrollArea className="flex-1 px-6 pb-6"> */}
        <ScrollArea className="sm:max-h-[400px] max-h-[75vh] pr-4">
          <div className="space-y-6 px-6 pb-6">
            {/* Free Styles */}
            {filteredFreeStyles.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Free Styles
                  </h3>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {filteredFreeStyles.map((style) => (
                    <StyleCard key={style.id} style={style} />
                  ))}
                </div>
              </div>
            )}

            {/* Pro Styles */}
            {filteredProStyles.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Crown className="w-4 h-4" />
                    Pro Styles
                  </h3>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {filteredProStyles.map((style) => (
                    <StyleCard key={style.id} style={style} />
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {filteredFreeStyles.length === 0 &&
              filteredProStyles.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-sm text-muted-foreground">
                    No styles found matching "{searchQuery}"
                  </p>
                </div>
              )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
