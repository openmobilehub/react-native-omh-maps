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

export enum OmhInfoWindowViewMode {
  /** Overrides the whole IW view, including both the window frame and its contents */
  CUSTOM_WINDOW = 'custom-window',
  /** Overrides only the IW's contents, leaving the default IW frame */
  CUSTOM_CONTENTS = 'custom-contents',
  /** Uses the default IW frame & contents; default option */
  DEFAULT = 'default',
}

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
  /**
   * The view mode that controls whether - for each marker - to:
   * - show the default info window view for the marker (`OmhInfoWindowViewMode.DEFAULT`)
   * - show a custom info window view for the marker, which overrides both the default contents and window container view (`OmhInfoWindowViewMode.CUSTOM_CONTENTS`)
   * - show a custom info window contents view for the marker, using the default window container view (`OmhInfoWindowViewMode.CUSTOM_WINDOW`)
   *
   * The two latter options (`OmhInfoWindowViewMode.CUSTOM_CONTENTS` and `OmhInfoWindowViewMode.CUSTOM_WINDOW`) require the marker to have a custom info window view provided by
   * rendering a **single** child inside **every** `OmhMarker` component.
   *
   * @default OmhInfoWindowViewMode.DEFAULT
   */
  infoWindowViewMode?: OmhInfoWindowViewMode;
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
  getCurrentLocation: () => Promise<OmhCoordinate>;
};
