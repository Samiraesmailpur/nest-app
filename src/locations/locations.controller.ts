import {
  Controller,
  Get,
  Delete,
  Post,
  Body,
  Param,
  HttpException,
  Patch,
} from "@nestjs/common";
import { CreateLocationDto } from "./dto/create-location.dto";
import { LocationsService } from "./locations.service";
import mongoose from "mongoose";
import { UpdateLocationDto } from "./dto/update-location.dto";

@Controller("locations")
export class LocationsController {
  constructor(private locationsService: LocationsService) {}

  private validateObjectId(id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException("Invalid id", 400);
    }
  }

  private handleNotFound(location: any) {
    if (!location) {
      throw new HttpException("Location not found", 404);
    }
  }

  @Post()
  createLocations(@Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.createLocations(createLocationDto);
  }

  @Get()
  getLocations() {
    this.locationsService.getLocations();
    return this.locationsService.getLocations();
  }

  @Get(":id")
  async getLocationById(@Param("id") id: string) {
    this.validateObjectId(id);
    const location = await this.locationsService.getLocationById(id);
    this.handleNotFound(location);
    return location;
  }

  @Patch(":id")
  async updateLocation(
    @Param("id") id: string,
    @Body() updateLocationDto: UpdateLocationDto
  ) {
    this.validateObjectId(id);
    const updatedLocation = await this.locationsService.updateLocation(
      id,
      updateLocationDto
    );
    this.handleNotFound(updatedLocation);
    return updatedLocation;
  }

  @Delete(":id")
  async deleteLocationById(@Param("id") id: string) {
    this.validateObjectId(id);
    const deletedLocation = await this.locationsService.deleteLocationById(id);
    this.handleNotFound(deletedLocation);
    return deletedLocation;
  }
}
