import React from 'react';

import RNOmhMapsMarkerNativeComponent, {
  NativeOmhMarkerProps,
} from './RNOmhMapsMarkerNativeComponent';

// enum MapErrors {
//   MAP_NOT_IN_TREE_YET = 'OmhMap is not mounted in the RN view tree yet.',
// }

/**
 * The OMH Marker properties.
 */
export type OmhMarkerProps = NativeOmhMarkerProps;

/**
 * The OMH Marker component. Actual implementation is picked based on the platform capabilities (GMS or non-GMS)
 * and availability of installed providers (`@omh/react-native-maps-plugin-*`).
 */
export const OmhMarker = ({ position }: OmhMarkerProps) => {
  const nativeComponentRef = React.useRef<
    typeof RNOmhMapsMarkerNativeComponent | null
  >(null);

  return (
    <RNOmhMapsMarkerNativeComponent
      // @ts-ignore next line: missing typing for 'ref' prop on HostComponent
      ref={nativeComponentRef}
      position={position}
    />
  );
};

export default OmhMarker;
