import type { HostComponent, ViewProps } from 'react-native';

import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import {
  DirectEventHandler,
  Double,
  Float,
  Int32,
} from 'react-native/Libraries/Types/CodegenTypes';

type NativePattern = {
  type: string;
  length?: Float;
};

type NativeOmhCoordinate = {
  latitude: Double;
  longitude: Double;
};

export interface NativeOmhPolygonProps extends ViewProps {
  outline: NativeOmhCoordinate[];
  clickable?: boolean;
  strokeColor?: Double; // note: Int32 is too small, there is no Int64, so Double is used
  fillColor?: Double; // note: Int32 is too small, there is no Int64, so Double is used
  strokeWidth?: Float;
  isVisible?: boolean;
  polygonZIndex?: Float; // note: the name is not just zIndex, since this somehow collides with RN's property and fails to compile
  strokeJointType?: Int32;
  strokePattern?: NativePattern[];
  onPolygonClick?: DirectEventHandler<{
    consumed: boolean;
  }>;
  consumePolygonClicks?: boolean;
}

export type RNOmhMapsPolygonNativeComponent =
  HostComponent<NativeOmhPolygonProps>;

export default codegenNativeComponent<NativeOmhPolygonProps>(
  'RNOmhMapsPolygonView',
  {
    excludedPlatforms: ['iOS'],
  }
) as RNOmhMapsPolygonNativeComponent;
