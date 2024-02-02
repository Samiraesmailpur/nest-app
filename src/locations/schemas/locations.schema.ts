import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LocationDocument = HydratedDocument<Location>;

@Schema()
export class Location {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    type: { latitude: Number, longitude: Number },
    validate: {
      validator: (value) => typeof value === 'object' && 'latitude' in value && 'longitude' in value,
      message: 'Invalid coordinates format. Should be an object with "latitude" and "longitude".',
    },
  })
  coordinates: { latitude: number; longitude: number };

  @Prop({ required: true })
  type: string;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
