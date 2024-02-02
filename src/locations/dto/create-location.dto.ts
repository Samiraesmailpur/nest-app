import {
  IsString,
  IsNotEmpty,
  IsObject,
  ValidateNested,
} from "class-validator";
import { CoordinatesDto } from "./coordinates.dto";

export class CreateLocationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  coordinates: CoordinatesDto;

  @IsNotEmpty()
  @IsString()
  type: string;
}
