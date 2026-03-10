import { Skeleton } from "@/components/ui/skeleton";

export function WeeklyForecastSkeleton() {
  return (
    <div className="mt-12 animate-pulse overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] shadow-xl sm:p-6 md:p-8">
      <Skeleton className="mb-8 h-8 w-64 rounded-xl bg-white/5" />

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-left">
          <thead>
            <tr className="border-b border-white/10 text-sm uppercase tracking-wider text-white/50">
              <th className="pb-4 font-medium">Deň</th>
              <th className="pb-4 font-medium">Súhrn</th>
              <th className="pb-4 text-right font-medium">Max</th>
              <th className="pb-4 text-right font-medium">Min</th>
              <th className="pb-4 text-right font-medium">Zrážky</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[...Array(6)].map((_, i) => (
              <tr key={i}>
                <td className="py-4">
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-5 w-24 rounded bg-white/5" />
                    <Skeleton className="h-3 w-12 rounded bg-white/5" />
                  </div>
                </td>
                <td className="py-4">
                  <Skeleton className="h-10 w-10 rounded-full bg-white/5" />
                </td>
                <td className="py-4 text-right">
                  <Skeleton className="ml-auto h-7 w-12 rounded bg-white/5" />
                </td>
                <td className="py-4 text-right">
                  <Skeleton className="ml-auto h-7 w-12 rounded bg-white/5" />
                </td>
                <td className="py-4 text-right">
                  <Skeleton className="ml-auto h-6 w-16 rounded bg-white/5" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
