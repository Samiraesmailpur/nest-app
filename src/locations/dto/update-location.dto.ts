import { IsString, IsLatitude, IsLongitude, IsObject, ValidateNested, IsOptional } from 'class-validator';

class CoordinatesDto {
    @IsOptional()
    @IsLatitude()
    latitude?: number;

    @IsOptional()
    @IsLongitude()
    longitude?: number;
}

export class UpdateLocationDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    coordinates?: CoordinatesDto;

    @IsOptional()
    @IsString()
    type?: string;
}
