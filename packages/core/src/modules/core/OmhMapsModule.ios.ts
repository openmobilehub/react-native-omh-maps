import { OmhMapProvider, Providers } from '../../types/common';
import { IOmhMapsModule } from './OmhMapsModule.types';
import {
  OmhMapsAppleMapsIOSProvider,
  OmhMapsGoogleMapsIOSProvider,
} from '../ios/providers';

const MAP_PROVIDERS = [
  OmhMapsAppleMapsIOSProvider,
  OmhMapsGoogleMapsIOSProvider,
];

class OmhMapModuleImpl implements IOmhMapsModule {
  private selectedMapProvider: OmhMapProvider = this.getDefaultMapProvider();

  getSelectedMapProvider() {
    return this.selectedMapProvider;
  }

  initialize(providers: Providers) {
    this.selectedMapProvider = providers.iosProvider;
  }

  getAvailableMapProviders() {
    return MAP_PROVIDERS;
  }

  getDefaultMapProvider() {
    return MAP_PROVIDERS[0]!;
  }
}

export const OmhMapsModule = new OmhMapModuleImpl();
