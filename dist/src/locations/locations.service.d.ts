/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from "mongoose";
import { Location } from "./schemas/locations.schema";
import { CreateLocationDto } from "./dto/create-location.dto";
import { UpdateLocationDto } from "./dto/update-location.dto";
export declare class LocationsService {
    private locationModel;
    constructor(locationModel: Model<Location>);
    createLocations(createLocationDto: CreateLocationDto): Promise<import("mongoose").Document<unknown, {}, Location> & Location & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getLocations(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Location> & Location & {
        _id: import("mongoose").Types.ObjectId;
    })[], import("mongoose").Document<unknown, {}, Location> & Location & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, Location, "find">;
    getLocationById(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, Location> & Location & {
        _id: import("mongoose").Types.ObjectId;
    }, import("mongoose").Document<unknown, {}, Location> & Location & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, Location, "findOne">;
    updateLocation(id: string, updateLocationDto: UpdateLocationDto): import("mongoose").Query<import("mongoose").Document<unknown, {}, Location> & Location & {
        _id: import("mongoose").Types.ObjectId;
    }, import("mongoose").Document<unknown, {}, Location> & Location & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, Location, "findOneAndUpdate">;
    deleteLocationById(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, Location> & Location & {
        _id: import("mongoose").Types.ObjectId;
    }, import("mongoose").Document<unknown, {}, Location> & Location & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, Location, "findOneAndDelete">;
}
