import { IsNotEmpty, IsLatitude, IsLongitude } from "class-validator";

export class CoordinatesDto {
  @IsNotEmpty()
  @IsLatitude()
  latitude: number;

  @IsNotEmpty()
  @IsLongitude()
  longitude: number;
}
