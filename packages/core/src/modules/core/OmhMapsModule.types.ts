import { OmhMapProvider, OmhCoordinate, Providers } from '../../types/common';

export interface IOmhMapsModule {
  initialize(providers: Providers): void;
  getAvailableMapProviders(): OmhMapProvider[];
  getDefaultMapProvider(): OmhMapProvider;
  getCurrentLocation(): Promise<OmhCoordinate>;
}
