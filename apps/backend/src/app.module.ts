import { Module } from '@nestjs/common';
import { GenWeatherDtoController } from './controllers/gen-weather.controller';
import { GeminiService } from './services/gemini.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from 'nestjs-pino';
import { Weather, WeatherSchema } from './schemas/weather.schema';
import { WeatherService } from './services/weather.service';
import { HttpModule } from '@nestjs/axios';
import { AllExceptionsFilter } from './filters/http-exception.filter';

@Module({
  imports: [
    HttpModule,
    LoggerModule.forRoot({
      pinoHttp: {
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty', options: { colorize: true } }
            : undefined,
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Weather.name, schema: WeatherSchema }]),
    ThrottlerModule.forRoot([
      {
        ttl: 800,
        limit: 2,
      },
    ]),
  ],
  controllers: [GenWeatherDtoController],
  providers: [
    GeminiService,
    WeatherService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
