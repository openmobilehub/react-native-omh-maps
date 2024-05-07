import { IOmhMapsModule } from './OmhMapsModule.types';

export const OmhMapsModule: IOmhMapsModule = {
  initialize: () => {},
  getAvailableMapProviders: () => [],
  getDefaultMapProvider: () => ({ name: '', path: '' }),
  getCurrentLocation: () => Promise.resolve({ latitude: 0, longitude: 0 }),
};
