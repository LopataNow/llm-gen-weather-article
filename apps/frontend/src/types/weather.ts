export interface WeatherArticleSections {
  summary: string;
  morning: string;
  afternoon: string;
  tip: string;
}

export interface WeatherResponse {
  _id: string; // "sk-slovensko-2026-03-06"
  headline: string;
  subtitle: string;
  sections: WeatherArticleSections;
  tempMax?: number;
  tempMin?: number;
  precipitation?: number;
  windSpeed?: number;
  windDir?: number;
  weatherCode?: number;
}

export interface OpenMeteoDailyData {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
}

export interface OpenMeteoForecastResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: Record<string, string>;
  daily: OpenMeteoDailyData;
}
