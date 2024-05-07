import { MapProvider, OmhCoordinate, Providers } from '../../types/common';

export interface IOmhMapsModule {
  initialize(providers: Providers): void;
  getAvailableMapProviders(): MapProvider[];
  getDefaultMapProvider(): MapProvider;
  getCurrentLocation(): Promise<OmhCoordinate>;
}
