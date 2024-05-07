import { IOmhMapsModule } from './OmhMapsModule.types';
import NativeOmhMapsModule from './NativeOmhMapsCoreModule';

export const OmhMapsModule: IOmhMapsModule = {
  initialize: NativeOmhMapsModule.initialize,
  getAvailableMapProviders: NativeOmhMapsModule.getAvailableMapProviders,
  getDefaultMapProvider: NativeOmhMapsModule.getDefaultMapProvider,
  getCurrentLocation: NativeOmhMapsModule.getCurrentLocation,
};
