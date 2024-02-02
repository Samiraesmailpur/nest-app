"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationsController = void 0;
const common_1 = require("@nestjs/common");
const create_location_dto_1 = require("./dto/create-location.dto");
const locations_service_1 = require("./locations.service");
const mongoose_1 = require("mongoose");
const update_location_dto_1 = require("./dto/update-location.dto");
let LocationsController = class LocationsController {
    constructor(locationsService) {
        this.locationsService = locationsService;
    }
    validateObjectId(id) {
        const isValid = mongoose_1.default.Types.ObjectId.isValid(id);
        if (!isValid) {
            throw new common_1.HttpException("Invalid id", 400);
        }
    }
    handleNotFound(location) {
        if (!location) {
            throw new common_1.HttpException("Location not found", 404);
        }
    }
    createLocations(createLocationDto) {
        return this.locationsService.createLocations(createLocationDto);
    }
    getLocations() {
        this.locationsService.getLocations();
        return this.locationsService.getLocations();
    }
    async getLocationById(id) {
        this.validateObjectId(id);
        const location = await this.locationsService.getLocationById(id);
        this.handleNotFound(location);
        return location;
    }
    async updateLocation(id, updateLocationDto) {
        this.validateObjectId(id);
        const updatedLocation = await this.locationsService.updateLocation(id, updateLocationDto);
        this.handleNotFound(updatedLocation);
        return updatedLocation;
    }
    async deleteLocationById(id) {
        this.validateObjectId(id);
        const deletedLocation = await this.locationsService.deleteLocationById(id);
        this.handleNotFound(deletedLocation);
        return deletedLocation;
    }
};
exports.LocationsController = LocationsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_location_dto_1.CreateLocationDto]),
    __metadata("design:returntype", void 0)
], LocationsController.prototype, "createLocations", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LocationsController.prototype, "getLocations", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "getLocationById", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_location_dto_1.UpdateLocationDto]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "updateLocation", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "deleteLocationById", null);
exports.LocationsController = LocationsController = __decorate([
    (0, common_1.Controller)("locations"),
    __metadata("design:paramtypes", [locations_service_1.LocationsService])
], LocationsController);
//# sourceMappingURL=locations.controller.js.map