import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { AppState, NativeEventSubscription } from 'react-native';

import { useOmhMapContext } from '../../hooks/useOmhMapContext';
import { resolveResource } from '../../utils/RNResourceTranscoder';
import { OmhInfoWindowConstants } from '../infoWindow/OmhInfoWindowConstants';
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
    const { providerName: mapProviderName } = useOmhMapContext();

    const resolvedIcon = useMemo(
      () =>
        icon === null || icon === undefined
          ? undefined
          : typeof icon === 'number'
            ? resolveResource(icon)
            : icon,
      [icon]
    );

    const [backFromBackground, setBackFromBackground] = useState(false);
    const [appState, setAppState] = useState(AppState.currentState);
    const appStateSubRef = useRef<NativeEventSubscription | null>(null);

    const nativeComponentRef = React.useRef<
      typeof RNOmhMapsMarkerNativeComponent | null
    >(null);

    // AzureMaps invalid lay out fix effect
    // since AzureMaps SDK for Android is obfuscated, then there is no way to look "inside" why
    // the info windows (popups) are not rendered in the proper position on the screen. To overcome this
    // issue, for this provider a negative 50% vertical offset is applied; what's more, when the app is paused,
    // somehow the views are laid out properly and this fix is unnecessary. For this reason, the fix is only
    // applied until when the app has not been paused.
    useEffect(() => {
      appStateSubRef.current = AppState.addEventListener(
        'change',
        newAppState => {
          if (
            (appState === 'inactive' || appState === 'background') &&
            newAppState === 'active'
          ) {
            setBackFromBackground(true);
          }

          setAppState(newAppState);
        }
      );

      // cleanup effect
      return () => {
        appStateSubRef.current?.remove();
      };
    }, [appState]);

    const infoWindowAnchor = useMemo(
      () =>
        mapProviderName === 'AzureMaps' && !backFromBackground
          ? {
              ...(_infoWindowAnchor ??
                OmhInfoWindowConstants.IW_ANCHOR_CENTER_ABOVE),
              v:
                (
                  _infoWindowAnchor ??
                  OmhInfoWindowConstants.IW_ANCHOR_CENTER_ABOVE
                ).v - 0.5,
            }
          : _infoWindowAnchor,
      [_infoWindowAnchor, mapProviderName, backFromBackground]
    );

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
