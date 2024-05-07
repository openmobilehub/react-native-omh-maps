import { OmhMapProvider, Providers } from '../../types/common';
import { IOmhMapsModule } from './OmhMapsModule.types';

const MAP_PROVIDERS = [
  {
    name: 'Apple',
    path: 'apple', // path not used in iOS
  },
  {
    name: 'Google',
    path: 'google', // path not used in iOS
  },
];

class OmhMapModuleImpl implements IOmhMapsModule {
  private selectedMapProvider: OmhMapProvider = this.getDefaultMapProvider();

  getSelectedMapProvider() {
    return this.selectedMapProvider;
  }

  initialize(providers: Providers) {
    this.selectedMapProvider = providers.gmsProvider;
  }

  getAvailableMapProviders() {
    return MAP_PROVIDERS;
  }

  getDefaultMapProvider() {
    return MAP_PROVIDERS[0]!;
  }

  getCurrentLocation() {
    return Promise.resolve({ latitude: 0, longitude: 0 });
  }
}

export const OmhMapsModule = new OmhMapModuleImpl();
