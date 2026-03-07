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
