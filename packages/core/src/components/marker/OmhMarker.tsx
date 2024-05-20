import React, { forwardRef, useImperativeHandle, useMemo } from 'react';
import { PixelRatio } from 'react-native';

import useOmhMarkerOSMFix from '../../hooks/useOmhMarkerOSMFix';
import { resolveResource } from '../../utils/RNResourceTranscoder';
import { OmhMarkerProps, OmhMarkerRef } from './OmhMarker.types';
import RNOmhMapsMarkerNativeComponent, {
  Commands,
  RNOmhMapsMarkerNativeComponent as RefType,
} from './RNOmhMapsMarkerNativeComponent';

/**
 * The OMH Marker component.
 */
export const OmhMarker = forwardRef<OmhMarkerRef, OmhMarkerProps>(
  (
    {
      icon,
      position,
      onPress,
      infoWindowAnchor: _infoWindowAnchor,
      backgroundColor: _backgroundColor,
      ...props
    },
    forwardedRef
  ) => {
    const nativeComponentRef = React.useRef<React.ElementRef<RefType>>();

    useImperativeHandle(forwardedRef, () => ({
      showInfoWindow: () => {
        if (nativeComponentRef.current) {
          Commands.showInfoWindow(nativeComponentRef.current);
        }
      },
      hideInfoWindow: () => {
        if (nativeComponentRef.current) {
          Commands.hideInfoWindow(nativeComponentRef.current);
        }
      },
    }));

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

    const backgroundColor = useMemo(
      () => (_backgroundColor === undefined ? -1 : _backgroundColor),
      [_backgroundColor]
    );

    return (
      <RNOmhMapsMarkerNativeComponent
        {...props}
        icon={
          resolvedIcon
            ? {
                ...resolvedIcon,
                // compensate for image resizing occurring in the native library that properly sizes Drawables
                width: resolvedIcon.width
                  ? PixelRatio.getPixelSizeForLayoutSize(resolvedIcon.width)
                  : undefined,
                height: resolvedIcon.height
                  ? PixelRatio.getPixelSizeForLayoutSize(resolvedIcon.height)
                  : undefined,
              }
            : undefined
        }
        infoWindowAnchor={infoWindowAnchor}
        backgroundColor={backgroundColor}
        markerPosition={position}
        onMarkerPress={onPress}
        // @ts-ignore next line: missing typing for 'ref' prop on HostComponent
        ref={nativeComponentRef}
      />
    );
  }
);
