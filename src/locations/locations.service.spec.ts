import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { LocationsService } from "./locations.service";
import { Location } from "./schemas/locations.schema";
import { CreateLocationDto } from "./dto/create-location.dto";
import { UpdateLocationDto } from "./dto/update-location.dto";

describe("LocationsService", () => {
  let locationsService: LocationsService;

  const mockLocationModel = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        LocationsService,
        {
          provide: getModelToken(Location.name),
          useValue: mockLocationModel,
        },
      ],
    }).compile();

    locationsService = moduleRef.get<LocationsService>(LocationsService);
  });

  it("should be defined", () => {
    expect(locationsService).toBeDefined();
  });

  describe("createLocations", () => {
    it("should create a new location", async () => {
      const createLocationDto: CreateLocationDto = {
        name: "Test Location",
        coordinates: {
          latitude: 40.7128,
          longitude: -74.006,
        },
        type: "Test Type",
      };

      const expectedResult = {
        _id: "65b53cb174446e869d646ec7",
        ...createLocationDto,
        __v: 0,
      };

      mockLocationModel.create.mockResolvedValueOnce(expectedResult);

      const result = await locationsService.createLocations(createLocationDto);

      expect(result).toEqual(expectedResult);
      expect(mockLocationModel.create).toHaveBeenCalledWith(createLocationDto);
    });
  });

  describe("getLocations", () => {
    it("should get all locations", async () => {
      const expectedResult = [
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

      mockLocationModel.find.mockResolvedValueOnce(expectedResult);

      const result = await locationsService.getLocations();

      expect(result).toEqual(expectedResult);
      expect(mockLocationModel.find).toHaveBeenCalled();
    });
  });

  describe("getLocationById", () => {
    it("should get a location by id", async () => {
      const locationId = "65b53cb174446e869d646ec7";
      const expectedResult = {
        _id: locationId,
        name: "Location 1",
        coordinates: {
          latitude: 40.7128,
          longitude: -74.006,
          _id: "65b53cb174446e869d646ec8",
        },
        type: "Park",
        __v: 0,
      };

      mockLocationModel.findById.mockResolvedValueOnce(expectedResult);

      const result = await locationsService.getLocationById(locationId);

      expect(result).toEqual(expectedResult);
      expect(mockLocationModel.findById).toHaveBeenCalledWith(locationId);
    });
  });

  describe("updateLocation", () => {
    it("should update a location by id", async () => {
      const locationId = "65b53cb174446e869d646ec7";
      const updateLocationDto: UpdateLocationDto = {
        name: "Updated Location",
        coordinates: {
          latitude: 40.7128,
          longitude: -74.006,
        },
        type: "Updated Type",
      };

      const expectedResult = {
        _id: locationId,
        ...updateLocationDto,
        __v: 0,
      };

      mockLocationModel.findByIdAndUpdate.mockResolvedValueOnce(expectedResult);

      const result = await locationsService.updateLocation(
        locationId,
        updateLocationDto
      );

      expect(result).toEqual(expectedResult);
      expect(mockLocationModel.findByIdAndUpdate).toHaveBeenCalledWith(
        locationId,
        updateLocationDto,
        { new: true }
      );
    });
  });

  describe("deleteLocationById", () => {
    it("should delete a location by id", async () => {
      const locationId = "65b53cb174446e869d646ec7";

      const expectedResult = {
        _id: locationId,
        name: "Location 1",
        coordinates: {
          latitude: 40.7128,
          longitude: -74.006,
          _id: "65b53cb174446e869d646ec8",
        },
        type: "Park",
        __v: 0,
      };

      mockLocationModel.findByIdAndDelete.mockResolvedValueOnce(expectedResult);

      const result = await locationsService.deleteLocationById(locationId);

      expect(result).toEqual(expectedResult);
      expect(mockLocationModel.findByIdAndDelete).toHaveBeenCalledWith(
        locationId
      );
    });
  });
});
