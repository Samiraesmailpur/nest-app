import {
  IsString,
  IsNotEmpty,
  IsObject,
  ValidateNested,
  IsNumber,
} from "class-validator";
import { CoordinatesDto } from "../../locations/dto/coordinates.dto";

export class ObjectsInRadiusDto {
  @IsNotEmpty()
  @IsString()
  object: string;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  coordinates: CoordinatesDto;

  @IsNumber()
  @IsNotEmpty()
  radius: number;
}
