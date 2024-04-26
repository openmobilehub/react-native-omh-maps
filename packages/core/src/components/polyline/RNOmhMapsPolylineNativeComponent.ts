import type { HostComponent, ViewProps } from 'react-native';

import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import {
  Double,
  Float,
  Int32,
} from 'react-native/Libraries/Types/CodegenTypes';

export type Cap = {
  type: string;

  /**
   * The image URI to be used as the cap icon.
   */
  bitmap?: string;
  refWidth?: Float;
};

export type NativeOmhCoordinate = {
  latitude: Double;
  longitude: Double;
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
  pattern?: string;

  /**
   * The cap style of the polyline.
   */
  cap?: Cap;

  /**
   * The start cap style of the polyline.
   */
  startCap?: Cap;

  /**
   * The end cap style of the polyline.
   */
  endCap?: Cap;

  /**
   * The spans of the polyline.
   */
  //spans;
}

export type RNOmhMapsPolylineNativeComponent =
  HostComponent<NativeOmhPolylineProps>;

export default codegenNativeComponent<NativeOmhPolylineProps>(
  'RNOmhMapsPolylineView',
  {
    excludedPlatforms: ['iOS'],
  }
) as RNOmhMapsPolylineNativeComponent;
