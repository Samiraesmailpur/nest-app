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
exports.OsmController = void 0;
const common_1 = require("@nestjs/common");
const objects_in_radius_dto_1 = require("./dto/objects-in-radius.dto");
const shortest_way_dto_1 = require("../osm/dto/shortest-way.dto");
const osm_service_1 = require("./osm.service");
let OsmController = class OsmController {
    constructor(osmService) {
        this.osmService = osmService;
    }
    async getObjectsInRadius(objectsInRadiusDto) {
        const objectsInRadius = await this.osmService.getObjectsInRadius(objectsInRadiusDto);
        return objectsInRadius;
    }
    async getShortestWay(shortestWayDto) {
        const shortestPath = await this.osmService.getShortestWay(shortestWayDto);
        return shortestPath;
    }
};
exports.OsmController = OsmController;
__decorate([
    (0, common_1.Post)("objects-in-radius"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [objects_in_radius_dto_1.ObjectsInRadiusDto]),
    __metadata("design:returntype", Promise)
], OsmController.prototype, "getObjectsInRadius", null);
__decorate([
    (0, common_1.Post)("shortest-way"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shortest_way_dto_1.ShortestWayDto]),
    __metadata("design:returntype", Promise)
], OsmController.prototype, "getShortestWay", null);
exports.OsmController = OsmController = __decorate([
    (0, common_1.Controller)("osm"),
    __metadata("design:paramtypes", [osm_service_1.OsmService])
], OsmController);
//# sourceMappingURL=osm.controller.js.map