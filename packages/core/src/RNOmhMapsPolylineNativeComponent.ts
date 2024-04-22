import type { HostComponent, ViewProps } from 'react-native';

import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';

type OmhCoordinate = {
  latitude: Double;
  longitude: Double;
};

export interface NativeOmhPolylineProps extends ViewProps {
  points: OmhCoordinate[];
}

export type RNOmhMapsPolylineNativeComponent =
  HostComponent<NativeOmhPolylineProps>;

export default codegenNativeComponent<NativeOmhPolylineProps>(
  'RNOmhMapsPolylineView',
  {
    excludedPlatforms: ['iOS'],
  }
) as RNOmhMapsPolylineNativeComponent;
