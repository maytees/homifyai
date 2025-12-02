import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs: { question: string; answer: string }[] = [
  {
    question: "What image formats are supported?",
    answer:
      "We support PNG, JPG, JPEG, and WebP formats. For best results, use high-resolution floor plan images with clear lines and room labels.",
  },
  {
    question: "How long does it take to generate a staged image?",
    answer:
      "Most images are generated within 10-30 seconds, depending on the complexity of the floor plan and the selected style.",
  },
  {
    question: "Can I customize the furniture and decor?",
    answer:
      "Yes! After selecting a base style, you can adjust furnishing density, color tones, and add specific notes about what you want included or excluded.",
  },
  {
    question: "Can I use these images commercially?",
    answer:
      "Yes, all generated images are yours to use for commercial purposes including property listings, marketing materials, and client presentations.",
  },
  {
    question: "Can I add my own custom furnniture?",
    answer:
      "As of right now, you arent able to add your own furniture, but in the future we will support simply pasting in something like an IKEA link for whatever furniture you'd like to have in your home.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-24 border-t">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-4">
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know about Spacemint AI.
          </p>
        </div>

        <Accordion type="single" collapsible className="border divide-y">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={`item-${index}`}
              className="border-none"
            >
              <AccordionTrigger className="px-4 py-4 text-sm text-left hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 text-sm text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
