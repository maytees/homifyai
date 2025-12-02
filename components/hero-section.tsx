import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.svg"
            alt="Spacemint AI Logo"
            width={80}
            height={80}
            className="w-20 h-20"
          />
        </div>

        <div className="inline-flex items-center gap-2 border px-3 py-1.5 mb-6">
          <Sparkles className="w-3 h-3" />
          <span className="text-xs font-medium">
            AI-Powered Interior Staging
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 text-balance">
          Turn any floor plan into a beautifully staged interior
        </h1>

        <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto text-balance">
          Upload your blueprint, choose a style, and let AI transform it into a
          fully furnished visualization in seconds.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" asChild className="h-12 px-8">
            <Link href="/register">
              Start Staging
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="mt-16 border p-8">
          <div className="aspect-video bg-muted flex items-center justify-center">
            <div className="text-center">
              <div className="flex items-center justify-center gap-8 mb-4">
                <div className="w-24 h-24 border-2 border-dashed flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">
                    Blueprint
                  </span>
                </div>
                <ArrowRight className="w-6 h-6 text-muted-foreground" />
                <div className="w-24 h-24 border-2 flex items-center justify-center bg-foreground/5">
                  <span className="text-xs text-muted-foreground">Staged</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Interactive demo preview
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
