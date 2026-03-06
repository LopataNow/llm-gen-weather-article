import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Weather } from 'src/schemas/weather.schema';
import { REGIONS } from '../common/regions';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);

  constructor(
    @InjectModel(Weather.name) private weatherModel: Model<Weather>,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getWeather(id: string): Promise<Weather | null> {
    return this.weatherModel.findById(id).exec();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async fetchForecastForRegion(regionId: string): Promise<Record<string, any>> {
    const region = REGIONS[regionId];
    if (!region) {
      throw new Error(`Unknown region: ${regionId}`);
    }

    const baseUrl = this.configService.get<string>('WEATHER_API_URL');
    if (!baseUrl) {
      throw new Error('WEATHER_API_URL is missing in environment variables');
    }

    const url = `${baseUrl}&latitude=${region.lat}&longitude=${region.lon}`;
    this.logger.log(`Fetching weather forecast for ${region.name} from ${url}`);

    try {
      const { data } = await firstValueFrom(this.httpService.get(url));
      return data;
    } catch (error) {
      this.logger.error(`Failed to fetch weather data for ${region.name}`, error);
      throw error;
    }
  }

  async createWeather(weather: Weather): Promise<Weather> {
    const createdWeather = new this.weatherModel(weather);
    return createdWeather.save();
  }
}
