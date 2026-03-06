import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import { unstable_cache } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";

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

  const regions = [
    { id: "slovensko", name: "Slovensko" },
    { id: "zapad", name: "Západ" },
    { id: "sever", name: "Sever" },
    { id: "vychod", name: "Východ" },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden p-4 font-sans text-slate-100 selection:bg-teal-500/30">
      {/* Decorative Blur Orbs */}
      <div className="pointer-events-none absolute left-[-10%] top-[-10%] h-96 w-96 rounded-full bg-blue-500/30 opacity-60 mix-blend-screen blur-[100px]"></div>
      <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[30rem] w-[30rem] rounded-full bg-teal-400/20 opacity-60 mix-blend-screen blur-[120px]"></div>

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

          <nav className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-1 shadow-xl backdrop-blur-md">
            {regions.map((r) => {
              const isActive = region === r.id;
              return (
                <Link
                  key={r.id}
                  href={`/?region=${r.id}${isNotToday ? `&date=${dateStr}` : ""}`}
                  className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
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
        </header>

        {/* Back to Today Banner */}
        {isNotToday && (
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
        )}

        {/* Content Area with Suspense Skeleton */}
        <Suspense fallback={<WeatherSkeleton />}>
          <WeatherContentWrapper region={region} dateObj={dateObj} />
        </Suspense>

        {/* Weekly Forecast Table */}
        <WeeklyForecast region={region} />

        {/* History Records Simple List */}
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
      </div>
    </main>
  );
}
