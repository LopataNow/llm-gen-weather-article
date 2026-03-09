import axios from "axios";

import { OpenMeteoForecastResponse, WeatherResponse } from "@/types/weather";

export function getArticle(region: string, dateStr: string) {
  const serverUrl = process.env.SERVER_URL || "http://localhost:3001";
  return axios.get<WeatherResponse>(serverUrl, {
    params: {
      region,
      date: dateStr,
    },
  });
}

export function getWeeklyForecast(lat: number, lon: number) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Europe%2FBerlin`;
  return axios.get<OpenMeteoForecastResponse>(url);
}
