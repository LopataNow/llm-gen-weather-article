import axios from "axios";

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

export function getArticle(region: string, date: Date) {
  const serverUrl = process.env.SERVER_URL || "http://localhost:3001";
  return axios.get<WeatherResponse>(serverUrl, {
    params: {
      region,
      date: date.toISOString().split("T")[0],
    },
  });
}
