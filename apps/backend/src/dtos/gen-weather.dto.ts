import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GenWeatherDto {
  @ApiPropertyOptional({
    description: 'Language of the generated article',
    enum: ['en', 'sk'],
    default: 'en',
  })
  @IsString()
  @IsOptional()
  @IsIn(['en', 'sk'])
  language?: string;

  @ApiPropertyOptional({
    description: 'Style of the article',
    enum: ['fantastic', 'tabloids'],
    default: 'fantastic',
  })
  @IsString()
  @IsOptional()
  @IsIn(['fantastic', 'tabloids'])
  style?: string;

  @ApiPropertyOptional({
    description: 'Latitude of the location',
    example: 48.148,
    default: 48.148,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  latitude?: number;

  @ApiPropertyOptional({
    description: 'Longitude of the location',
    example: 17.1077,
    default: 17.1077,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  longitude?: number;

  @ApiPropertyOptional({
    description: 'Date for the weather forecast (YYYY-MM-DD)',
    example: '2026-02-22',
  })
  @IsString()
  @IsOptional()
  date?: string;
}
