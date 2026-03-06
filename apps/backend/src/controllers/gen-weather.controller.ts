import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GeminiService } from '../services/gemini.service';
import { GenWeatherDto } from '../dtos/gen-weather.dto';
import { WeatherPresenter } from '../presenters/weather.presenter';
import { WeatherService } from '../services/weather.service';
import { REGIONS } from '../common/regions';

@ApiTags('Weather Articles')
@Controller()
export class GenWeatherDtoController {
  constructor(
    private readonly weatherService: WeatherService,
    private readonly geminiService: GeminiService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Returns a cached AI weather forecast for the selected region. Throws if not found.',
  })
  @ApiResponse({ status: 200, description: 'Succesful retrieval of cached article for today.' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async getWeatherArticle(@Query() params: GenWeatherDto): Promise<WeatherPresenter> {
    const { region = 'slovensko', date = new Date().toISOString().split('T')[0] } = params;

    const weatherKey = `sk-${region}-${date}`;

    // 1. Try to find forecast in database (cache)
    const cachedWeather = await this.weatherService.getWeather(weatherKey);

    if (cachedWeather) {
      return cachedWeather;
    }

    // 2. If not cached, fetch data from API and generate new report
    const regionName = REGIONS[region]?.name || 'Slovensko';

    // Fetch raw environment data from Open-Meteo
    const weatherData = await this.weatherService.fetchForecastForRegion(region);

    // Generate AI story sections
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

    const rawData = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tempMax: (weatherData as any).daily?.temperature_2m_max?.[0] || 0,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tempMin: (weatherData as any).daily?.temperature_2m_min?.[0] || 0,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      precipitation: (weatherData as any).daily?.precipitation_sum?.[0] || 0,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      windSpeed: (weatherData as any).daily?.wind_speed_10m_max?.[0] || 0,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      windDir: (weatherData as any).daily?.wind_direction_10m_dominant?.[0] || 0,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      weatherCode: (weatherData as any).daily?.weather_code?.[0] || 0,
    };

    // Save into DB mapping the composite key (region+date)
    const response = await this.weatherService.createWeather({
      _id: weatherKey,
      ...generated,
      ...rawData,
    });

    return response;
  }
}
