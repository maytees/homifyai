"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Factory,
  Heart,
  Home,
  Lamp,
  Loader2,
  RefreshCw,
  Sofa,
  Warehouse,
} from "lucide-react";
import { useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { toast } from "sonner";
import { EmailVerificationBanner } from "@/components/email-verification-banner";
import { FloorPlanUploader } from "@/components/floor-plan-uploader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { blobUrlToFile } from "@/lib/s3-upload";
import { tryCatch } from "@/lib/try-catch";
import { cn } from "@/lib/utils";
import { saveFloorplan } from "./actions";

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

export default function TransformFloorPlan() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [furnishingDensity, setFurnishingDensity] = useState(1);
  const [colorTone, setColorTone] = useState(1);
  const [angle, setAngle] = useState("top-down");
  const [notes, setNotes] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setCurrentStep(2);
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setCurrentStep(1);
    setSelectedStyle(null);
    setGeneratedImage(null);
    setShowOutput(false);
  };

  const handleStyleSelect = (styleId: string) => {
    setSelectedStyle(styleId);
    setCurrentStep(3);
  };

  const handleGenerate = async () => {
    if (!selectedFile || !selectedStyle) return;

    setIsGenerating(true);

    try {
      // Upload file to S3 first
      const uploadFormData = new FormData();
      uploadFormData.append("file", selectedFile);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      if (!uploadRes.ok) {
        const uploadError = await uploadRes.json();
        toast.error(uploadError.error || "Failed to upload image");
        setIsGenerating(false);
        return;
      }

      const { url: uploadedUrl } = await uploadRes.json();

      // Now generate with the uploaded URL
      const promptText = `
Render the home layout in a "${stylePresets.find((s) => s.id === selectedStyle)?.title}" style.
Furniture density: ${densityLevels[furnishingDensity]}.
Color tone: ${colorTones[colorTone]}.
Notes: ${notes || "None"}.
Floorplan Angle: ${angle}
`.trim();

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: promptText, imageUrl: uploadedUrl }),
      });

      if (!res.ok) {
        const errorData = await res.json();

        if (res.status === 403) {
          toast.error(errorData.message || "Email verification required");
        } else if (res.status === 400 && errorData.code === "NOT_FLOOR_PLAN") {
          toast.error(
            errorData.message ||
              "The uploaded image doesn't appear to be a floor plan.",
          );
        } else {
          toast.error("Generation failed. Please try again.");
        }

        console.error("Generation failed:", res.status, errorData);
        setIsGenerating(false);
        return;
      }

      const blob = await res.blob();
      const src = URL.createObjectURL(blob);

      setShowOutput(true);
      setGeneratedImage(src);

      // Automatically save to library
      try {
        const [referenceFile, generatedFile] = await Promise.all([
          blobUrlToFile(uploadedUrl, "reference-image.png"),
          blobUrlToFile(src, "generated-image.png"),
        ]);

        const formData = new FormData();
        formData.append("referenceImage", referenceFile);
        formData.append("generatedImage", generatedFile);
        formData.append(
          "stagingStyle",
          stylePresets.find((s) => s.id === selectedStyle)?.title ||
            selectedStyle,
        );
        formData.append("furnishingDensity", densityLevels[furnishingDensity]);
        formData.append("colorTone", colorTones[colorTone]);
        formData.append("angle", angle);
        if (notes) {
          formData.append("additionalNotes", notes);
        }

        const { data: result, error } = await tryCatch(saveFloorplan(formData));

        if (error) {
          toast.error("Floor plan generated but failed to save to library.");
          console.error("Save error:", error);
        } else if (result.status === "success") {
          toast.success("Floor plan generated and saved to library!");
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("Floor plan generated but failed to save to library.");
        console.error("Auto-save error:", error);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setShowOutput(false);
    setGeneratedImage(null);
    setSelectedFile(null);
    setSelectedStyle(null);
    setCurrentStep(1);
    setFurnishingDensity(1);
    setColorTone(1);
    setAngle("top-down");
    setNotes("");
  };

  const canProceedToStep2 = selectedFile !== null;
  const canProceedToStep3 = canProceedToStep2 && selectedStyle !== null;
  const canGenerate = canProceedToStep3;

  return (
    <div className="mx-auto max-w-2xl lg:min-w-4xl px-4 py-12">
      <EmailVerificationBanner />

      <header className="text-center mb-12">
        <h1 className="text-2xl font-medium tracking-tight mb-2">Homeify AI</h1>
        <p className="text-sm text-muted-foreground">
          Turn any floor layout into a fully staged interior seamlessly.
        </p>
      </header>

      {/* Step 1: Upload Floor Plan */}
      <AnimatePresence mode="wait">
        {currentStep >= 1 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className={cn(
                  "w-8 h-8 flex items-center justify-center text-xs font-medium border transition-colors rounded-full",
                  currentStep >= 1
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background text-muted-foreground border-border",
                )}
              >
                1
              </div>
              <span className="text-sm font-medium">Upload Floor Plan</span>
            </div>

            <FloorPlanUploader
              onFileSelect={handleFileSelect}
              onRemove={handleFileRemove}
            />
          </motion.section>
        )}
      </AnimatePresence>

      {/* Step 2: Choose Staging Style */}
      <AnimatePresence mode="wait">
        {currentStep >= 2 && canProceedToStep2 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className={cn(
                  "w-8 h-8 flex items-center justify-center text-xs font-medium border transition-colors rounded-full",
                  currentStep >= 2
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background text-muted-foreground border-border",
                )}
              >
                2
              </div>
              <span className="text-sm font-medium">Choose Staging Style</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {stylePresets.map((style, index) => {
                const Icon = style.icon;
                const isSelected = selectedStyle === style.id;
                return (
                  <motion.button
                    key={style.id}
                    type="button"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
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
                  </motion.button>
                );
              })}
            </div>

            <Accordion type="single" collapsible className="border">
              <AccordionItem value="advanced" className="border-none">
                <AccordionTrigger className="px-4 py-3 text-sm hover:no-underline">
                  Advanced Staging Settings
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="space-y-6">
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

                    <div className="space-y-2">
                      <Label className="text-sm">Floor Plan Angle</Label>
                      <Select value={angle} onValueChange={setAngle}>
                        <SelectTrigger className="h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="top-down">Top-down (Recommended)</SelectItem>
                          <SelectItem value="perspective-3d">
                            Perspective 3D
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Top-down view is recommended for best accuracy. Perspective 3D may not be fully accurate.
                      </p>
                    </div>

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
          </motion.section>
        )}
      </AnimatePresence>

      {/* Step 3: Generate */}
      <AnimatePresence mode="wait">
        {currentStep >= 3 && canProceedToStep3 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className={cn(
                  "w-8 h-8 flex items-center justify-center text-xs font-medium border transition-colors rounded-full",
                  currentStep >= 3
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background text-muted-foreground border-border",
                )}
              >
                3
              </div>
              <span className="text-sm font-medium">Generate</span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-center">
                <Button
                  onClick={handleGenerate}
                  disabled={!canGenerate || isGenerating}
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
              <p className="text-xs text-muted-foreground text-center max-w-md mx-auto">
                Note: AI-generated layouts may not be 100% accurate. Please carefully review the generated model for structural accuracy.
              </p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Output Area */}
      <AnimatePresence mode="wait">
        {showOutput && generatedImage && (
          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="border p-6"
          >
            <p className="text-sm font-medium text-center mb-4">
              Your staged layout is ready (click to see full photo)
            </p>
            <div className="aspect-4/3 bg-muted flex items-center justify-center mb-6 overflow-hidden">
              <PhotoProvider>
                <PhotoView src={generatedImage}>
                  {/** biome-ignore lint/performance/noImgElement: <goon> */}
                  <img
                    alt="Floorplan Preview"
                    src={generatedImage}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover hover:cursor-pointer w-full h-full"
                  />
                </PhotoView>
              </PhotoProvider>
            </div>

            <div className="flex justify-center gap-3 flex-wrap">
              <Button
                variant="outline"
                onClick={handleReset}
                className="h-10 bg-transparent"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Generate Another
              </Button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
