import { IOmhMapsLocationModule } from './OmhMapsLocationModule.types';

export const OmhMapsLocationModule: IOmhMapsLocationModule = {
  getCurrentLocation: () => Promise.resolve({ latitude: 0, longitude: 0 }),
  getLastLocation: () => Promise.resolve({ latitude: 0, longitude: 0 }),
};
