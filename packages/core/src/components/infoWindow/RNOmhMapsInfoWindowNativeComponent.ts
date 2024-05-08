import type { HostComponent, ViewProps } from 'react-native';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export interface NativeOmhInfoWindowProps extends ViewProps {
  childrenSize: { width: Int32; height: Int32 };
}

export type NativeOmhInfoWindowComponent =
  HostComponent<NativeOmhInfoWindowProps>;

export default codegenNativeComponent<NativeOmhInfoWindowProps>(
  'RNOmhMapsInfoWindowContents',
  {
    excludedPlatforms: ['iOS'],
  }
) as NativeOmhInfoWindowComponent;
