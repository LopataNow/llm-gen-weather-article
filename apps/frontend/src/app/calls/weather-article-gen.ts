import axios from "axios";

export interface WeatherArticle {
  headline: string;
  subtitle: string;
  body: string;
}

export function getArticle(style: string, date: Date) {
  return axios.get<WeatherArticle>(process.env.SERVER_URL as string, {
    params: {
      style,
      date: date.toISOString().split('T')[0],
    },
  });
}
