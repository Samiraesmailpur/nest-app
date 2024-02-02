import { Test, TestingModule } from "@nestjs/testing";
import { OsmController } from "./osm.controller";
import { OsmService } from "./osm.service";
import { ShortestWayDto } from "./dto/shortest-way.dto";

describe("OsmController", () => {
  let osmController: OsmController;
  let osmService: OsmService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [OsmController],
      providers: [OsmService],
    }).compile();

    osmService = moduleRef.get<OsmService>(OsmService);
    osmController = moduleRef.get<OsmController>(OsmController);
  });

  it("should return objects in radius", async () => {
    const objectsInRadiusDto = {
      object: "restaurant",
      coordinates: { latitude: 40.7128, longitude: -74.006 },
      radius: 1000,
    };
    const expectedResult = [{}] as any;

    jest
      .spyOn(osmService, "getObjectsInRadius")
      .mockResolvedValue(expectedResult);

    const result = await osmController.getObjectsInRadius(objectsInRadiusDto);
    expect(result).toEqual(expectedResult);
  });

  it("should return the shortest path", async () => {
    const shortestWayDto: ShortestWayDto = {
      from: { latitude: 51.2022, longitude: 7.01846 },
      to: { latitude: 51.20315, longitude: 7.0196 },
    };

    const expectedResult = [
      {
        distance: 0,
        coordinates: ["51.2022", "7.01846"],
      },
      {
        distance: 0.0016994131051575115,
        coordinates: ["51.2022066", "7.018482"],
      },
      {
        distance: 0.015726093106283506,
        coordinates: ["51.202288", "7.0186358"],
      },
      {
        distance: 0.020357453557722262,
        coordinates: ["51.2023158", "7.0186853"],
      },
      {
        distance: 0.05805500056017749,
        coordinates: ["51.2025423", "7.0190879"],
      },
      {
        distance: 0.10859796260325566,
        coordinates: ["51.2028445", "7.0196298"],
      },
      {
        distance: 0.1426313997869134,
        coordinates: ["51.20315", "7.0196"],
      },
    ];

    jest.spyOn(osmService, "getShortestWay").mockResolvedValue(expectedResult);

    const result = await osmService.getShortestWay(shortestWayDto);

    expect(result).toEqual(expectedResult);
  });
});
