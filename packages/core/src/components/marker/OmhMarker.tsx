import React, { memo, useMemo } from 'react';

import { OmhMarkerComponentProps } from '../../types/OmhMarker';
import { rnResourceIdToAndroidURI } from '../../utils/RNResourceTranscoder';
import RNOmhMapsMarkerNativeComponent from './RNOmhMapsMarkerNativeComponent';

/**
 * The OMH Marker properties.
 */
export type OmhMarkerProps = OmhMarkerComponentProps;

/**
 * The OMH Marker component.
 */
export const OmhMarker = memo(
  ({ icon, position, ...props }: OmhMarkerProps) => {
    const nativeComponentRef = React.useRef<
      typeof RNOmhMapsMarkerNativeComponent | null
    >(null);

    const iconURI = useMemo(
      () =>
        icon === null || icon === undefined
          ? undefined
          : typeof icon === 'number'
            ? rnResourceIdToAndroidURI(icon)
            : icon,
      [icon]
    );

    return (
      <RNOmhMapsMarkerNativeComponent
        icon={iconURI}
        markerPosition={position}
        {...props}
        // @ts-ignore next line: missing typing for 'ref' prop on HostComponent
        ref={nativeComponentRef}
      />
    );
  }
);

export default OmhMarker;
