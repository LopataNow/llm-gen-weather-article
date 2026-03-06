import {
  Cloud,
  CloudLightning,
  CloudRain,
  Droplets,
  Snowflake,
  Sun,
} from "lucide-react";

interface WeeklyForecastProps {
  region: string;
}

const REGION_COORDS: Record<string, { lat: number; lon: number }> = {
  slovensko: { lat: 48.73, lon: 19.15 },
  zapad: { lat: 48.14, lon: 17.1 },
  sever: { lat: 49.22, lon: 18.74 },
  vychod: { lat: 48.71, lon: 21.25 },
};

function getWeatherIcon(code: number) {
  if (code <= 3) return <Sun className="h-5 w-5 text-yellow-500" />;
  if (code >= 45 && code <= 48)
    return <Cloud className="h-5 w-5 text-gray-400" />;
  if (code >= 51 && code <= 67)
    return <CloudRain className="h-5 w-5 text-blue-400" />;
  if (code >= 71 && code <= 77)
    return <Snowflake className="h-5 w-5 text-sky-200" />;
  if (code >= 80 && code <= 82)
    return <Droplets className="h-5 w-5 text-blue-500" />;
  if (code >= 95) return <CloudLightning className="h-5 w-5 text-purple-400" />;
  return <Cloud className="h-5 w-5 text-gray-400" />;
}

// Function to format date into SK locale explicitly
function formatDateSK(dateString: string) {
  const date = new Date(dateString);
  const days = [
    "Nedeľa",
    "Pondelok",
    "Utorok",
    "Streda",
    "Štvrtok",
    "Piatok",
    "Sobota",
  ];
  return {
    dayName: days[date.getDay()],
    formattedStr: `${date.getDate()}.${date.getMonth() + 1}.`,
  };
}

export async function WeeklyForecast({ region }: WeeklyForecastProps) {
  const coords = REGION_COORDS[region] || REGION_COORDS.slovensko;

  let forecastData = null;
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Europe%2FBerlin`,
      { next: { revalidate: 3600 } }, // Cache for 1 hour
    );
    if (res.ok) {
      forecastData = await res.json();
    }
  } catch (err) {
    console.error("Failed to fetch weekly forecast", err);
  }

  if (!forecastData || !forecastData.daily) {
    return null;
  }

  const {
    time,
    weather_code,
    temperature_2m_max,
    temperature_2m_min,
    precipitation_sum,
  } = forecastData.daily;

  // We skip the first day (today) and show the next 6 days
  const days = time.slice(1, 7).map((t: string, index: number) => ({
    date: t,
    code: weather_code[index + 1],
    maxTemp: Math.round(temperature_2m_max[index + 1]),
    minTemp: Math.round(temperature_2m_min[index + 1]),
    precip: precipitation_sum[index + 1],
  }));

  return (
    <div className="mt-12 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl md:p-8">
      <h3 className="mb-6 text-2xl font-bold tracking-tight text-white">
        Predpoveď na ďalšie dni
      </h3>

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
            {days.map(
              (day: {
                date: string;
                code: number;
                maxTemp: number;
                minTemp: number;
                precip: number;
              }) => {
                const { dayName, formattedStr } = formatDateSK(day.date);
                return (
                  <tr
                    key={day.date}
                    className="group transition-colors hover:bg-white/5"
                  >
                    <td className="py-4 font-medium text-white">
                      <div className="flex flex-col">
                        <span>{dayName}</span>
                        <span className="text-xs text-white/50">
                          {formattedStr}
                        </span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-white/10 p-2 opacity-80 transition-opacity group-hover:opacity-100">
                          {getWeatherIcon(day.code)}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-right align-middle text-lg font-bold text-white">
                      {day.maxTemp}°
                    </td>
                    <td className="py-4 text-right align-middle text-lg font-medium text-white/60">
                      {day.minTemp}°
                    </td>
                    <td className="py-4 text-right align-middle text-sm font-medium text-blue-200/80">
                      {day.precip > 0 ? `${day.precip} mm` : "-"}
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
