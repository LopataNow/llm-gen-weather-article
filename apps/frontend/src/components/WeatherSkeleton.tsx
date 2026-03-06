import { Skeleton } from "@/components/ui/skeleton";

export function WeatherSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
      {/* Main Article Skeleton */}
      <div className="group relative row-span-2 overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/5 p-5 shadow-2xl backdrop-blur-sm sm:p-8 md:col-span-2 md:p-10 lg:col-span-3">
        <div className="relative z-10 flex h-full flex-col justify-between">
          <div>
            <Skeleton className="mb-4 h-12 w-3/4 rounded-xl bg-white/10" />
            <Skeleton className="mb-8 h-8 w-1/2 rounded-xl bg-white/10" />
            <div className="space-y-6">
              <Skeleton className="h-6 w-1/3 rounded-lg bg-white/10" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded bg-white/10" />
                <Skeleton className="h-4 w-5/6 rounded bg-white/10" />
              </div>

              <Skeleton className="mt-6 h-6 w-1/3 rounded-lg bg-white/10" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded bg-white/10" />
                <Skeleton className="h-4 w-4/5 rounded bg-white/10" />
              </div>
            </div>
          </div>
          <Skeleton className="mt-10 h-16 w-full rounded-2xl bg-white/10" />
        </div>
      </div>

      {/* Secondary widgets Skeleton (Temp, Wind...) */}
      <div className="flex h-48 flex-col justify-between rounded-[2rem] border border-white/5 bg-white/5 p-6 backdrop-blur-sm">
        <div className="flex justify-between">
          <Skeleton className="h-12 w-12 rounded-2xl bg-white/10" />
          <Skeleton className="h-4 w-16 rounded bg-white/10" />
        </div>
        <Skeleton className="h-12 w-24 rounded-lg bg-white/10" />
      </div>

      <div className="flex h-48 flex-col justify-between rounded-[2rem] border border-white/5 bg-white/5 p-6 backdrop-blur-sm">
        <div className="flex justify-between">
          <Skeleton className="h-12 w-12 rounded-2xl bg-white/10" />
          <Skeleton className="h-4 w-16 rounded bg-white/10" />
        </div>
        <Skeleton className="h-12 w-24 rounded-lg bg-white/10" />
      </div>

      <div className="flex h-48 flex-col justify-between rounded-[2rem] border border-white/5 bg-white/5 p-6 backdrop-blur-sm">
        <div className="flex justify-between">
          <Skeleton className="h-12 w-12 rounded-2xl bg-white/10" />
          <Skeleton className="h-4 w-16 rounded bg-white/10" />
        </div>
        <Skeleton className="h-12 w-24 rounded-lg bg-white/10" />
      </div>
      <div className="flex h-48 flex-col justify-between rounded-[2rem] border border-white/5 bg-white/5 p-6 backdrop-blur-sm">
        <div className="flex justify-between">
          <Skeleton className="h-12 w-12 rounded-2xl bg-white/10" />
          <Skeleton className="h-4 w-16 rounded bg-white/10" />
        </div>
        <Skeleton className="h-12 w-24 rounded-lg bg-white/10" />
      </div>
    </div>
  );
}
