import { Test, TestingModule } from "@nestjs/testing";
import { LocationsController } from "./locations.controller";
import { LocationsService } from "./locations.service";
import { getModelToken } from "@nestjs/mongoose";
import { Location } from "./schemas/locations.schema";
import { ConfigModule } from "@nestjs/config";
import { UpdateLocationDto } from "./dto/update-location.dto";
import { CreateLocationDto } from "./dto/create-location.dto";

describe("LocationsController", () => {
  let locationsController: LocationsController;
  let locationsService: LocationsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [LocationsController],
      providers: [
        LocationsService,
        {
          provide: getModelToken(Location.name),
          useValue: {},
        },
      ],
      imports: [ConfigModule.forRoot()],
    }).compile();

    locationsService = moduleRef.get<LocationsService>(LocationsService);
    locationsController =
      moduleRef.get<LocationsController>(LocationsController);
  });

  it("should be defined", () => {
    expect(locationsController).toBeDefined();
  });

  describe("getAllLocations", () => {
    it("should return an array of locations", async () => {
      const locations = [
        {
          _id: "65b53cb174446e869d646ec7",
          name: "Location 1",
          coordinates: {
            latitude: 40.7128,
            longitude: -74.006,
            _id: "65b53cb174446e869d646ec8",
          },
          type: "Park",
          __v: 0,
        },
      ];
      jest
        .spyOn(locationsService, "getLocations")
        .mockResolvedValue(locations as any);

      expect(await locationsController.getLocations()).toEqual(locations);
    });
  });

  describe("getLocationById", () => {
    it("should return location by id", async () => {
      const location = {
        _id: "65b53cb174446e869d646ec7",
        name: "Location 1",
        coordinates: {
          latitude: 40.7128,
          longitude: -74.006,
          _id: "65b53cb174446e869d646ec8",
        },
        type: "Park",
        __v: 0,
      };
      jest
        .spyOn(locationsService, "getLocationById")
        .mockResolvedValue(location as any);

      expect(
        await locationsController.getLocationById("65b53cb174446e869d646ec7")
      ).toEqual(location);
    });
  });

  describe("updateLocation", () => {
    it("should update a location by id", async () => {
      const locationIdToUpdate = "65b53cb174446e869d646ec7";
      const updateLocationDto: UpdateLocationDto = {
        name: "Updated Location",
        coordinates: {
          latitude: 40.7128,
          longitude: -74.006,
        },
        type: "Updated Park",
      };

      jest
        .spyOn(locationsService, "updateLocation")
        .mockResolvedValue(updateLocationDto as any);

      const result = await locationsController.updateLocation(
        locationIdToUpdate,
        updateLocationDto
      );
      expect(result).toEqual(updateLocationDto);
    });
  });

  describe("createLocation", () => {
    it("should create a new location", async () => {
      const createLocationDto: CreateLocationDto = {
        name: "New Location",
        coordinates: {
          latitude: 40.7128,
          longitude: -74.006,
        },
        type: "Park",
      };

      jest
        .spyOn(locationsService, "createLocations")
        .mockResolvedValue(createLocationDto as any);

      const result =
        await locationsController.createLocations(createLocationDto);
      expect(result).toEqual(createLocationDto);
    });
  });

  describe("deleteLocationById", () => {
    it("should delete a location by id", async () => {
      const locationIdToDelete = "65b53cb174446e869d646ec7";
      const deletedLocation = {
        _id: "65b53cb174446e869d646ec7",
        name: "name",
        coordinates: {
          latitude: 40.7128,
          longitude: -74.006,
        },
        type: "Type",
        __v: 0,
      };

      jest
        .spyOn(locationsService, "deleteLocationById")
        .mockResolvedValue(deletedLocation as any);

      const result =
        await locationsController.deleteLocationById(locationIdToDelete);
      expect(result).toEqual(deletedLocation);
    });
  });
});
