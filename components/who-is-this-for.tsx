import { Briefcase, Building2, Camera, Users } from "lucide-react";

const audiences = [
  {
    icon: Building2,
    title: "Real Estate Agents",
    description:
      "Create compelling property visualizations that help buyers imagine the potential of empty spaces.",
  },
  {
    icon: Users,
    title: "Interior Designers",
    description:
      "Quickly generate multiple design concepts from floor plans to present to clients.",
  },
  {
    icon: Briefcase,
    title: "Property Developers",
    description:
      "Showcase pre-construction units with realistic interior staging before they're built.",
  },
  {
    icon: Camera,
    title: "Home Stagers",
    description:
      "Offer virtual staging services to clients without the cost of physical furniture.",
  },
];

export function WhoIsThisFor() {
  return (
    <section id="who-is-this-for" className="py-24 border-t">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-4">
            Who is this for?
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Built for professionals who need to visualize spaces quickly and
            beautifully.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {audiences.map((audience) => {
            const Icon = audience.icon;
            return (
              <div key={audience.title} className="border p-6 flex gap-4">
                <div className="w-10 h-10 border shrink-0 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">{audience.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {audience.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
