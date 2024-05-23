import { ViewProps } from 'react-native';

import { OmhCoordinate, OmhMapProviderName } from '../../types/common';

/**
 * Reason for the camera movement on the map.
 */
export type OmhCameraMoveStartedReason =
  | 'unknown'
  | 'gesture'
  | 'apiAnimation'
  | 'developerAnimation';

/**
 * The OMH Snapshot format.
 */
export type OmhSnapshotFormat = 'png' | 'jpg' | 'base64';

/**
 * The OMH Map View properties.
 */
export type OmhMapViewProps = ViewProps & {
  /** The custom JSON map style */
  mapStyle?: string | object;
  /** If true, rotation is enabled on the map. */
  rotateEnabled?: boolean;
  /** If true, zoom is enabled on the map. */
  zoomEnabled?: boolean;
  /** If true, the user's location and the re-centering button is displayed on the map. */
  myLocationEnabled?: boolean;
  /** Map ready callback, invoked once when the map view is ready, but the map is not loaded yet */
  onMapReady?: () => void;
  /** Callback invoked once when the map is fully loaded */
  onMapLoaded?: (providerName: string) => void;
  /** Callback invoked when the map camera is idle */
  onCameraIdle?: () => void;
  /** Callback invoked when the location button was clicked */
  onMyLocationClicked?: () => void;
  /** Callback invoked when the map camera starts to move */
  onCameraMoveStarted?: (reason: OmhCameraMoveStartedReason) => void;
};

/**
 * The OMH Map View reference.
 */
export type OmhMapViewRef = {
  /**
   * Gets the current camera center coordinate.
   * @returns The current camera center coordinate.
   */
  getCameraCoordinate: () => Promise<OmhCoordinate | null>;
  /**
   * Sets the camera center coordinate and zoom level.
   * @param coordinate The new camera center coordinate.
   * @param zoomLevel The new zoom level.
   */
  setCameraCoordinate: (
    coordinate: OmhCoordinate,
    zoomLevel: number
  ) => Promise<void>;
  /**
   * Gets the map provider name.
   * @returns The map provider name.
   */
  getProviderName: () => OmhMapProviderName;
  /**
   * Takes a snapshot of the current map view.
   * @param resultFormat The format of the snapshot.
   * @returns The snapshot as local file path or base64 encoded string.
   */
  takeSnapshot: (resultFormat: OmhSnapshotFormat) => Promise<string>;
};
