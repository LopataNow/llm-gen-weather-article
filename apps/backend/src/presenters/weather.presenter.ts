import { ApiProperty } from '@nestjs/swagger';

export class WeatherPresenter {
  @ApiProperty({
    example: 'Sunny Days Ahead in Bratislava',
    description: 'The generated catchy headline for the weather',
  })
  headline: string;

  @ApiProperty({ example: 'Expect highs of 25°C', description: 'A short descriptive subtitle' })
  subtitle: string;

  @ApiProperty({
    example: {
      summary: 'Dnes bude slnečno.',
      morning: 'Chladno, ale jasno.',
      afternoon: 'Pohodových 20°C.',
      tip: 'Nezabudnite slnečné okuliare.',
    },
    description: 'Weather article split into logical sections',
  })
  sections: {
    summary: string;
    morning: string;
    afternoon: string;
    tip: string;
  };
  @ApiProperty({ example: 25, description: 'Maximum temperature in Celsius', required: false })
  tempMax?: number;

  @ApiProperty({ example: 10, description: 'Minimum temperature in Celsius', required: false })
  tempMin?: number;

  @ApiProperty({ example: 0, description: 'Total daily precipitation in mm', required: false })
  precipitation?: number;

  @ApiProperty({ example: 15, description: 'Maximum wind speed in km/h', required: false })
  windSpeed?: number;

  @ApiProperty({ example: 180, description: 'Dominant wind direction in degrees', required: false })
  windDir?: number;

  @ApiProperty({ example: 0, description: 'WMO weather code', required: false })
  weatherCode?: number;
}
