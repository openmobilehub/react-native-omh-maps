import { NativeSyntheticEvent, ViewProps } from 'react-native';

import {
  OmhAnchor,
  OmhColor,
  OmhCoordinate,
  OmhEvent,
  OmhIcon,
} from '../../types/common';

/**
 * The OMH Marker properties.
 */
export type OmhMarkerProps = ViewProps & OmhMarkerProperties & OmhMarkerEvents;

/**
 * Properties for the OmhMarker component.
 */
export type OmhMarkerProperties = {
  /**
   * The OmhCoordinate value for the marker's position on the map.
   *
   * Please note that this property **needs to be updated** when the marker is finished being dragged,
   * otherwise upon a change in properties, it will remain stuck at the property-position.
   */
  position: OmhCoordinate;

  /**
   * A text string that's displayed in an info window when the user taps the marker.
   */
  title?: string;

  /**
   * Whether the marker is clickable. If the marker is not clickable, the info window associated with this marker
   * will be disabled and no click events will be propagated.
   * Default: `true`.
   */
  clickable?: boolean;

  /**
   * Whether the marker is draggable.
   * Default: `false`.
   */
  draggable?: boolean;

  /**
   * The anchor point of marker image.
   */
  anchor?: OmhAnchor;

  /**
   * The anchor point of marker info window.
   */
  infoWindowAnchor?: OmhAnchor;

  /**
   * The alpha (transparency) of the marker.
   */
  alpha?: number;

  /**
   * The text snippet to be shown below marker title.
   */
  snippet?: string;

  /**
   * Whether the marker is visible.
   */
  isVisible?: boolean;

  /**
   * Whether the marker is flat (stuck to the map) or is a billboard (rotates and tilts with the camera).
   * Default: `false` (billboard).
   */
  isFlat?: boolean;

  /**
   * The rotation of the marker (degrees, clockwise) with respect to the map; default: `0`.
   */
  rotation?: number;

  /**
   * The RGB background color of the marker represented as an integer.
   */
  backgroundColor?: OmhColor;

  /**
   * The zIndex of the marker, which specifies the order in which the marker is drawn on the map.
   */
  markerZIndex?: number; // note: the name is not just zIndex, since this somehow collides with RN's property and fails to compile

  /**
   * The image to be used as the marker icon.
   */
  icon?: OmhIcon;

  /**
   * Controls whether the default behaviour of a clicked marker (such as opening an info window on click) for a marker click
   * event; identical to returning `true` from native android code in `OmhOnMarkerClickListener.onMarkerClick`.
   *
   * The reasoning behind this is that RN does not support synchronous bi-directional callbacks for passing data in new architecture.
   *
   * @see https://openmobilehub.github.io/android-omh-maps/api-docs/packages/core/com.openmobilehub.android.maps.core.presentation.interfaces.maps/-omh-on-marker-click-listener/on-marker-click.html
   */
  consumeMarkerClicks?: boolean;
};

type MarkerPositionCarryingOmhEvent = OmhEvent<{ position: OmhCoordinate }>;

/**
 * Event triggered when a marker is pressed.
 */
export type MarkerPressEvent = MarkerPositionCarryingOmhEvent;

/**
 * Event triggered when a marker drag starts.
 */
export type MarkerDragStartEvent = MarkerPositionCarryingOmhEvent;

/**
 * Event triggered when a marker is being dragged.
 */
export type MarkerDragEvent = MarkerPositionCarryingOmhEvent;

/**
 * Event triggered when a marker drag ends.
 */
export type MarkerDragEndEvent = MarkerPositionCarryingOmhEvent;

/**
 * Event triggered when an info window is pressed.
 */
export type InfoWindowPressEvent = OmhEvent<{ position?: OmhCoordinate }>;

/**
 * Event triggered when an info window is long pressed.
 */
export type InfoWindowLongPressEvent = MarkerPositionCarryingOmhEvent;

/**
 * Event triggered when an info window is closed.
 */
export type InfoWindowCloseEvent = NativeSyntheticEvent<{}>;

/**
 * Event triggered when an info window is opened.
 */
export type InfoWindowOpenEvent = NativeSyntheticEvent<{}>;

/**
 * Events for the OmhMarker component.
 */
export type OmhMarkerEvents = Partial<{
  /**
   * Callback invoked when the marker is clicked.
   */
  onPress: (event: MarkerPressEvent) => void;

  /**
   * Callback invoked when the marker has started being dragged.
   */
  onDragStart: (event: MarkerDragStartEvent) => void;

  /**
   * Callback invoked when the marker is being dragged.
   */
  onDrag: (event: MarkerDragEvent) => void;

  /**
   * Callback invoked when the marker has finished being dragged.
   *
   * **Note: this callback needs to update the `position` prop.**
   */
  onDragEnd: (event: MarkerDragEndEvent) => void;

  /** Called when an info window is pressed. */
  onInfoWindowPress: (event: InfoWindowPressEvent) => void;

  /** Called when an info window is long pressed. */
  onInfoWindowLongPress: (event: InfoWindowLongPressEvent) => void;

  /** Called when an info window is closed. */
  onInfoWindowClose: (event: InfoWindowCloseEvent) => void;

  /** Called when an info window is opened. */
  onInfoWindowOpen: (event: InfoWindowOpenEvent) => void;
}>;

/**
 * The OMH Marker reference.
 */
export type OmhMarkerRef = {
  /**
   * Shows the info window associated with this marker.
   */
  showInfoWindow: () => void;
  /**
   * Hides the info window associated with this marker if it is currently being
   * shown.
   * */
  hideInfoWindow: () => void;
};
