import { OmhCoordinate } from '../../types/common';

export interface IOmhMapsLocationModule {
  getCurrentLocation(): Promise<OmhCoordinate>;
  getLastLocation(): Promise<OmhCoordinate>;
}

export class OmhLocationError extends Error {
  isPermissionsError: boolean;

  constructor(message: string, isPermissionsError: boolean) {
    super(message);
    this.isPermissionsError = isPermissionsError;
  }
}
