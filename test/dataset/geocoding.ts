import { PlaceType2, GeocodeResult, LocationType } from "@googlemaps/google-maps-services-js";

export const GEOCODING_RESPONSE: GeocodeResult[] = [
  {
    partial_match: true,
    plus_code: {
      global_code: '1324',
      compound_code: '1234356',
    },
    "address_components": [
      {
        "long_name": "11001",
        "short_name": "11001",
        "types": [PlaceType2.postal_code]
      },
      {
        "long_name": "Bellerose",
        "short_name": "Bellerose",
        "types": [PlaceType2.locality, PlaceType2.political]
      },
      {
        "long_name": "New York",
        "short_name": "NY",
        "types": [PlaceType2.administrative_area_level_1, PlaceType2.political]
      },
      {
        "long_name": "United States",
        "short_name": "US",
        "types": [PlaceType2.country, PlaceType2.political]
      }
    ],
    "formatted_address": "Bellerose, NY 11001, USA",
    "geometry": {
      "bounds": {
        "northeast": {
          "lat": 40.7391719,
          "lng": -73.684753
        },
        "southwest": {
          "lat": 40.7102669,
          "lng": -73.7303259
        }
      },
      "location": {
        "lat": 40.720444,
        "lng": -73.706594
      },
      "location_type": LocationType.APPROXIMATE,
      "viewport": {
        "northeast": {
          "lat": 40.7391719,
          "lng": -73.684753
        },
        "southwest": {
          "lat": 40.7102669,
          "lng": -73.7303259
        }
      }
    },
    "place_id": "ChIJfabKpVBiwokR1xS53ZN6iWE",
    "postcode_localities": ["Bellerose", "Floral Park", "South Floral Park"],
    "types": [PlaceType2.postal_code]
  }
];
