import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Location } from "./schemas/locations.schema";
import { CreateLocationDto } from "./dto/create-location.dto";
import { UpdateLocationDto } from "./dto/update-location.dto";

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel(Location.name) private locationModel: Model<Location>
  ) {}

  createLocations(createLocationDto: CreateLocationDto) {
    return this.locationModel.create(createLocationDto);
  }

  getLocations() {
    return this.locationModel.find();
  }

  getLocationById(id: string) {
    return this.locationModel.findById(id);
  }

  updateLocation(id: string, updateLocationDto: UpdateLocationDto) {
    return this.locationModel.findByIdAndUpdate(id, updateLocationDto, {
      new: true,
    });
  }

  deleteLocationById(id: string) {
    return this.locationModel.findByIdAndDelete(id);
  }
}
