import { GeocodingService } from "@/Geocoding/service/geocoding.service";
import { Client } from "@googlemaps/google-maps-services-js";
import { GEOCODING_RESPONSE } from "../../dataset/geocoding";
import { ValidStates } from "@/Geocoding/public/interfaces/states";


describe('Geocoding Service', () => {
  let sut: GeocodingService;
  const googleClient: Client = new (Client as jest.Mock<Client>)();

  beforeAll(() => {
    sut = new GeocodingService(googleClient);
  })

  beforeEach(() => {
    jest.clearAllMocks();
  })

  describe('Validate Zip Code in State', () => {
    it('should return true if the zip code is in the desired state', async () => {
      // @ts-ignore
      jest.spyOn(googleClient, 'geocode').mockResolvedValue({data: {results: GEOCODING_RESPONSE}});
      const result = await sut.isZipInState('11001', ValidStates.NEW_YORK);
      expect(result).toBe(true);
    })

    it('should return false if the zip code is not in the desired state', async () => {
      // @ts-ignore
      jest.spyOn(googleClient, 'geocode').mockResolvedValue({data: {results: GEOCODING_RESPONSE}});
      // @ts-ignore
      const result = await sut.isZipInState('11001', 'TX');
      expect(result).toBe(false);
    })
  })

})
