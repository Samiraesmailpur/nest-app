import { Controller, Post, Body } from "@nestjs/common";
import { ObjectsInRadiusDto } from "./dto/objects-in-radius.dto";
import { ShortestWayDto } from "../osm/dto/shortest-way.dto";
import { OsmService } from "./osm.service";

@Controller("osm")
export class OsmController {
  constructor(private osmService: OsmService) {}

  @Post("objects-in-radius")
  async getObjectsInRadius(
    @Body()
    objectsInRadiusDto: ObjectsInRadiusDto
  ) {
    const objectsInRadius =
      await this.osmService.getObjectsInRadius(objectsInRadiusDto);
    return objectsInRadius;
  }

  @Post("shortest-way")
  async getShortestWay(@Body() shortestWayDto: ShortestWayDto) {
    const shortestPath = await this.osmService.getShortestWay(shortestWayDto);
    return shortestPath;
  }
}
