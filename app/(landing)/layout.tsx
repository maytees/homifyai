import type React from "react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

const LandingLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen">
      {/* Blueprint grid background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Main grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Heavier grid lines every 5 cells */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "300px 300px",
          }}
        />
        {/* Radial gradient overlay for depth */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, transparent 0%, hsl(var(--background)) 100%)",
          }}
        />
      </div>

      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default LandingLayout;
