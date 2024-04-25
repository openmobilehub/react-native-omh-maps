import React, { memo, useMemo } from 'react';

import { rnResourceIdToAndroidURI } from '../../utils/RNResourceTranscoder';
import RNOmhMapsMarkerNativeComponent, {
  NativeOmhMarkerProps,
} from './RNOmhMapsMarkerNativeComponent';

/**
 * The OMH Marker properties.
 */
export type OmhMarkerProps = NativeOmhMarkerProps & {
  /**
   * The image resource ID to be used as the marker icon, received from an `import` or `require()` call to a bitmap ąsset.
   */
  icon?: number;
};

/**
 * The OMH Marker component. Actual implementation is picked based on the platform capabilities (GMS or non-GMS)
 * and availability of installed providers (`@omh/react-native-maps-plugin-*`).
 */
export const OmhMarker = memo(({ icon, ...props }: OmhMarkerProps) => {
  const nativeComponentRef = React.useRef<
    typeof RNOmhMapsMarkerNativeComponent | null
  >(null);

  const iconURI = useMemo(
    () =>
      icon === null || icon === undefined
        ? undefined
        : rnResourceIdToAndroidURI(icon),
    [icon]
  );

  return (
    <RNOmhMapsMarkerNativeComponent
      icon={iconURI}
      {...props}
      // @ts-ignore next line: missing typing for 'ref' prop on HostComponent
      ref={nativeComponentRef}
    />
  );
});

export default OmhMarker;
