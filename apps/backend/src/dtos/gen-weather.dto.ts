import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class GenWeatherDto {
  @IsString()
  @IsOptional()
  @IsIn(['en', 'sk'])
  language?: string;

  @IsString()
  @IsOptional()
  @IsIn(['fantastic', 'tabloids'])
  style?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  latitude?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  longitude?: number;

  @IsString()
  @IsOptional()
  date?: string;
}
