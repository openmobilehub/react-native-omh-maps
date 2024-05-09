import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

type NativeCoordinate = {
  latitude: number;
  longitude: number;
};

export interface Spec extends TurboModule {
  getCurrentLocation(): Promise<NativeCoordinate>;
  getLastLocation(): Promise<NativeCoordinate>;
  getConstants(): {
    PERMISSIONS_DENIED_ERROR_CODE: string;
    OMH_LOCATION_MODULE_ERROR_CODE: string;
  };
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'RNOmhMapsLocationModule'
);
