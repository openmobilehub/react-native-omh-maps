import { OmhCoordinate } from '../../types/common';

export interface IOmhMapsLocationModule {
  getCurrentLocation(): Promise<OmhCoordinate>;
  getLastLocation(): Promise<OmhCoordinate>;
}
