import {
  IOmhMapsLocationModule,
  OmhLocationError,
} from './OmhMapsLocationModule.types';
import NativeOmhMapsLocationModule from './NativeOmhMapsLocationModule';

export const OmhMapsLocationModule: IOmhMapsLocationModule = {
  getCurrentLocation: async () => {
    return NativeOmhMapsLocationModule.getCurrentLocation().catch(error => {
      throw new OmhLocationError(
        error.message,
        error.code ===
          NativeOmhMapsLocationModule.getConstants()
            .PERMISSIONS_DENIED_ERROR_CODE
      );
    });
  },
  getLastLocation: async () => {
    return NativeOmhMapsLocationModule.getLastLocation().catch(error => {
      throw new OmhLocationError(
        error.message,
        error.code ===
          NativeOmhMapsLocationModule.getConstants()
            .PERMISSIONS_DENIED_ERROR_CODE
      );
    });
  },
};
