import { Inject, Injectable } from "@nestjs/common";
import { IGeocodingService } from "@/Geocoding/public/interfaces";
import { PRIVATE_GEOCODING_IDENTIFIERS } from "@/Geocoding/geocoding.constants";
import { Client } from "@googlemaps/google-maps-services-js";
import {
  AddressComponent,
  GeocodeResult,
  PlaceType2
} from "@googlemaps/google-maps-services-js/dist/common";
import { ValidStates } from "@/Geocoding/public/interfaces/states";


@Injectable()
export class GeocodingService implements IGeocodingService {
  private readonly GOOGLE_API_KEY = process.env.GOOGLE_API_KEY!;

  constructor(@Inject(PRIVATE_GEOCODING_IDENTIFIERS.GoogleClient) private readonly googleMapsAPI: Client) {
  }

  async isZipInState(zipCode: string, state: ValidStates): Promise<boolean> {
    const response = await this.googleMapsAPI.geocode({
      params: {
        key: this.GOOGLE_API_KEY,
        address: zipCode,
      }
    })
    const addressComponents: AddressComponent[] = this.getAddressComponents(response.data.results);
    return this.validateState(addressComponents, state);
  }

  /**
   * @description Returns all of the address components given by the google API
   * @param data
   * @private
   */
  private getAddressComponents(data: GeocodeResult[]): AddressComponent[] {
    if (data.length === 0) {
      return []
    }
    return data.flatMap((geocodeResult: GeocodeResult) => geocodeResult.address_components);
  }

  /**
   * @description Validates if any of the address components is in the desired state. There might be multiple
   * components and at least one must belong to a state
   * @param {AddressComponent[]} addressComponents - The address components given by Google
   * @param stateShortName - The state to validate
   * @private
   */
  private validateState(addressComponents: AddressComponent[], stateShortName: ValidStates): boolean {
    const areInState = addressComponents.filter((component) => {
      // Check if the type is a state, given by PlaceType2.administrative_area_level_1 from the google API
      if (component.types.some((componentType => componentType === PlaceType2.administrative_area_level_1))) {
        return component.short_name === stateShortName;
      }
      return false;
    });
    return areInState.length > 0;
  }

}
