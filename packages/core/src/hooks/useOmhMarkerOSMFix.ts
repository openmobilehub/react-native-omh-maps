import { useEffect, useMemo, useRef, useState } from 'react';
import { AppState, NativeEventSubscription } from 'react-native';

import { OmhInfoWindowConstants } from '../components/infoWindow/OmhInfoWindowConstants';
import { OmhAnchor } from '../types/common';
import { useOmhMapContext } from './useOmhMapContext';

/**
 * Since AzureMaps SDK for Android is obfuscated, then there is no way to examine why
 * the info windows (popups) are not rendered in the proper position on the screen. To overcome this
 * issue, for this provider a negative 50% vertical offset is applied; what's more, when the app is paused and resumed,
 * the views are laid out properly and this fix is redundant afterwards. For this reason, the fix is only
 * applied until when the app has been paused.
 *
 * @param _infoWindowAnchor - the anchor to be fixed
 *
 * @returns the fixed anchor
 */
export const useOmhMarkerOSMFix = (
  _infoWindowAnchor?: OmhAnchor
): OmhAnchor | undefined => {
  const { providerName: mapProviderName } = useOmhMapContext();

  const [backFromBackground, setBackFromBackground] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);

  const appStateSubRef = useRef<NativeEventSubscription | null>(null);

  // AzureMaps invalid lay out fix effect
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

  return infoWindowAnchor;
};

export default useOmhMarkerOSMFix;
