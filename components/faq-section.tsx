import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
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
    question: "What resolution are the output images?",
    answer:
      "Output images match the resolution of your input floor plan, with a maximum of 4096x4096 pixels. They're suitable for both digital and print use.",
  },
  {
    question: "Can I use these images commercially?",
    answer:
      "Yes, all generated images are yours to use for commercial purposes including property listings, marketing materials, and client presentations.",
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="py-24 border-t">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-4">Frequently asked questions</h2>
          <p className="text-muted-foreground">Everything you need to know about Homeify AI.</p>
        </div>

        <Accordion type="single" collapsible className="border divide-y">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-none">
              <AccordionTrigger className="px-4 py-4 text-sm text-left hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 text-sm text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
