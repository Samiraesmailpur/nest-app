import axios from "axios";
import { ShortestWayDto } from "./dto/shortest-way.dto";
import { ObjectsInRadiusDto } from "./dto/objects-in-radius.dto";
import * as graphlib from "graphlib";

export class OsmService {
  async getObjectsInRadius(objectsInRadiusDto: ObjectsInRadiusDto) {
    const { object, radius } = objectsInRadiusDto;
    const { latitude, longitude } = objectsInRadiusDto.coordinates;
    const osmApiUrl = "https://overpass-api.de/api/interpreter";
    const overpassQuery =
      "data=" +
      encodeURIComponent(`[out:json];
        node["amenity"=${object}](around:${radius},${latitude},${longitude});
        out geom;
      `);

    const response = await axios.post(osmApiUrl, overpassQuery);
    return response.data.elements;
  }

  async getShortestWay(shortestWayDto: ShortestWayDto) {
    const osmApiUrl = "https://overpass-api.de/api/interpreter";
    const { latitude: latFrom, longitude: lonFrom } = shortestWayDto.from;
    const { latitude: latTo, longitude: lonTo } = shortestWayDto.to;

    const overpassQuery = `[out:json];
      way(${latFrom}, ${lonFrom}, ${latTo}, ${lonTo})["highway"];
      out geom;`;

    const response = await axios.post(osmApiUrl, overpassQuery);
    const allWays = response.data.elements;
    const G = new graphlib.Graph();

    for (let way = 0; way < allWays.length; way++) {
      const nodes = allWays[way].nodes;
      const nodesGeometry = allWays[way].geometry;

      for (let node = 0; node < nodes.length - 1; node++) {
        const lat1 = nodesGeometry[node].lat;
        const lon1 = nodesGeometry[node].lon;
        const lat2 = nodesGeometry[node + 1]?.lat;
        const lon2 = nodesGeometry[node + 1]?.lon;
        const distance = this.calculateDistance(lat1, lon1, lat2, lon2);
        G.setEdge(`${lat1}, ${lon1}`, `${lat2}, ${lon2}`, distance);
      }
    }

    const nearestNodeToStart = this.findNearestNode(
      G.nodes(),
      `${latFrom}, ${lonFrom}`
    )
      .split(", ")
      .map((item) => Number(item));
    const nearestNodeToEnd = this.findNearestNode(
      G.nodes(),
      `${latTo}, ${lonTo}`
    )
      .split(", ")
      .map((item) => Number(item));

    const distanceBetweenNearestStartNode = this.calculateDistance(
      latFrom,
      lonFrom,
      nearestNodeToStart[0],
      nearestNodeToStart[1]
    );
    const distanceBetweenNearestEndNode = this.calculateDistance(
      latTo,
      lonTo,
      nearestNodeToEnd[0],
      nearestNodeToEnd[1]
    );

    // setting start and end coordinates in graph
    G.setEdge(
      `${latFrom}, ${lonFrom}`,
      `${nearestNodeToStart[0]}, ${nearestNodeToStart[1]}`,
      distanceBetweenNearestStartNode
    );
    G.setEdge(
      `${nearestNodeToEnd[0]}, ${nearestNodeToEnd[1]}`,
      `${latTo}, ${lonTo}`,
      distanceBetweenNearestEndNode
    );

    const predecessor = graphlib.alg.dijkstra(
      G,
      `${latFrom}, ${lonFrom}`,
      (e) => G.edge(e)
    );

    const shortestPath = this.getPath(
      predecessor,
      `${latFrom}, ${lonFrom}`,
      `${latTo}, ${lonTo}`
    );

    return shortestPath;
  }

  getPath(
    predecessor: any,
    start: string,
    end: string
  ): { distance: number; coordinates: string[] }[] {
    const path: { distance: number; coordinates: string[] }[] = [];
    let current: string | undefined = end;

    while (current !== undefined && current !== start) {
      path.unshift({
        distance: predecessor[current!].distance,
        coordinates: current!.split(", "),
      });
      current = predecessor[current!].predecessor;
    }

    if (current === start) {
      path.unshift({ distance: 0, coordinates: start.split(", ") });
    }

    return path;
  }

  // Find the nearest node to a given location
  findNearestNode(nodes, targetLocation) {
    const [targetLon, targetLat] = targetLocation.split(", ");

    let nearestNode = null;
    let minDistance = Infinity;

    for (const node of nodes) {
      const [lon, lat] = node.split(", ");
      const distance = this.calculateDistance(
        parseFloat(lat),
        parseFloat(lon),
        parseFloat(targetLat),
        parseFloat(targetLon)
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearestNode = node;
      }
    }

    return nearestNode;
  }

  calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // Radius of the Earth in km
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) *
        Math.cos(this.toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;

    return distance;
  }

  toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}
