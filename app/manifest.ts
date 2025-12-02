import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Spacemint AI - AI-Powered Floor Plan Staging",
    short_name: "Spacemint AI",
    description:
      "Transform floor plans into beautifully staged interiors with the power of AI.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#392e58",
    icons: [
      {
        src: "/logo.png",
        sizes: "any",
        type: "image/png",
      },
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
