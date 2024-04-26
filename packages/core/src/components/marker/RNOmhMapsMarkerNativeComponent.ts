import type { HostComponent, ViewProps } from 'react-native';
import {
  DirectEventHandler,
  Double,
  Float,
} from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export type NativeOmhCoordinate = {
  latitude: Double;
  longitude: Double;
};

export type Anchor = {
  /** the normalized (`0` - `1`) icon X coordinate specifier; default: `0.5` */
  u: Float;
  /** the normalized (`0` - `1`) icon Y coordinate specifier; default: `0.5` */
  v: Float;
};

export interface NativeOmhMarkerProps extends ViewProps {
  /**
   * The OmhCoordinate value for the marker's position on the map.
   *
   * Please note that this property **needs to be updated** when the marker is finished being dragged,
   * otherwise upon a change in properties, it will remain stuck at the property-position.
   */
  position: NativeOmhCoordinate;

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
  anchor?: Anchor;

  /**
   * The anchor point of marker info window.
   */
  infoWindowAnchor?: Anchor;

  /**
   * The alpha (transparency) of the marker.
   */
  alpha?: Float;

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
  rotation?: Float;

  /**
   * The RGB background color of the marker represented as an integer.
   */
  backgroundColor?: Double; // note: Int32 is too small, there is no Int64, so Double is used

  /**
   * Whether the info window associated with this marker is currently being shown.
   */
  isInfoWindowShown?: boolean;

  /**
   * The zIndex of the marker, which specifies the order in which the marker is drawn on the map.
   */
  markerZIndex?: Float; // note: the name is not just zIndex, since this somehow collides with RN's property and fails to compile

  /**
   * Callback invoked when the marker is clicked.
   * @returns `true` to consume the event and prevent propagation; `false` to allow the event to continue.
   */
  onMarkerClick?: DirectEventHandler<{
    consumed: boolean;
  }>;

  /**
   * Controls whether the default behaviour of a clicked marker (such as opening an info window on click) for a marker click
   * event; identical to returning `true` from native android code in `OmhOnMarkerClickListener.onMarkerClick`.
   *
   * The reasoning behind this is that RN does not support synchronous bi-directional callbacks for passing data in new architecture.
   *
   * @see https://www.openmobilehub.com/android-omh-maps/api-docs/packages/core/com.openmobilehub.android.maps.core.presentation.interfaces.maps/-omh-on-marker-click-listener/on-marker-click.html
   */
  consumeMarkerClicks?: boolean;

  /**
   * Callback invoked when the marker has started being dragged.
   */
  onMarkerDragStart?: DirectEventHandler<NativeOmhCoordinate>;

  /**
   * Callback invoked when the marker is being dragged.
   */
  onMarkerDrag?: DirectEventHandler<NativeOmhCoordinate>;

  /**
   * Callback invoked when the marker has finished being dragged.
   *
   * **Note: this callback needs to update the `position` prop.**
   */
  onMarkerDragEnd?: DirectEventHandler<NativeOmhCoordinate>;

  /**
   * The image URI to be used as the marker icon.
   */
  icon?: string;
}

export type RNOmhMapsMarkerNativeComponent =
  HostComponent<NativeOmhMarkerProps>;

export default codegenNativeComponent<NativeOmhMarkerProps>(
  'RNOmhMapsMarkerView',
  {
    excludedPlatforms: ['iOS'],
  }
) as RNOmhMapsMarkerNativeComponent;
