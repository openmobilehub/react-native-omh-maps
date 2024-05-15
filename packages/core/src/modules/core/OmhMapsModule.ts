import { IOmhMapsModule } from './OmhMapsModule.types';
import NativeOmhMapsModule from './NativeOmhMapsCoreModule';
import { Providers } from '../../types/common';

export const OmhMapsModule: IOmhMapsModule = {
  initialize: (providers: Providers) => {
    NativeOmhMapsModule.initialize({
      gmsPath: providers.gmsProvider.path,
      nonGmsPath: providers.nonGmsProvider.path,
    });
  },
  getAvailableMapProviders: NativeOmhMapsModule.getAvailableMapProviders,
  getDefaultMapProvider: NativeOmhMapsModule.getDefaultMapProvider,
};
