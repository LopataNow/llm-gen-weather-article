import { Skeleton } from "@/components/ui/skeleton";

export function WeatherSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
      {/* Main Article Skeleton */}
      <div className="group relative row-span-2 overflow-hidden rounded-3xl border border-white/5 bg-white/5 p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] shadow-xl sm:p-8 md:col-span-2 md:p-10 lg:col-span-3">
        <div className="relative z-10 flex h-full flex-col justify-between">
          <div className="animate-pulse">
            <Skeleton className="mb-4 h-12 w-3/4 rounded-2xl bg-white/5" />
            <Skeleton className="mb-8 h-8 w-1/2 rounded-xl bg-white/5" />
            <div className="space-y-6">
              <Skeleton className="h-6 w-1/3 rounded-lg bg-white/5" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded bg-white/5" />
                <Skeleton className="h-4 w-5/6 rounded bg-white/5" />
              </div>

              <Skeleton className="mt-6 h-6 w-1/3 rounded-lg bg-white/5" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded bg-white/5" />
                <Skeleton className="h-4 w-4/5 rounded bg-white/5" />
              </div>
            </div>
          </div>
          <Skeleton className="mt-10 h-16 w-full animate-pulse rounded-2xl bg-white/5" />
        </div>
      </div>

      {/* Secondary widgets Skeleton (Temp, Wind...) */}
      <div className="flex h-48 flex-col justify-between rounded-2xl border border-white/5 bg-white/5 p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] shadow-md">
        <div className="flex animate-pulse justify-between">
          <Skeleton className="h-12 w-12 rounded-2xl bg-white/5" />
          <Skeleton className="h-4 w-16 rounded bg-white/5" />
        </div>
        <Skeleton className="h-12 w-24 animate-pulse rounded-lg bg-white/5" />
      </div>

      <div className="flex h-48 flex-col justify-between rounded-2xl border border-white/5 bg-white/5 p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] shadow-md">
        <div className="flex animate-pulse justify-between">
          <Skeleton className="h-12 w-12 rounded-2xl bg-white/5" />
          <Skeleton className="h-4 w-16 rounded bg-white/5" />
        </div>
        <Skeleton className="h-12 w-24 animate-pulse rounded-lg bg-white/5" />
      </div>

      <div className="flex h-48 flex-col justify-between rounded-2xl border border-white/5 bg-white/5 p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] shadow-md">
        <div className="flex animate-pulse justify-between">
          <Skeleton className="h-12 w-12 rounded-2xl bg-white/5" />
          <Skeleton className="h-4 w-16 rounded bg-white/5" />
        </div>
        <Skeleton className="h-12 w-24 animate-pulse rounded-lg bg-white/5" />
      </div>
      <div className="flex h-48 flex-col justify-between rounded-2xl border border-white/5 bg-white/5 p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] shadow-md">
        <div className="flex animate-pulse justify-between">
          <Skeleton className="h-12 w-12 rounded-2xl bg-white/5" />
          <Skeleton className="h-4 w-16 rounded bg-white/5" />
        </div>
        <Skeleton className="h-12 w-24 animate-pulse rounded-lg bg-white/5" />
      </div>
    </div>
  );
}
