import axios from "axios";

export interface WeatherArticle {
  headline: string;
  subtitle: string;
  body: string;
}

export function getArticle(style: string, date: Date) {
  const serverUrl = process.env.SERVER_URL || "http://localhost:3001";
  return axios.get<WeatherArticle>(serverUrl, {
    params: {
      style,
      date: date.toISOString().split("T")[0],
    },
  });
}
