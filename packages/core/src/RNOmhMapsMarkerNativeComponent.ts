import type { HostComponent, ViewProps } from 'react-native';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

type OmhCoordinate = {
  latitude: Double;
  longitude: Double;
};

export interface NativeOmhMarkerProps extends ViewProps {
  position: OmhCoordinate;
}

export type RNOmhMapsMarkerNativeComponent =
  HostComponent<NativeOmhMarkerProps>;

export default codegenNativeComponent<NativeOmhMarkerProps>(
  'RNOmhMapsMarkerView',
  {
    excludedPlatforms: ['iOS'],
  }
) as RNOmhMapsMarkerNativeComponent;
