import axios from "axios";

import { WeatherResponse } from "@/types/weather";

export function getArticle(region: string, date: Date) {
  const serverUrl = process.env.SERVER_URL || "http://localhost:3001";
  return axios.get<WeatherResponse>(serverUrl, {
    params: {
      region,
      date: date.toISOString().split("T")[0],
    },
  });
}
