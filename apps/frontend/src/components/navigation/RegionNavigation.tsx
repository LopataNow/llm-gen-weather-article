import Link from "next/link";

import { REGIONS } from "@/lib/constants";

interface RegionNavigationProps {
  currentRegion: string;
  dateStr: string;
  isNotToday: boolean;
}

export function RegionNavigation({
  currentRegion,
  dateStr,
  isNotToday,
}: RegionNavigationProps) {
  return (
    <nav className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-1 shadow-xl backdrop-blur-md">
      {REGIONS.map((r) => {
        const isActive = currentRegion === r.id;
        return (
          <Link
            key={r.id}
            href={`/?region=${r.id}${isNotToday ? `&date=${dateStr}` : ""}`}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 sm:px-5 sm:py-2.5 ${
              isActive
                ? "bg-white/20 text-white shadow-sm ring-1 ring-white/30"
                : "text-slate-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            {r.name}
          </Link>
        );
      })}
    </nav>
  );
}
