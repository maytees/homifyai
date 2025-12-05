import { Download, Palette, Upload } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Your Floor Plan",
    description:
      "Paste a link to any floor plan image. We support PNG, JPG, and JPEG formats.",
  },
  {
    number: "02",
    icon: Palette,
    title: "Choose Your Style",
    description:
      "Select from styles like Modern Minimalist, Cozy Scandinavian, or Luxury Contemporary.",
  },
  {
    number: "03",
    icon: Download,
    title: "Download Your Design",
    description:
      "Get your AI-staged interior in under a minute. Ready to share with clients or use in listings.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 border-t">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-4">
            How it works
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Three simple steps to transform your floor plans into stunning
            visualizations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="text-center">
                <div className="w-14 h-14 border mx-auto mb-6 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs text-muted-foreground font-medium mb-2 block">
                  {step.number}
                </span>
                <h3 className="text-base font-medium mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
