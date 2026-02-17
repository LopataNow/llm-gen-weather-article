import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

const schema = {
  description: 'Weather article schema',
  type: SchemaType.OBJECT,
  properties: {
    headline: {
      type: SchemaType.STRING,
      description: 'The main title of the article',
      nullable: false,
    },
    subtitle: {
      type: SchemaType.STRING,
      description: 'A catchy subtitle for the article',
      nullable: false,
    },
    body: {
      type: SchemaType.STRING,
      description: 'The main content of the article',
      nullable: false,
    },
  },
  required: ['headline', 'subtitle', 'body'],
};

export interface WeatherArticleResponse {
  headline: string;
  subtitle: string;
  body: string;
}

const prompt = (style: string, language: string, weatherData: string, city: string): string =>
  `Write an article about the weather in ${city} in the ${style} style. Language: ${language}. Use the following weather data: ${weatherData}.`;

@Injectable()
export class GerminiService {
  async getWeatherArticle(
    language: string,
    style: string,
    date: string,
    latitude: number,
    longitude: number,
  ): Promise<WeatherArticleResponse> {
    const city = await this.getCityByCoordinates(latitude, longitude);
    const weatherData = await this.getWeatherData(date, latitude, longitude);

    const genAI = new GoogleGenerativeAI(process.env.GERMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: schema,
      },
    });

    const result = await model.generateContent(
      prompt(style, language, JSON.stringify(weatherData), city),
    );
    return JSON.parse(result.response.text()) as WeatherArticleResponse;
  }

  private async getWeatherData(date: string, latitude: number, longitude: number): Promise<any> {
    const result = await axios.get(process.env.WEATHER_API_URL, {
      params: {
        latitude: latitude,
        longitude: longitude,
        start_date: date,
        end_date: date,
      },
    });
    return result.data;
  }

  private async getCityByCoordinates(latitude: number, longitude: number): Promise<string> {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
        params: {
          lat: latitude,
          lon: longitude,
          format: 'json',
          'accept-language': 'en',
        },
        headers: {
          'User-Agent': 'llm-gen-weather-article-portfolio',
        },
      });
      return (
        response.data.address.city ||
        response.data.address.town ||
        response.data.address.village ||
        'Unknown Location'
      );
    } catch (error) {
      console.error('Reverse geocoding failed:', error);
      return 'Bratislava'; // Fallback
    }
  }
}
