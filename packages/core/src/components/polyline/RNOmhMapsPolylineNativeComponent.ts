import type { HostComponent, ViewProps } from 'react-native';

import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import {
  DirectEventHandler,
  Double,
  Float,
  Int32,
} from 'react-native/Libraries/Types/CodegenTypes';

export type NativeCap = {
  type: string;
  icon?: {
    uri: string;
    width?: Int32;
    height?: Int32;
  };
  refWidth?: Float;
};

export type Pattern = {
  type: string;

  /**
   * The length of the dash or gap.
   */
  length?: Float;
};

export type NativeOmhCoordinate = {
  latitude: Double;
  longitude: Double;
};

export type NativeSpan = {
  segments: Int32;
  stamp?: {
    uri: string;
    width?: Int32;
    height?: Int32;
  };
  type: string;
  color?: Double;
  fromColor?: Double;
  toColor?: Double;
};

export interface NativeOmhPolylineProps extends ViewProps {
  /**
   * The points that make up the polyline.
   */
  points: NativeOmhCoordinate[];

  /**
   * Whether the polyline is clickable.
   */
  clickable?: boolean;

  /**
   * The RGB color of the polyline stroke represented as an integer.
   */
  color?: Double; // note: Int32 is too small, there is no Int64, so Double is used

  /**
   * The width of the polyline stroke.
   */
  width?: Float;

  /**
   * Whether the polyline is visible.
   */
  isVisible?: boolean;

  /**
   * The zIndex of the polyline, which specifies the order in which the polyline is drawn on the map.
   */
  polylineZIndex?: Float; // note: the name is not just zIndex, since this somehow collides with RN's property and fails to compile

  /**
   * The joint type of the polyline.
   */
  jointType?: Int32;

  /**
   * The pattern of the polyline.
   */
  pattern?: Pattern[];

  /**
   * The cap style of the polyline.
   */
  cap?: NativeCap;

  /**
   * The start cap style of the polyline.
   */
  startCap?: NativeCap;

  /**
   * The end cap style of the polyline.
   */
  endCap?: NativeCap;

  /**
   * Callback invoked when the polyline is clicked.
   * @returns `true` to consume the event and prevent propagation; `false` to allow the event to continue.
   */
  onPolylineClick?: DirectEventHandler<{
    consumed: boolean;
  }>;

  /**
   * Controls whether the default behaviour of a clicked polyline (such as opening an info window on click) for a polyline click
   * event; identical to returning `true` from native android code in `OmhOnPolylineClickListener.onPolylineClick`.
   *
   * The reasoning behind this is that RN does not support synchronous bi-directional callbacks for passing data in new architecture.
   *
   * @see https://www.openmobilehub.com/android-omh-maps/api-docs/packages/core/com.openmobilehub.android.maps.core.presentation.interfaces.maps/-omh-on-polyline-click-listener/on-polyline-click.html
   */
  consumePolylineClicks?: boolean;

  spans?: NativeSpan[];

  /**
   * The spans of the polyline.
   */
  //spans; TODO OMHD-198: implementation
}

export type RNOmhMapsPolylineNativeComponent =
  HostComponent<NativeOmhPolylineProps>;

export default codegenNativeComponent<NativeOmhPolylineProps>(
  'RNOmhMapsPolylineView',
  {
    excludedPlatforms: ['iOS'],
  }
) as RNOmhMapsPolylineNativeComponent;
