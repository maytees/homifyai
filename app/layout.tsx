import type { Metadata } from "next";
import "./globals.css";
import "react-photo-view/dist/react-photo-view.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

// const inter = Inter({
//   variable: "--font-inter",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: {
    default: "Spacemint AI - AI-Powered Floor Plan Staging",
    template: "%s | Spacemint AI",
  },
  description:
    "Transform floor plans into beautifully staged interiors with AI. Professional interior design staging in under a minute. Perfect for real estate agents, home sellers, and property developers.",
  keywords: [
    "AI floor plan staging",
    "virtual staging",
    "interior design AI",
    "floor plan visualization",
    "real estate staging",
    "property marketing",
    "home staging",
  ],
  authors: [{ name: "Spacemint AI" }],
  creator: "Spacemint AI",
  publisher: "Spacemint AI",
  metadataBase: new URL("https://www.spacemintai.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.spacemintai.com",
    siteName: "Spacemint AI",
    title: "Spacemint AI - AI-Powered Floor Plan Staging",
    description:
      "Transform floor plans into beautifully staged interiors with the power of AI.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Spacemint AI - AI-Powered Floor Plan Staging",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spacemint AI - AI-Powered Floor Plan Staging",
    description:
      "Transform floor plans into beautifully staged interiors with the power of AI.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: goon
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Spacemint AI",
              alternateName: "Spacemint",
              url: "https://www.spacemintai.com",
            }),
          }}
        />
      </head>
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={`font-mono antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
