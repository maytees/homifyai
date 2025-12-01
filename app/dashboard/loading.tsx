import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <header className="text-center mb-12">
        <Skeleton className="h-8 w-48 mx-auto mb-2" />
        <Skeleton className="h-4 w-96 mx-auto" />
      </header>

      {/* Upload Section */}
      <div className="mb-8">
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>

      {/* Style Selection */}
      <div className="mb-8">
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-lg" />
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-4 mb-8">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Generate Button */}
      <Skeleton className="h-12 w-full rounded-lg" />
    </div>
  );
}
