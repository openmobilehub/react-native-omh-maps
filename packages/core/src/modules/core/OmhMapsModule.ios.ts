import { MapProvider, Providers } from '../../types/common';
import { IOmhMapsModule } from './OmhMapsModule.types';

const MAP_PROVIDERS = [
  {
    name: 'Apple',
    path: 'apple',
  },
  {
    name: 'Google',
    path: 'google',
  },
];

class OmhMapModuleClass implements IOmhMapsModule {
  private selectedMapProvider: MapProvider = this.getDefaultMapProvider();

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

export const OmhMapsModule = new OmhMapModuleClass();
