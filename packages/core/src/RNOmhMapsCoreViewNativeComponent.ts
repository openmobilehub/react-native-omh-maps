import type { HostComponent, ViewProps } from 'react-native';
import { DirectEventHandler } from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

type Paths = {
  gmsPath: string;
  nonGmsPath: string;
};

export interface NativeOmhMapViewProps extends ViewProps {
  zoomEnabled?: boolean;
  paths: Paths;
  onMapReady?: DirectEventHandler<null>;
}

export type NativeOmhMapViewComponent = HostComponent<NativeOmhMapViewProps>;

export default codegenNativeComponent<NativeOmhMapViewProps>(
  'RNOmhMapsCoreView',
  {
    excludedPlatforms: ['iOS'],
  }
) as NativeOmhMapViewComponent;
