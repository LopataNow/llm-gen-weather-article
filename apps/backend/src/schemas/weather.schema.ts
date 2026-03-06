import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WeatherDocument = Weather & Document;

@Schema()
export class Weather {
  @Prop({ type: String, default: () => new Date().toISOString() })
  _id: string;

  @Prop({ required: true })
  headline: string;

  @Prop({ required: true })
  subtitle: string;

  @Prop({ type: Object, required: true })
  sections: {
    summary: string;
    morning: string;
    afternoon: string;
    tip: string;
  };

  @Prop({ required: false })
  tempMax?: number;

  @Prop({ required: false })
  tempMin?: number;

  @Prop({ required: false })
  precipitation?: number;

  @Prop({ required: false })
  windSpeed?: number;

  @Prop({ required: false })
  windDir?: number;

  @Prop({ required: false })
  weatherCode?: number;
}

export const WeatherSchema = SchemaFactory.createForClass(Weather);
