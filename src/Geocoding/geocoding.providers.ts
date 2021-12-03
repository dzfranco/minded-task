import { Provider } from "@nestjs/common";
import { Client } from "@googlemaps/google-maps-services-js";
import { PRIVATE_GEOCODING_IDENTIFIERS } from "@/Geocoding/geocoding.constants";
import { GEOCODING_IDENTIFIERS } from "@/Geocoding/public/constants";
import { GeocodingService } from "@/Geocoding/service/geocoding.service";

export const GeocodingProviders: Provider[] = [
  {
    provide: PRIVATE_GEOCODING_IDENTIFIERS.GoogleClient,
    useFactory: () => {
      return new Client();
    }
  },
  {
    provide: GEOCODING_IDENTIFIERS.GeocodingService,
    useClass: GeocodingService
  }

]
