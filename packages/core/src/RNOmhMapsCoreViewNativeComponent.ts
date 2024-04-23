import type { HostComponent, ViewProps } from 'react-native';
import {
  DirectEventHandler,
  Int32,
} from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

type Paths = {
  gmsPath: string;
  nonGmsPath: string;
};

export interface NativeOmhMapViewProps extends ViewProps {
  paths: Paths;
  zoomEnabled?: boolean;
  rotateEnabled?: boolean;
  onMapReady?: DirectEventHandler<null>;
  onMapLoaded?: DirectEventHandler<null>;
  onCameraMoveStarted?: DirectEventHandler<{ reason: Int32 }>;
  onCameraIdle?: DirectEventHandler<null>;
}

export type NativeOmhMapViewComponent = HostComponent<NativeOmhMapViewProps>;

export default codegenNativeComponent<NativeOmhMapViewProps>(
  'RNOmhMapsCoreView',
  {
    excludedPlatforms: ['iOS'],
  }
) as NativeOmhMapViewComponent;
