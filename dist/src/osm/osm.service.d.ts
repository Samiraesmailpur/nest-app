import { ShortestWayDto } from "./dto/shortest-way.dto";
import { ObjectsInRadiusDto } from "./dto/objects-in-radius.dto";
export declare class OsmService {
    getObjectsInRadius(objectsInRadiusDto: ObjectsInRadiusDto): Promise<any>;
    getShortestWay(shortestWayDto: ShortestWayDto): Promise<{
        distance: number;
        coordinates: string[];
    }[]>;
    getPath(predecessor: any, start: string, end: string): {
        distance: number;
        coordinates: string[];
    }[];
    findNearestNode(nodes: any, targetLocation: any): any;
    calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number;
    toRadians(degrees: number): number;
}
