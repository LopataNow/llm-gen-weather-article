import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";

interface HistoricalBannerProps {
  dateObj: Date;
  region: string;
}

export function HistoricalBanner({ dateObj, region }: HistoricalBannerProps) {
  return (
    <div className="mb-10 flex flex-col items-center justify-between rounded-2xl border border-indigo-500/30 bg-indigo-500/10 px-6 py-4 shadow-lg backdrop-blur-md sm:flex-row">
      <div className="flex items-center gap-3 text-indigo-200">
        <Clock className="h-5 w-5" />
        <span>
          Prezeráte si historický archív z{" "}
          <strong>{dateObj.toLocaleDateString("sk-SK")}</strong>
        </span>
      </div>
      <Link
        href={`/?region=${region}`}
        className="mt-4 flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-indigo-600 sm:mt-0"
      >
        <span>Vrátiť sa na dnešok</span>
        <ArrowLeft className="h-4 w-4 rotate-180" />
      </Link>
    </div>
  );
}
