import { CalendarDays } from "lucide-react";
import Link from "next/link";

interface HistoryArchiveListProps {
  region: string;
}

export function HistoryArchiveList({ region }: HistoryArchiveListProps) {
  return (
    <div className="mt-12">
      <h3 className="mb-4 flex items-center gap-2 text-xl font-bold tracking-tight text-white">
        <CalendarDays className="h-5 w-5 text-indigo-400" />
        Archív predpovedí
      </h3>
      <div className="flex flex-wrap gap-3">
        {[...Array(7)].map((_, i) => {
          const d = new Date(Date.now() - 86400000 * (i + 1));
          const dStr = d.toISOString().split("T")[0];
          return (
            <Link
              key={dStr}
              href={`/?region=${region}&date=${dStr}`}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/20 hover:text-white"
            >
              {d.toLocaleDateString("sk-SK")}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
