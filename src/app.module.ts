import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LocationsModule } from "./locations/locations.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { OsmModule } from "./osm/osm.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("DATA_BASE_URL"),
      }),
      inject: [ConfigService],
    }),
    LocationsModule,
    OsmModule,
  ],
})
export class AppModule {}
