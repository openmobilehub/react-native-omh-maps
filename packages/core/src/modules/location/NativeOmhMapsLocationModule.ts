import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

type NativeCoordinate = {
  latitude: number;
  longitude: number;
};

export interface Spec extends TurboModule {
  getCurrentLocation(): Promise<NativeCoordinate>;
  getLastLocation(): Promise<NativeCoordinate>;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'RNOmhMapsLocationModule'
);
