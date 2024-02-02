import { IsNotEmpty, IsObject } from "class-validator";
import { CoordinatesDto } from "../../locations/dto/coordinates.dto";

export class ShortestWayDto {
  @IsNotEmpty()
  @IsObject()
  from: CoordinatesDto;

  @IsNotEmpty()
  @IsObject()
  to: CoordinatesDto;
}
