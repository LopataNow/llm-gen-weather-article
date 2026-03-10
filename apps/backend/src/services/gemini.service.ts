import { GoogleGenerativeAI, SchemaType, Schema } from '@google/generative-ai';
import { Injectable, Logger } from '@nestjs/common';

const schema: Schema = {
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
    sections: {
      type: SchemaType.OBJECT,
      description: 'The weather forecast split into logical sections',
      properties: {
        summary: {
          type: SchemaType.STRING,
          description: 'A very short 1-sentence summary of the day.',
          nullable: false,
        },
        morning: {
          type: SchemaType.STRING,
          description: 'Forecast and advice for the morning and early afternoon.',
          nullable: false,
        },
        afternoon: {
          type: SchemaType.STRING,
          description: 'Forecast and advice for the late afternoon and evening.',
          nullable: false,
        },
        tip: {
          type: SchemaType.STRING,
          description: 'A catchy advice or warning for the user.',
          nullable: false,
        },
      },
      required: ['summary', 'morning', 'afternoon', 'tip'],
    },
  },
  required: ['headline', 'subtitle', 'sections'],
};

export interface WeatherArticleSections {
  summary: string;
  morning: string;
  afternoon: string;
  tip: string;
}

export interface WeatherArticleResponse {
  headline: string;
  subtitle: string;
  sections: WeatherArticleSections;
}

const generateWeatherPrompt = (
  regionName: string,
  weatherData: Record<string, unknown>,
  targetLanguage: string = 'Slovak',
): string => {
  return `
  Act as a modern and empathetic meteorologist. Your task is to write a short, engaging, and minimalist morning weather report for the region "${regionName}" based on the following data from Open-Meteo.
  Data retrieved from API: ${JSON.stringify(weatherData)}

  Rules:
  1. Do not write boring lists or tabular facts. Do not repeat exact numbers unless they are extreme.
  2. Divide the text into the following sections according to the schema: "summary" (short 1-sentence summary), "morning" (morning and early afternoon outlook), "afternoon" (late afternoon, commuting home from work), and "tip" (a catchy advice or warning at the end).
  3. Focus on what is most important for a regular person (how to dress, precipitation from the hourly forecast, etc.).
  4. The output language MUST BE ${targetLanguage}. The tone of the text should be modern and empathetic.
  5. Return the response exclusively as a valid JSON according to the defined schema!
`.trim();
};

@Injectable()
export class GeminiService {
  private readonly logger = new Logger(GeminiService.name);

  async generateArticleForRegion(
    regionName: string,
    weatherData: Record<string, unknown>,
  ): Promise<WeatherArticleResponse> {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: schema,
      },
    });

    const finalPrompt = generateWeatherPrompt(regionName, weatherData);
    this.logger.debug(`Calling Gemini API for region: ${regionName}`);

    const result = await model.generateContent(finalPrompt);
    return JSON.parse(result.response.text()) as WeatherArticleResponse;
  }
}
