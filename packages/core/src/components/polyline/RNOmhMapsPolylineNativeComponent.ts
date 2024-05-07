import type { HostComponent, ViewProps } from 'react-native';

import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import {
  DirectEventHandler,
  Double,
  Float,
  Int32,
} from 'react-native/Libraries/Types/CodegenTypes';

type NativeCap = {
  type: string;
  icon?: {
    uri: string;
    width?: Int32;
    height?: Int32;
  };
  refWidth?: Float;
};

type NativePattern = {
  type: string;
  length?: Float;
};

type NativeOmhCoordinate = {
  latitude: Double;
  longitude: Double;
};

type NativeSpan = {
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
  points: NativeOmhCoordinate[];
  clickable?: boolean;
  color?: Double; // note: Int32 is too small, there is no Int64, so Double is used
  width?: Float;
  isVisible?: boolean;
  polylineZIndex?: Float; // note: the name is not just zIndex, since this somehow collides with RN's property and fails to compile
  jointType?: Int32;
  pattern?: NativePattern[];
  cap?: NativeCap;
  startCap?: NativeCap;
  endCap?: NativeCap;
  onPolylineClick?: DirectEventHandler<{
    consumed: boolean;
  }>;
  consumePolylineClicks?: boolean;
  spans?: NativeSpan[];
}

export type RNOmhMapsPolylineNativeComponent =
  HostComponent<NativeOmhPolylineProps>;

export default codegenNativeComponent<NativeOmhPolylineProps>(
  'RNOmhMapsPolylineView',
  {
    excludedPlatforms: ['iOS'],
  }
) as RNOmhMapsPolylineNativeComponent;
