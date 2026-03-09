import { CloudOff } from "lucide-react";
import { unstable_cache } from "next/cache";
import { Suspense } from "react";

import { HistoricalBanner } from "@/components/navigation/HistoricalBanner";
import { HistoryArchiveList } from "@/components/navigation/HistoryArchiveList";
import { RegionNavigation } from "@/components/navigation/RegionNavigation";
import { WeatherBento } from "@/components/weather/WeatherBento";
import { WeatherSkeleton } from "@/components/weather/WeatherSkeleton";
import { WeeklyForecast } from "@/components/weather/WeeklyForecast";
import { WeeklyForecastSkeleton } from "@/components/weather/WeeklyForecastSkeleton";
import { getArticle } from "@/services/weather.api";

const getArticleCache = unstable_cache(
  async (region: string, dateStr: string) => {
    return await getArticle(region, dateStr).then((res) => res.data);
  },
  ["weather-story-v2"],
  { revalidate: 3600 * 2, tags: ["weather-story-v2"] }, // Cache for 2 hours
);

// Async Wrapper allowing Suspense to catch the loading state
async function WeatherContentWrapper({
  region,
  dateStr,
}: {
  region: string;
  dateStr: string;
}) {
  let weatherData = null;
  try {
    weatherData = await getArticleCache(region, dateStr);
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
  }

  if (!weatherData) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-12 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
        <div className="rounded-full bg-slate-800/50 p-4">
          <CloudOff className="h-8 w-8 text-slate-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Údaje nedostupné</h3>
          <p className="mt-1 text-slate-400">
            Príbeh počasia pre tento deň nebolo možné vygenerovať.
          </p>
        </div>
      </div>
    );
  }

  return <WeatherBento data={weatherData} />;
}

export default async function Home(props: {
  searchParams?: Promise<{
    region?: string;
    date?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const region = searchParams?.region || "slovensko";
  const dateStr = searchParams?.date || new Date().toISOString().split("T")[0];
  const dateObj = new Date(dateStr);
  const todayStr = new Date().toISOString().split("T")[0];
  const isNotToday = dateStr !== todayStr;

  return (
    <main className="relative min-h-screen p-4 font-sans text-slate-100 selection:bg-teal-500/30">
      <div className="container relative z-10 mx-auto max-w-5xl pb-20 pt-10">
        {/* Header & Navigation */}
        <header className="mb-8 flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <h1 className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent md:text-5xl">
              AI Počasie
            </h1>
            <p className="mt-2 font-medium text-slate-400">
              Predpoveď inšpirovaná umelou inteligenciou
            </p>
          </div>

          <RegionNavigation
            currentRegion={region}
            dateStr={dateStr}
            isNotToday={isNotToday}
          />
        </header>

        {/* Back to Today Banner */}
        {isNotToday && <HistoricalBanner dateObj={dateObj} region={region} />}

        {/* Content Area with Suspense Skeleton */}
        <Suspense fallback={<WeatherSkeleton />}>
          <WeatherContentWrapper region={region} dateStr={dateStr} />
        </Suspense>

        {/* Weekly Forecast Table */}
        <Suspense fallback={<WeeklyForecastSkeleton />}>
          <WeeklyForecast region={region} />
        </Suspense>

        {/* History Records Simple List */}
        <HistoryArchiveList region={region} />
      </div>
    </main>
  );
}
