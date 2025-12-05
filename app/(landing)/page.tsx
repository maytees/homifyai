import type { Metadata } from "next";
import { FAQSection } from "@/components/faq-section";
import { HeroSection } from "@/components/hero-section";
import { HowItWorks } from "@/components/how-it-works";
import { PricingSection } from "@/components/pricing-section";
import { WhoIsThisFor } from "@/components/who-is-this-for";

export const metadata: Metadata = {
  title: "AI-Powered Floor Plan Staging - Transform Your Property Listings",
  description:
    "Transform floor plans into beautifully staged interiors with AI. Professional interior design staging in seconds. 5 free credits to start, then $12/month for 20 generations.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Spacemint AI",
    description:
      "AI-powered floor plan staging and virtual interior design platform",
    url: "https://www.spacemintai.com",
    applicationCategory: "DesignApplication",
    offers: {
      "@type": "Offer",
      price: "12.00",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "12.00",
        priceCurrency: "USD",
        referenceQuantity: {
          "@type": "QuantityValue",
          value: "1",
          unitText: "MONTH",
        },
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "127",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: oon
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main>
        {/* <Navbar /> */}
        <HeroSection />
        <HowItWorks />
        <WhoIsThisFor />
        <PricingSection />
        <FAQSection />
        {/* <Footer /> */}
      </main>
    </>
  );
}
