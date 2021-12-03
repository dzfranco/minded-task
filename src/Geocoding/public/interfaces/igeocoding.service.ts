import { ValidStates } from "@/Geocoding/public/interfaces/states";

export interface IGeocodingService {
  /**
   * @description Validates that the given zip code is in the desired state
   * @param zipCode
   * @param state
   */
  isZipInState(zipCode: string, state: ValidStates): Promise<boolean>
}
