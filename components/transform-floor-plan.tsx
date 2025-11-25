"use client";

import {
  AlertCircle,
  Check,
  Download,
  Factory,
  Heart,
  Home,
  Lamp,
  Loader2,
  RefreshCw,
  Sofa,
  Warehouse,
} from "lucide-react";
import type React from "react";
import { useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const stylePresets = [
  { id: "modern-minimalist", title: "Modern Minimalist", icon: Sofa },
  { id: "cozy-scandinavian", title: "Cozy Scandinavian", icon: Lamp },
  { id: "luxury-contemporary", title: "Luxury Contemporary", icon: Home },
  { id: "rustic-farmhouse", title: "Rustic Farmhouse", icon: Warehouse },
  { id: "sleek-industrial", title: "Sleek Industrial", icon: Factory },
  { id: "vibrant-family", title: "Vibrant Family Home", icon: Heart },
];

const densityLevels = ["Sparse", "Standard", "Full"];
const colorTones = ["Neutral", "Warm", "Bold"];

export function TransformFloorPlan() {
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [furnishingDensity, setFurnishingDensity] = useState(1);
  const [colorTone, setColorTone] = useState(1);
  const [notes, setNotes] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  const step3Ref = useRef<HTMLDivElement>(null);

  const validateUrl = (value: string) => {
    if (!value) {
      setUrlError("Please enter an image URL");
      return false;
    }
    const urlPattern = /^https?:\/\/.+\.(png|jpg|jpeg|webp|gif)(\?.*)?$/i;
    if (!urlPattern.test(value)) {
      setUrlError("URL must end in .png, .jpg, .jpeg, .webp, or .gif");
      return false;
    }
    setUrlError("");
    return true;
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);
    if (value) validateUrl(value);
    else setUrlError("");
  };

  const handleStyleSelect = (styleId: string) => {
    setSelectedStyle(styleId);
    setTimeout(() => {
      step3Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleGenerate = async () => {
    if (!validateUrl(url) || !selectedStyle) return;

    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 2500));
    setIsGenerating(false);
    setShowOutput(true);
  };

  const handleReset = () => {
    setShowOutput(false);
  };

  const isFormValid = url && !urlError && selectedStyle;
  const currentStep = !url ? 1 : !selectedStyle ? 2 : 3;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-2xl font-medium tracking-tight mb-2">Homify AI</h1>
        <p className="text-sm text-muted-foreground">
          Turn any blueprint into a fully staged interior — automatically.
        </p>
      </header>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-2 mb-12">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={cn(
                "w-8 h-8 flex items-center justify-center text-xs font-medium border transition-colors",
                currentStep >= step
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-muted-foreground border-border",
              )}
            >
              {currentStep > step ? <Check className="w-4 h-4" /> : step}
            </div>
            {step < 3 && (
              <div
                className={cn(
                  "w-12 h-px mx-2 transition-colors",
                  currentStep > step ? "bg-foreground" : "bg-border",
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Upload Floor Plan */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Step 1
          </span>
          <span className="text-sm font-medium">Upload Floor Plan</span>
        </div>
        <div className="space-y-2">
          <Label htmlFor="url" className="text-sm">
            Floor Plan Image Link
          </Label>
          <Input
            id="url"
            type="url"
            placeholder="Paste a floor plan image link (.png, .jpg, or .jpeg)"
            value={url}
            onChange={handleUrlChange}
            className={cn(
              "h-11",
              urlError && "border-destructive focus-visible:ring-destructive",
            )}
          />
          {urlError ? (
            <p className="text-xs text-destructive flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {urlError}
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">
              Make sure the link ends in .png, .jpg, or .jpeg
            </p>
          )}
        </div>
      </section>

      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Step 2
          </span>
          <span className="text-sm font-medium">Choose Staging Style</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {stylePresets.map((style) => {
            const Icon = style.icon;
            const isSelected = selectedStyle === style.id;
            return (
              <button
                key={style.id}
                onClick={() => handleStyleSelect(style.id)}
                className={cn(
                  "relative flex flex-col items-center gap-3 p-5 border transition-all text-left",
                  isSelected
                    ? "border-foreground bg-foreground/5 shadow-sm"
                    : "border-border hover:border-foreground/50",
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 flex items-center justify-center border",
                    isSelected ? "border-foreground" : "border-border",
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-center leading-tight">
                  {style.title}
                </span>
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Advanced Staging Settings */}
        <Accordion type="single" collapsible className="border">
          <AccordionItem value="advanced" className="border-none">
            <AccordionTrigger className="px-4 py-3 text-sm hover:no-underline">
              Advanced Staging Settings
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-6">
                {/* Furnishing Density */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm">Furnishing Density</Label>
                    <span className="text-xs text-muted-foreground">
                      {densityLevels[furnishingDensity]}
                    </span>
                  </div>
                  <Slider
                    value={[furnishingDensity]}
                    onValueChange={(v) => setFurnishingDensity(v[0])}
                    max={2}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Sparse</span>
                    <span>Standard</span>
                    <span>Full</span>
                  </div>
                </div>

                {/* Color Tone */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm">Color Tone</Label>
                    <span className="text-xs text-muted-foreground">
                      {colorTones[colorTone]}
                    </span>
                  </div>
                  <Slider
                    value={[colorTone]}
                    onValueChange={(v) => setColorTone(v[0])}
                    max={2}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Neutral</span>
                    <span>Warm</span>
                    <span>Bold</span>
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="space-y-2">
                  <Label className="text-sm">Additional Notes</Label>
                  <Textarea
                    placeholder="E.g. emphasize kitchen island, add plants, remove dining table…"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value.slice(0, 200))}
                    className="resize-none h-20"
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {notes.length}/200
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section ref={step3Ref} className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Step 3
          </span>
          <span className="text-sm font-medium">Preview & Stage</span>
        </div>

        {/* Summary */}
        <div className="border p-4 mb-6 space-y-3">
          <div className="flex justify-between items-start gap-4">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              Floor Plan Link
            </span>
            <span className="text-xs font-mono truncate max-w-[280px]">
              {url || "—"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              Style
            </span>
            <span className="text-xs font-medium">
              {selectedStyle
                ? stylePresets.find((s) => s.id === selectedStyle)?.title
                : "—"}
            </span>
          </div>
        </div>

        {/* Generate Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleGenerate}
            disabled={!isFormValid || isGenerating}
            className="h-11 px-8"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Staging…
              </>
            ) : (
              "Generate Furnished Layout"
            )}
          </Button>
        </div>
      </section>

      {/* Output Area */}
      {showOutput && (
        <section className="border p-6">
          <p className="text-sm font-medium text-center mb-4">
            Your staged layout is ready
          </p>
          <div className="aspect-[4/3] bg-muted flex items-center justify-center mb-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 border flex items-center justify-center">
                <Home className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                Staged interior preview
              </p>
            </div>
          </div>
          <div className="flex justify-center gap-3">
            <Button variant="outline" className="h-10 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Download Layout
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
              className="h-10 bg-transparent"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try a Different Style
            </Button>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="mt-16 pt-6 border-t text-center">
        <p className="text-xs text-muted-foreground mb-2">
          Homify AI — powered by advanced vision models
        </p>
        <a
          href="#"
          className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2"
        >
          Privacy Policy
        </a>
      </footer>
    </div>
  );
}
