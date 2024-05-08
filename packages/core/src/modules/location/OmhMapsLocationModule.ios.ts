import Geolocation, {
  GeolocationOptions,
} from '@react-native-community/geolocation';
import { IOmhMapsLocationModule } from './OmhMapsLocationModule.types';
import { OmhCoordinate } from '../../types/common';

const getLocation = async (
  options?: GeolocationOptions
): Promise<OmhCoordinate> => {
  return new Promise(resolve => {
    Geolocation.getCurrentPosition(
      position =>
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      error => {
        throw error;
      },
      {
        enableHighAccuracy: true,
        ...options,
      }
    );
  });
};

export const OmhMapsLocationModule: IOmhMapsLocationModule = {
  getCurrentLocation: async () => getLocation({ maximumAge: 0 }),
  getLastLocation: () => getLocation({ maximumAge: Infinity }),
};
