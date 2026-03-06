import { unstable_cache } from "next/cache";
import Link from "next/link";

import { WeatherBento } from "@/components/WeatherBento";

import { getArticle } from "./calls/weather-article-gen";

const getArticleCache = unstable_cache(
  async (region: string, date: Date) => {
    return await getArticle(region, date).then((res) => res.data);
  },
  ["weather-story-v2"],
  { revalidate: 3600 * 2, tags: ["weather-story-v2"] }, // Cache for 2 hours
);

export default async function Home(props: {
  searchParams?: Promise<{
    region?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const region = searchParams?.region || "slovensko";

  // Handling loading errors gracefully
  let weatherData = null;
  try {
    weatherData = await getArticleCache(region, new Date());
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
  }

  const regions = [
    { id: "slovensko", name: "Slovensko" },
    { id: "zapad", name: "Západ" },
    { id: "sever", name: "Sever" },
    { id: "vychod", name: "Východ" },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 p-4 font-sans text-slate-100 selection:bg-teal-500/30">
      {/* Decorative Blur Orbs */}
      <div className="pointer-events-none absolute left-[-10%] top-[-10%] h-96 w-96 rounded-full bg-blue-500/30 opacity-60 mix-blend-screen blur-[100px]"></div>
      <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[30rem] w-[30rem] rounded-full bg-teal-400/20 opacity-60 mix-blend-screen blur-[120px]"></div>

      <div className="container relative z-10 mx-auto max-w-5xl pb-20 pt-10">
        {/* Header & Navigation */}
        <header className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row">
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
                  href={`/?region=${r.id}`}
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

        {/* Content Area */}
        {weatherData ? (
          <WeatherBento data={weatherData} />
        ) : (
          <div className="flex h-64 items-center justify-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
            <p className="text-slate-400">
              Predpoveď pre tento región momentálne nie je k dispozícii.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
