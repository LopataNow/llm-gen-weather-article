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
    example: 'Today in Bratislava, the weather is expected to be...',
    description: 'Full generated article text',
  })
  body: string;
}
