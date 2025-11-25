import { FAQSection } from "@/components/faq-section";
import { HeroSection } from "@/components/hero-section";
import { HowItWorks } from "@/components/how-it-works";
import { PricingSection } from "@/components/pricing-section";
import { WhoIsThisFor } from "@/components/who-is-this-for";

export default function Home() {
  return (
    <main>
      {/* <Navbar /> */}
      <HeroSection />
      <HowItWorks />
      <WhoIsThisFor />
      <PricingSection />
      <FAQSection />
      {/* <Footer /> */}
    </main>
  );
}
