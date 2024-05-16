import React, { memo, useMemo } from 'react';

import useOmhMarkerOSMFix from '../../hooks/useOmhMarkerOSMFix';
import { resolveResource } from '../../utils/RNResourceTranscoder';
import { OmhMarkerProps } from './OmhMarker.types';
import RNOmhMapsMarkerNativeComponent from './RNOmhMapsMarkerNativeComponent';

/**
 * The OMH Marker component.
 */
export const OmhMarker = memo(
  ({
    icon,
    position,
    onPress,
    infoWindowAnchor: _infoWindowAnchor,
    ...props
  }: OmhMarkerProps) => {
    const infoWindowAnchor = useOmhMarkerOSMFix(_infoWindowAnchor);

    const resolvedIcon = useMemo(
      () =>
        icon === null || icon === undefined
          ? undefined
          : typeof icon === 'number'
            ? resolveResource(icon)
            : icon,
      [icon]
    );

    const nativeComponentRef = React.useRef<
      typeof RNOmhMapsMarkerNativeComponent | null
    >(null);

    return (
      <RNOmhMapsMarkerNativeComponent
        {...props}
        icon={
          resolvedIcon
            ? {
                ...resolvedIcon,
                // compensate for image resizing occurring in the native library that properly sizes Drawables
                width: resolvedIcon.width ? resolvedIcon.width * 3 : undefined,
                height: resolvedIcon.height
                  ? resolvedIcon.height * 3
                  : undefined,
              }
            : undefined
        }
        infoWindowAnchor={infoWindowAnchor}
        markerPosition={position}
        onMarkerPress={onPress}
        // @ts-ignore next line: missing typing for 'ref' prop on HostComponent
        ref={nativeComponentRef}
      />
    );
  }
);
