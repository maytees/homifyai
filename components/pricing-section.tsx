import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Try Homeify AI risk-free",
    features: ["5 generations per month", "All 6 interior styles", "Watermarked results", "Standard processing"],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pay-as-you-go",
    price: "$2",
    period: "per generation",
    description: "Perfect for one-off projects",
    features: ["No monthly commitment", "No watermarks", "All 6 interior styles", "Faster processing"],
    cta: "Buy Credits",
    highlighted: true,
    badge: "Popular",
  },
]

const comingSoonPlans = [
  {
    name: "Pro",
    price: "$12",
    period: "/month",
    features: ["100 generations/month", "Priority rendering", "Style packs"],
  },
  {
    name: "Team",
    price: "$79",
    period: "/month",
    features: ["Multi-user access", "Shared credits", "Priority support"],
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Simple, transparent pricing</h2>
          <p className="text-muted-foreground text-lg">Start free, pay only for what you use</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative ${plan.highlighted ? "border-foreground shadow-lg" : "border-border"}`}
            >
              {plan.badge && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-foreground text-background">
                  {plan.badge}
                </Badge>
              )}
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="pt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-foreground flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    plan.highlighted
                      ? "bg-foreground text-background hover:bg-foreground/90"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="border-t pt-12">
          <p className="text-center text-sm text-muted-foreground mb-6">Coming soon</p>
          <div className="grid md:grid-cols-2 gap-4">
            {comingSoonPlans.map((plan) => (
              <div
                key={plan.name}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-dashed"
              >
                <div>
                  <p className="font-medium">{plan.name}</p>
                  <p className="text-sm text-muted-foreground">{plan.features.join(" · ")}</p>
                </div>
                <div className="text-right">
                  <span className="font-semibold">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
