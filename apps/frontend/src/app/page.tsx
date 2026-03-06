import { unstable_cache } from "next/cache";
import { Suspense } from "react";

import { HistoricalBanner } from "@/components/HistoricalBanner";
import { HistoryArchiveList } from "@/components/HistoryArchiveList";
import { RegionNavigation } from "@/components/RegionNavigation";
import { WeatherBento } from "@/components/WeatherBento";
import { WeatherSkeleton } from "@/components/WeatherSkeleton";
import { WeeklyForecast } from "@/components/WeeklyForecast";

import { getArticle } from "./calls/weather-article-gen";

const getArticleCache = unstable_cache(
  async (region: string, date: Date) => {
    return await getArticle(region, date).then((res) => res.data);
  },
  ["weather-story-v2"],
  { revalidate: 3600 * 2, tags: ["weather-story-v2"] }, // Cache for 2 hours
);

// Async Wrapper allowing Suspense to catch the loading state
async function WeatherContentWrapper({
  region,
  dateObj,
}: {
  region: string;
  dateObj: Date;
}) {
  let weatherData = null;
  try {
    weatherData = await getArticleCache(region, dateObj);
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
  }

  if (!weatherData) {
    return (
      <div className="flex h-64 items-center justify-center rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-md">
        <p className="text-slate-400">
          Príbeh počasia pre tento deň nebolo možné vygenerovať.
        </p>
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
          <WeatherContentWrapper region={region} dateObj={dateObj} />
        </Suspense>

        {/* Weekly Forecast Table */}
        <WeeklyForecast region={region} />

        {/* History Records Simple List */}
        <HistoryArchiveList region={region} />
      </div>
    </main>
  );
}
