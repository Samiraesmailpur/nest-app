import { ObjectsInRadiusDto } from "./dto/objects-in-radius.dto";
import { ShortestWayDto } from "../osm/dto/shortest-way.dto";
import { OsmService } from "./osm.service";
export declare class OsmController {
    private osmService;
    constructor(osmService: OsmService);
    getObjectsInRadius(objectsInRadiusDto: ObjectsInRadiusDto): Promise<any>;
    getShortestWay(shortestWayDto: ShortestWayDto): Promise<{
        distance: number;
        coordinates: string[];
    }[]>;
}
