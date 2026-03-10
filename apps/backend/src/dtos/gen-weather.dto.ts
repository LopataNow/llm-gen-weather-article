import { IsIn, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GenWeatherDto {
  @ApiPropertyOptional({
    description: 'Region ID for weather forecast',
    enum: ['slovensko', 'zapad', 'sever', 'vychod'],
    default: 'slovensko',
  })
  @IsString()
  @IsOptional()
  @IsIn(['slovensko', 'zapad', 'sever', 'vychod'])
  region?: string;

  @ApiPropertyOptional({
    description: 'Date for the weather forecast (YYYY-MM-DD)',
    example: new Date().toISOString().split('T')[0],
  })
  @IsString()
  @IsOptional()
  date?: string;
}
