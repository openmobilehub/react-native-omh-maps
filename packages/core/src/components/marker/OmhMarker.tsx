import React, { memo, useMemo } from 'react';
import { resolveResource } from '../../utils/RNResourceTranscoder';
import RNOmhMapsMarkerNativeComponent from './RNOmhMapsMarkerNativeComponent';
import { OmhMarkerProps } from './OmhMarker.types';

/**
 * The OMH Marker component.
 */
export const OmhMarker = memo(
  ({ icon, position, onPress, ...props }: OmhMarkerProps) => {
    const nativeComponentRef = React.useRef<
      typeof RNOmhMapsMarkerNativeComponent | null
    >(null);

    const iconURI = useMemo(
      () =>
        icon === null || icon === undefined
          ? undefined
          : typeof icon === 'number'
            ? resolveResource(icon)
            : icon,
      [icon]
    );

    return (
      <RNOmhMapsMarkerNativeComponent
        {...props}
        icon={iconURI}
        markerPosition={position}
        onMarkerPress={onPress}
        // @ts-ignore next line: missing typing for 'ref' prop on HostComponent
        ref={nativeComponentRef}
      />
    );
  }
);
