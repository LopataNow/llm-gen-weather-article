import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GeminiService } from '../services/gemini.service';
import { GenWeatherDto } from '../dtos/gen-weather.dto';
import { WeatherPresenter } from '../presenters/weather.presenter';
import { WeatherService } from '../services/weather.service';
import { REGIONS } from '../common/regions';
import { Weather } from '../schemas/weather.schema';

export interface OpenMeteoDailyData {
  temperature_2m_max?: number[];
  temperature_2m_min?: number[];
  precipitation_sum?: number[];
  wind_speed_10m_max?: number[];
  wind_direction_10m_dominant?: number[];
  weather_code?: number[];
}

export interface OpenMeteoResponse {
  daily?: OpenMeteoDailyData;
  [key: string]: any;
}

@ApiTags('Weather Articles')
@Controller()
export class GenWeatherDtoController {
  constructor(
    private readonly weatherService: WeatherService,
    private readonly geminiService: GeminiService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Generates or retrieves a cached AI weather story for specific region and date.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful retrieval of cached article for today.',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async getWeatherArticle(@Query() params: GenWeatherDto): Promise<WeatherPresenter> {
    const { region = 'slovensko', date = new Date().toISOString().split('T')[0] } = params;

    const weatherKey = `sk-v2-${region}-${date}`;

    const cachedWeather = await this.weatherService.getWeather(weatherKey);

    if (cachedWeather) {
      return cachedWeather;
    }

    const regionName = REGIONS[region]?.name || 'Slovensko';

    const weatherData = await this.weatherService.fetchForecastForRegion(region);

    const generated = await this.geminiService.generateArticleForRegion(regionName, weatherData);

    if (
      !generated ||
      typeof generated?.headline !== 'string' ||
      typeof generated?.subtitle !== 'string' ||
      !generated?.sections ||
      typeof generated.sections.summary !== 'string' ||
      typeof generated.sections.morning !== 'string' ||
      typeof generated.sections.afternoon !== 'string' ||
      typeof generated.sections.tip !== 'string'
    ) {
      throw new Error('Failed to generate a valid weather JSON object from Gemini model.');
    }

    const rawData: Partial<Weather> = {
      tempMax: weatherData.daily?.temperature_2m_max?.[0] ?? null,
      tempMin: weatherData.daily?.temperature_2m_min?.[0] ?? null,
      precipitation: weatherData.daily?.precipitation_sum?.[0] ?? null,
      windSpeed: weatherData.daily?.wind_speed_10m_max?.[0] ?? null,
      windDir: weatherData.daily?.wind_direction_10m_dominant?.[0] ?? null,
      weatherCode: weatherData.daily?.weather_code?.[0] ?? null,
    };

    const response = await this.weatherService.createWeather({
      _id: weatherKey,
      ...generated,
      ...rawData,
    });

    return response;
  }
}
