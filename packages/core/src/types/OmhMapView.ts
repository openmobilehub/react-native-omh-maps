import { ViewProps, ViewStyle } from 'react-native';

import { OmhCoordinate, OmhEvent } from './common';

/**
 * Reason for the camera movement on the map.
 */
export type OmhCameraMoveStartedReason =
  | 'unknown'
  | 'gesture'
  | 'apiAnimation'
  | 'developerAnimation';

/**
 * Options for taking a snapshot of the map.
 */
export type OmhSnapshotOptions = {
  /** The format of the snapshot result. */
  result: 'file' | 'base64';
};

/**
 * The style of the map.
 */
export type OmhMapStyle = any;

export type Percentage = `${number}%`;

/**
 * Properties for the OmhMapView component.
 */
export type OmhMapViewProps = {
  /** The scale factor of the map. */
  scaleFactor?: number;
  /** The style to be applied to the map container */
  style?: Omit<ViewStyle, 'width' | 'height'> | null;
  width: number | Percentage;
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
  /** Callback invoked when the map camera starts to move */
  onCameraMoveStarted?: (reason: OmhCameraMoveStartedReason) => void;
  /**
   * Map entities to be shown inside the map.
   *
   * **Note:** only OMH Map entities are allowed. Non-map children will be ignored.
   */
  children?: React.ReactNode;
};

/** Event triggered when the My Location button is pressed. */
export type MyLocationButtonPressEvent = OmhEvent<{}>;
/** Event triggered when the map has finished loading. */
export type MapLoadedEvent = OmhEvent<{}>;
/** Event triggered when the camera becomes idle after movement. */
export type CameraIdleEvent = OmhEvent<{}>;
/** Event triggered when the camera starts moving. */
export type CameraMoveStartedEvent = OmhEvent<{
  /** The reason for the camera movement. */
  reason: OmhCameraMoveStartedReason;
}>;

/**
 * Events for the OmhMapView component.
 */
export type OmhMapEvents = {
  /** Called when the map has finished loading. */
  onMapLoaded: (event: MapLoadedEvent) => void;
  /** Called when the My Location button is pressed. */
  onMyLocationButtonPress: (event: MyLocationButtonPressEvent) => void;
  /** Called when the camera becomes idle after movement. */
  onCameraIdle: (event: CameraIdleEvent) => void;
  /** Called when the camera starts moving. */
  onCameraMoveStarted: (event: CameraMoveStartedEvent) => void;
};

/**
 * Properties for the OmhMapView component.
 */
export type OmhMapViewComponentProps = ViewProps &
  OmhMapViewProps &
  OmhMapEvents;

/**
 * Imperative methods for the OmhMapView component.
 */
export type OmhMapMethods = {
  /** Takes a snapshot of the map with the given options. */
  takeSnapshot: (options: OmhSnapshotOptions) => Promise<string>;
  /** Returns the name of the map provider. */
  getProviderName: () => void;
  /** Returns the current camera position. */
  getCameraPosition: () => OmhCoordinate;
  /** Moves the camera to the given position and zoom level. */
  moveCamera: (position: OmhCoordinate, zoomLevel: number) => void;
  /** Returns whether the user's location is enabled on the map. */
  isMyLocationEnabled: () => boolean;
};
