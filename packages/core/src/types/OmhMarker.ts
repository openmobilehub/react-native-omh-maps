import { ViewProps } from 'react-native';
import { OmhColor, OmhCoordinate, OmhEvent, OmhIcon, OmhPoint } from './common';

/**
 * Properties for the OmhMarker component.
 */
type OmhMarkerProperties = {
  /** The position of the marker. */
  position: OmhCoordinate;
  /** The title of the marker. */
  title?: string;
  /** If true, the marker is clickable. */
  clickable?: boolean;
  /** If true, the marker is draggable. */
  draggable?: boolean;
  /** The anchor point of the marker. */
  anchor?: OmhPoint;
  /** The anchor point of the info window. */
  infoWindowAnchor?: number;
  /** The alpha value of the marker. */
  alpha?: number;
  /** The snippet of the marker. */
  snippet?: string;
  /** The icon of the marker. */
  icon?: OmhIcon;
  /** If true, the marker is visible. */
  isVisible?: boolean;
  /** If true, the marker is flat. */
  isFlat?: boolean;
  /** The rotation of the marker. */
  rotation?: number;
  /** The background color of the marker. */
  backgroundColor?: OmhColor;
};

/**
 * Event triggered when a marker is pressed.
 */
type MarkerPressEvent = OmhEvent<{ omhMarkerProperties: OmhMarkerProperties }>;

/**
 * Event triggered when a marker drag starts.
 */
type MarkerDragStart = OmhEvent<{ omhMarkerProperties: OmhMarkerProperties }>;

/**
 * Event triggered when a marker is being dragged.
 */
type MarkerDragEvent = OmhEvent<{ omhMarkerProperties: OmhMarkerProperties }>;

/**
 * Event triggered when a marker drag ends.
 */
type MarkerDragEndEvent = OmhEvent<{
  omhMarkerProperties: OmhMarkerProperties;
}>;

/**
 * Event triggered when an info window is pressed.
 */
type InfoWindowPressEvent = OmhEvent<{
  omhMarkerProperties: OmhMarkerProperties;
}>;

/**
 * Event triggered when an info window is long pressed.
 */
type InfoWindowLongPressEvent = OmhEvent<{
  omhMarkerProperties: OmhMarkerProperties;
}>;

/**
 * Event triggered when an info window is closed.
 */
type InfoWindowCloseEvent = OmhEvent<{
  omhMarkerProperties: OmhMarkerProperties;
}>;

/**
 * Event triggered when an info window is opened.
 */
type InfoWindowOpenEvent = OmhEvent<{
  omhMarkerProperties: OmhMarkerProperties;
}>;

/**
 * Events for the OmhMarker component.
 */
export type OmhMarkerEvents = {
  /** Called when a marker is pressed. */
  onPress: (event: MarkerPressEvent) => void;
  /** Called when a marker drag starts. */
  onDragStart: (event: MarkerDragStart) => void;
  /** Called when a marker is being dragged. */
  onDrag: (event: MarkerDragEvent) => void;
  /** Called when a marker drag ends. */
  onDragEnd: (event: MarkerDragEndEvent) => void;
  /** Called when an info window is pressed. */
  onInfoWindowPress: (event: InfoWindowPressEvent) => void;
  /** Called when an info window is long pressed. */
  onInfoWindowLongPress: (event: InfoWindowLongPressEvent) => void;
  /** Called when an info window is closed. */
  onInfoWindowClose: (event: InfoWindowCloseEvent) => void;
  /** Called when an info window is opened. */
  onInfoWindowOpen: (event: InfoWindowOpenEvent) => void;
};

/**
 * Properties for the OmhMarker component.
 */
export type OmhMarkerComponentProps = ViewProps &
  OmhMarkerProperties &
  OmhMarkerEvents;

/**
 * Methods for the OmhMarker component.
 */
export type OmhMarkerMethods = {
  /** Shows the info window. */
  showInfoWindow: () => void;
  /** Hides the info window. */
  hideInfoWindow: () => void;
  /** Returns whether the info window is shown. */
  isInfoWindowShown: () => boolean;
};
