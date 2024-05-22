import { OmhCoordinate } from '../../types/common';

/**
 * The interface for the OmhMapsLocationModule.
 */
export interface IOmhMapsLocationModule {
  /**
   * Requests the new location.
   * @returns The current location.
   * @throws {OmhLocationError} When the location request fails.
   */
  getCurrentLocation(): Promise<OmhCoordinate>;
  /**
   * Requests the last known location.
   * @returns The last known location.
   * @throws {OmhLocationError} When the location request fails.
   */
  getLastLocation(): Promise<OmhCoordinate>;
}

/**
 * The error thrown when a location request fails.
 * @param message The error message.
 * @param isPermissionsError Whether the error is a permissions error.
 */
export class OmhLocationError extends Error {
  isPermissionsError: boolean;

  constructor(message: string, isPermissionsError: boolean) {
    super(message);
    this.isPermissionsError = isPermissionsError;
  }
}
