import { MapProvider, OmhCoordinate, Paths } from '../../types/common';

export interface IOmhMapsModule {
  initialize(paths: Paths): void;
  getAvailableMapProviders(): MapProvider[];
  getDefaultMapProvider(): MapProvider;
  getCurrentLocation(): Promise<OmhCoordinate>;
}
