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

const generateSlovakWeatherPrompt = (
  regionName: string,
  weatherData: Record<string, unknown>,
): string => {
  return `Správaj sa ako moderný a empatický meteorológ pre Slovensko. Tvojou úlohou je napísať krátky, pútavý a minimalistický ranný report o počasí pre región "${regionName}" na základe nasledujúcich dát z Open-Meteo.
Dáta získané z API: ${JSON.stringify(weatherData)}

Pravidlá:
1. Nepíš nudné zoznamy a tabuľkové fakty. Neopakuj presné čísla ak to nie je extrém.
2. Rozdeľ text do nasledujúcich sekcií podľa schémy: "summary" (krátke zhrnutie 1 veta), "morning" (ranný a doobedný výhľad), "afternoon" (obed zadnejšie popoludnie, na ceste domov z práce) a "tip" (trefná rada alebo varovanie na záver).
3. Zameraj sa na to najdôležitejšie pre bežného človeka (ako sa obliecť, zrážky z hourly predpovede atď.).
4. Jazyk je slovenský, štýl textu je moderný a empatický.
5. Vráť odpoveď výlučne ako platný JSON podľa definovanej schémy!`;
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

    const finalPrompt = generateSlovakWeatherPrompt(regionName, weatherData);
    this.logger.debug(`Calling Gemini API for region: ${regionName}`);

    const result = await model.generateContent(finalPrompt);
    return JSON.parse(result.response.text()) as WeatherArticleResponse;
  }
}
