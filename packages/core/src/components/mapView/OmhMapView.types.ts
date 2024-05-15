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
  /** The scale factor of the map. */
  scaleFactor?: number;
  /** The JSON map style */
  mapStyle?: string | object;
  /** If true, rotation is enabled on the map. */
  rotateEnabled?: boolean;
  /** If true, zoom is enabled on the map. */
  zoomEnabled?: boolean;
  /** If true, the user's location and the re-centering button is displayed on the map. */
  myLocationEnabled?: boolean;
  /** Internal map ready callback, invoked when the map view is ready, but the map is not loaded yet */
  onMapReady?: () => void;
  /** Callback invoked when the map is loaded */
  onMapLoaded?: () => void;
  /** Callback invoked when the map camera is idle */
  onCameraIdle?: () => void;
  /** Callback invoked when the location button was clicked on map*/
  onMyLocationClicked?: () => void;
  /** Callback invoked when the map camera starts to move */
  onCameraMoveStarted?: (reason: OmhCameraMoveStartedReason) => void;
};

/**
 * The OMH Map View reference.
 */
export type OmhMapViewRef = {
  getCameraCoordinate: () => Promise<OmhCoordinate | null>;
  setCameraCoordinate: (
    coordinate: OmhCoordinate,
    zoomLevel: number
  ) => Promise<void>;
  getProviderName: () => OmhMapProviderName;
  takeSnapshot: (resultFormat: OmhSnapshotFormat) => Promise<string>;
};
