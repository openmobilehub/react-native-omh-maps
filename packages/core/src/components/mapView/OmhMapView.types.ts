import { ViewProps, ViewStyle } from 'react-native';
import {
  OmhCoordinate,
  OmhMapProviderVariant,
  Percentage,
} from '../../types/common';

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
export type OmhMapViewProps = Omit<ViewProps, 'style'> & {
  /** The scale factor of the map. */
  scaleFactor?: number;
  /** The style to be applied to the map container */
  style?: Omit<ViewStyle, 'width' | 'height'> | null;
  /** The JSON map style */
  mapStyle?: string | object;
  /** The width and height of the map */
  width: number | Percentage;
  /** The width and height of the map */
  height: number | Percentage;
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
  /**
   * Map entities to be shown inside the map.
   *
   * **Note:** only OMH Map entities are allowed. Non-map children will be ignored.
   */
  children?: React.ReactNode;
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
  getProviderName: () => OmhMapProviderVariant;
  takeSnapshot: (resultFormat: OmhSnapshotFormat) => Promise<string>;
  getCurrentLocation: () => Promise<OmhCoordinate>;
};
