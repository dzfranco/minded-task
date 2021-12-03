import { Module } from '@nestjs/common';
import { GeocodingProviders } from "@/Geocoding/geocoding.providers";
import { GEOCODING_IDENTIFIERS } from "@/Geocoding/public/constants";

@Module({
  providers: [...GeocodingProviders],
  exports: [GEOCODING_IDENTIFIERS.GeocodingService]
})
export class GeocodingModule {
}
