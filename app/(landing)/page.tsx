"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Check,
  Clock,
  DollarSign,
  Download,
  FileText,
  HomeIcon,
  Palette,
  Upload,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 },
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
        // biome-ignore lint/security/noDangerouslySetInnerHtml: goon
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main className="relative">
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col justify-center items-center px-6 py-12 overflow-hidden">
          {/* Decorative Architectural Lines */}
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <div className="absolute top-[20%] left-0 w-full h-px bg-primary/20" />
            <div className="absolute top-[80%] left-0 w-full h-px bg-primary/20" />
            <div className="absolute left-[20%] top-0 h-full w-px bg-primary/20" />
            <div className="absolute right-[20%] top-0 h-full w-px bg-primary/20" />
          </div>

          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Text Content */}
            <motion.div
              className="lg:col-span-6 text-left"
              initial="initial"
              animate="animate"
              variants={fadeInUp}
            >
              <Link
                href="https://www.producthunt.com/products/spacemint-ai?launch=spacemint-ai"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.div
                  className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 mb-6 cursor-pointer hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-105"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="h-1.5 w-1.5 animate-pulse bg-primary rounded-full" />
                  <span className="text-[10px] font-bold tracking-widest uppercase text-primary">
                    Upvote us on Product Hunt
                  </span>
                </motion.div>
              </Link>

              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight"
                variants={fadeInUp}
              >
                AI Powered <br />
                <span className="text-primary">Interior Staging</span>
              </motion.h1>

              <motion.p
                className="text-sm md:text-base text-muted-foreground mb-8 leading-relaxed max-w-lg border-l-2 border-primary/30 pl-4"
                variants={fadeInUp}
              >
                Turn any floor plan into a beautifully staged interior. Upload
                your blueprint, choose a style, and let AI transform it into a
                fully furnished visualization in under a minute.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                variants={fadeInUp}
              >
                <Button asChild size="lg" className="uppercase tracking-wider">
                  <Link href="/register">Start Staging_</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="uppercase tracking-wider"
                >
                  <Link
                    href="https://www.youtube.com/watch?v=pxNxSyL9540"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Demo
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                className="mt-12 flex items-center gap-4 text-[10px] text-muted-foreground"
                variants={fadeInUp}
              >
                <span className="flex items-center gap-2">
                  <Check className="w-3 h-3" />
                  Accurate Realism
                </span>
                <span className="w-px h-3 bg-border" />
                <span className="flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  &lt; 60s
                </span>
              </motion.div>
            </motion.div>

            {/* Demo Video */}
            <motion.div
              className="lg:col-span-6 w-full"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-full aspect-video border rounded-lg overflow-hidden group bg-card/50 backdrop-blur">
                {/* Top Bar */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-background/80 border-b flex items-center px-3 justify-between z-20">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-destructive/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                  </div>
                  <div className="text-[9px] text-muted-foreground uppercase font-mono">
                    demo_render.mp4
                  </div>
                </div>

                {/* Video Container */}
                <div className="w-full h-full pt-8">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/pxNxSyL9540?si=gpB9UIsnJ_O5ipn1"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Before/After Section */}
        <section className="relative py-20 px-6 overflow-hidden border-b bg-muted/20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-4 py-1.5 mb-4 text-xs font-mono border border-primary/30 rounded-full bg-primary/5">
                TRANSFORMATION.SHOWCASE
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Blueprint to <span className="text-primary">Reality_</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                See how our AI transforms empty floor plans into fully staged
                interiors
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Before Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative border rounded-lg overflow-hidden bg-card/50 backdrop-blur">
                  {/* Top Bar */}
                  <div className="absolute top-0 left-0 right-0 h-8 bg-background/80 border-b flex items-center px-3 justify-between z-20">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-destructive/50" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                      <div className="w-2 h-2 rounded-full bg-green-500/50" />
                    </div>
                    <div className="text-[9px] text-muted-foreground uppercase font-mono">
                      input_blueprint.dwg
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative pt-8 aspect-736/640">
                    <Image
                      src="https://ph-files.imgix.net/4c908fb5-543f-40c3-91c9-1cfe3ad8f299.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=736&h=640&fit=max&frame=1&dpr=2"
                      alt="Floor plan before staging"
                      className="object-cover"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    {/* Label */}
                    <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-background/90 border rounded backdrop-blur">
                      <span className="text-xs font-mono text-muted-foreground">
                        BEFORE
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* After Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative border border-primary/50 rounded-lg overflow-hidden bg-card/50 backdrop-blur">
                  {/* Top Bar */}
                  <div className="absolute top-0 left-0 right-0 h-8 bg-background/80 border-b flex items-center px-3 justify-between z-20">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-destructive/50" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                      <div className="w-2 h-2 rounded-full bg-green-500/50" />
                    </div>
                    <div className="text-[9px] text-muted-foreground uppercase font-mono">
                      output_staged.png
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative pt-8 aspect-square">
                    <Image
                      src="https://ph-files.imgix.net/b2f7dedb-7838-4b54-8661-b80b0fd487ab.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=640&h=640&fit=max&frame=1&dpr=2"
                      alt="Floor plan after AI staging"
                      className="object-cover"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    {/* AI Badge */}
                    <motion.div
                      className="absolute top-12 right-4 px-3 py-1.5 bg-primary/90 border border-primary/30 rounded backdrop-blur"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                    >
                      <span className="text-xs font-mono text-primary-foreground flex items-center gap-2">
                        <span className="inline-block w-1.5 h-1.5 bg-primary-foreground rounded-full animate-pulse" />
                        AI STAGED
                      </span>
                    </motion.div>
                    {/* Label */}
                    <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-primary/90 border border-primary/30 rounded backdrop-blur">
                      <span className="text-xs font-mono text-primary-foreground">
                        AFTER
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="py-24 border-y bg-muted/30 backdrop-blur"
        >
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              className="mb-16 md:flex md:justify-between md:items-end"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <h2 className="text-2xl font-bold mb-2">How does it work?</h2>
                <p className="text-sm text-muted-foreground uppercase tracking-widest">
                  Three steps to visualization
                </p>
              </div>
              <div className="hidden md:block w-32 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {/* Step 01 */}
              <motion.div variants={scaleIn}>
                <Card className="group relative p-6 bg-card/50 hover:bg-card transition-all duration-500 border-t border-t-primary/50">
                  <div className="text-5xl font-bold  group-hover:text-primary/20 transition-colors mb-6 select-none">
                    01
                  </div>
                  <div className="mb-4 text-primary">
                    <Upload className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Upload Floor Plan</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Paste a link to any floor plan image. We support PNG, JPG,
                    and JPEG formats. System auto-detects dimensions.
                  </p>
                </Card>
              </motion.div>

              {/* Step 02 */}
              <motion.div variants={scaleIn}>
                <Card className="group relative p-6 bg-card/50 hover:bg-card transition-all duration-500 border-t border-t-primary/50">
                  <div className="text-5xl font-bold group-hover:text-primary/20 transition-colors mb-6 select-none">
                    02
                  </div>
                  <div className="mb-4 text-primary">
                    <Palette className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Choose Your Style</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Select from styles like Modern Minimalist, Cozy
                    Scandinavian, Luxury Contemporary, and many more.
                  </p>
                </Card>
              </motion.div>

              {/* Step 03 */}
              <motion.div variants={scaleIn}>
                <Card className="group relative p-6 bg-card/50 hover:bg-card transition-all duration-500 border-t border-t-primary/50">
                  <div className="text-5xl font-bold  group-hover:text-primary/20 transition-colors mb-6 select-none">
                    03
                  </div>
                  <div className="mb-4 text-primary">
                    <Download className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Download Design</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Get your AI-staged interior in under a minute. High
                    resolution outputs ready to share with clients.
                  </p>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section id="who-its-for" className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">Target Architectures</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Built for professionals who need to visualize spaces quickly.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                {
                  icon: Building2,
                  sector: "Real Estate",
                  title: "Real Estate Agents",
                  description:
                    "Create compelling property visualizations that help buyers imagine the potential of empty spaces. Increase listing engagement.",
                },
                {
                  icon: FileText,
                  sector: "Design",
                  title: "Interior Designers",
                  description:
                    "Quickly generate multiple design concepts from floor plans to present to clients. Rapid ideation prototyping based on exactly what your client needs.",
                },
                {
                  icon: HomeIcon,
                  sector: "Construction",
                  title: "Property Developers",
                  description:
                    "Showcase pre-construction units with realistic interior staging before they're built. Drive pre-sales.",
                },
                {
                  icon: DollarSign,
                  sector: "Staging",
                  title: "Home Stagers",
                  description:
                    "Offer virtual staging services to clients without the cost of physical furniture logistics. Expand service capability.",
                },
              ].map((item) => (
                <motion.div key={item.title} variants={scaleIn}>
                  <Card className="group p-8 bg-card border hover:border-primary/50 transition-all duration-300">
                    <div className="flex items-start justify-between mb-6">
                      <div className="p-3 bg-muted rounded border group-hover:text-primary transition-colors">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] uppercase font-bold text-muted-foreground">
                        Sector: {item.sector}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 border-t bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">Pricing</h2>
              <p className="text-muted-foreground">
                Simple, transparent pricing. Start free, pay only for what you
                use.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {/* Free Plan */}
              <motion.div variants={scaleIn}>
                <Card className="p-8 bg-card/50 flex flex-col h-full">
                  <h3 className="text-xl font-bold mb-2">Free</h3>
                  <p className="text-xs text-muted-foreground mb-6 uppercase tracking-wider">
                    Evaluation Mode
                  </p>
                  <div className="text-4xl font-bold mb-6">
                    $0
                    <span className="text-sm text-muted-foreground">
                      /forever
                    </span>
                  </div>

                  <ul className="space-y-4 mb-8 text-sm flex-1">
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-primary" />5 generations
                      per month
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-primary" />6 interior
                      styles
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-primary" />
                      Storage Library
                    </li>
                    <li className="flex items-center gap-3 text-muted-foreground">
                      <X className="w-4 h-4" />
                      Watermarked results
                    </li>
                    <li className="flex items-center gap-3 text-muted-foreground">
                      <X className="w-4 h-4" />
                      Standard processing
                    </li>
                  </ul>

                  <Button
                    variant="outline"
                    className="w-full uppercase tracking-wider"
                    asChild
                  >
                    <Link href="/register">Get Started</Link>
                  </Button>
                </Card>
              </motion.div>

              {/* Pro Plan */}
              <motion.div
                variants={scaleIn}
                className="transform md:-translate-y-4"
              >
                <Card className="relative border-2 border-primary bg-card p-8 shadow-lg shadow-primary/10 flex flex-col h-full">
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 uppercase">
                    Popular
                  </div>
                  <h3 className="text-xl font-bold mb-2">Pro Plan</h3>
                  <p className="text-xs text-muted-foreground mb-6 uppercase tracking-wider">
                    Professional Access
                  </p>
                  <div className="text-4xl font-bold mb-6">
                    $12
                    <span className="text-sm text-muted-foreground">
                      /month
                    </span>
                  </div>

                  <ul className="space-y-4 mb-8 text-sm flex-1">
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-primary" />
                      <span className="font-medium">20 credits/month</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-primary" />
                      Faster staging & priority queue
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-primary" />
                      20+ style packs unlocked
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-primary" />
                      Storage Library
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-primary" />
                      No watermark
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-primary" />
                      Priority Support
                    </li>
                    <li className="flex items-center gap-3 text-xs text-primary pl-7">
                      $0.50 per extra credit
                    </li>
                  </ul>

                  <Button className="w-full uppercase tracking-wider" asChild>
                    <Link href="/register">Upgrade Now</Link>
                  </Button>
                </Card>
              </motion.div>

              {/* Team Plan */}
              <motion.div variants={scaleIn}>
                <Card className="p-8 bg-card/30 flex flex-col h-full opacity-75">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold mb-2">Team</h3>
                    <span className="text-[9px] border border-border text-muted-foreground px-1.5 py-0.5 rounded">
                      SOON
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-6 uppercase tracking-wider">
                    Enterprise Scale
                  </p>
                  <div className="text-4xl font-bold text-muted-foreground mb-6">
                    $79<span className="text-sm">/month</span>
                  </div>

                  <ul className="space-y-4 mb-8 text-sm text-muted-foreground flex-1">
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4" />
                      Multi-user access
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4" />
                      Shared credits pool
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4" />
                      Priority support (24/7)
                    </li>
                  </ul>

                  <Button
                    variant="outline"
                    className="w-full uppercase tracking-wider"
                    disabled
                  >
                    Coming Soon
                  </Button>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 relative max-w-4xl mx-auto px-6">
          <motion.div
            className="mb-12 border-b pb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold">FAQ</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border bg-card/50">
                <AccordionTrigger className="px-4">
                  <span className="text-sm font-bold">
                    What file formats are supported?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We currently accept PNG, JPG, and JPEG files. For best
                    results, ensure the floor plan is clearly visible with
                    defined walls. High contrast black and white blueprints work
                    best.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border bg-card/50">
                <AccordionTrigger className="px-4">
                  <span className="text-sm font-bold">
                    Do credits roll over?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    On the Pro plan, unused credits roll over for up to 3
                    months. Free plan credits reset monthly and do not
                    accumulate.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border bg-card/50">
                <AccordionTrigger className="px-4">
                  <span className="text-sm font-bold">
                    Is the generated furniture real?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The furniture is AI-generated for visualization purposes.
                    While realistic, it represents style concepts rather than
                    specific purchasable inventory items.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </section>
      </main>
    </>
  );
}
