import axios from "axios";

import { OpenMeteoForecastResponse, WeatherResponse } from "@/types/weather";

export function getArticle(region: string, dateStr: string) {
  const serverUrl = process.env.SERVER_URL || "http://localhost:3001";
  const url = new URL(serverUrl);

  return axios.get<WeatherResponse>(url.toString(), {
    params: {
      region,
      date: dateStr,
    },
  });
}

export function getWeeklyForecast(lat: number, lon: number) {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", lat.toString());
  url.searchParams.set("longitude", lon.toString());
  url.searchParams.set(
    "daily",
    "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum",
  );
  url.searchParams.set("timezone", "Europe/Berlin");

  return axios.get<OpenMeteoForecastResponse>(url.toString());
}
