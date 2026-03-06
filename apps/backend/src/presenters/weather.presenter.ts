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
}
