import type { HostComponent, ViewProps } from 'react-native';
import {
  DirectEventHandler,
  Int32,
} from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export interface NativeOmhMapViewProps extends ViewProps {
  zoomEnabled?: boolean;
  rotateEnabled?: boolean;
  mapStyle?: string;
  myLocationEnabled?: boolean;
  onMapReady?: DirectEventHandler<null>;
  onMapLoaded?: DirectEventHandler<null>;
  onCameraMoveStarted?: DirectEventHandler<{ reason: Int32 }>;
  onCameraIdle?: DirectEventHandler<null>;
  onMyLocationClicked?: DirectEventHandler<null>;
  customInfoWindowView: string;
}

export type NativeOmhMapViewComponent = HostComponent<NativeOmhMapViewProps>;

export default codegenNativeComponent<NativeOmhMapViewProps>(
  'RNOmhMapsCoreView',
  {
    excludedPlatforms: ['iOS'],
  }
) as NativeOmhMapViewComponent;
