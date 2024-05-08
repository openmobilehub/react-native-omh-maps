import { IOmhMapsLocationModule } from './OmhMapsLocationModule.types';
import NativeOmhMapsLocationModule from './NativeOmhMapsLocationModule';

export const OmhMapsLocationModule: IOmhMapsLocationModule = {
  getCurrentLocation: NativeOmhMapsLocationModule.getCurrentLocation,
  getLastLocation: NativeOmhMapsLocationModule.getLastLocation,
};
