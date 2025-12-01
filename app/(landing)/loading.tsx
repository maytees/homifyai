import { Skeleton } from "@/components/ui/skeleton";

export default function LandingLoading() {
  return (
    <main>
      {/* Hero Section Skeleton */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Skeleton className="h-12 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-2/3 mx-auto" />
          <Skeleton className="h-10 w-32 mx-auto" />
        </div>
      </section>

      {/* How It Works Skeleton */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <Skeleton className="h-10 w-64 mx-auto mb-12" />
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-6 w-3/4 mx-auto" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Is This For Skeleton */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-10 w-64 mx-auto mb-12" />
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Skeleton */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-10 w-64 mx-auto mb-12" />
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-96 w-full" />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Skeleton */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <Skeleton className="h-10 w-64 mx-auto mb-12" />
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
