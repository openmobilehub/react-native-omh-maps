import { useRef } from 'react';

import { NativeOmhMapViewComponent } from '../components/mapView/RNOmhMapsCoreViewNativeComponent';
import { maybeResetInterval } from '../utils/miscHelpers';
import { useOSMMapViewRelayout } from '../components/mapView/OmhMapViewNativeHelpers';

const RELAYOUT_MAP_WHEN_MOVING_CAMERA_INTERVAL_MS = 1000 / 45; // desired 45 Hz

/**
 * Applies a fix for OSM provider's info windows not updating their
 * position when the map is being moved and afterwards.
 * @param nativeComponentRef the reference to the native map component.
 * @param providerName the name of the provider.
 * @returns the fix object, containing three methods to be called from proper events.
 */
export const useOsmInfoWindowFix = (
  nativeComponentRef: React.MutableRefObject<NativeOmhMapViewComponent | null>,
  providerName: string | null
) => {
  const relayoutMapView = useOSMMapViewRelayout(
    nativeComponentRef,
    providerName
  );

  const relayoutWhenDraggingInterval = useRef<NodeJS.Timeout | null>(null);

  return {
    /** This method needs to be called when the map component is unmounted */
    onUnmount() {
      maybeResetInterval(relayoutWhenDraggingInterval);
    },

    /** This method needs to be called when the camera starts being moved - from `onCameraMoveStarted` */
    onCameraMoveStarted() {
      maybeResetInterval(relayoutWhenDraggingInterval);

      relayoutWhenDraggingInterval.current = setInterval(() => {
        relayoutMapView();
      }, RELAYOUT_MAP_WHEN_MOVING_CAMERA_INTERVAL_MS);
    },

    /** This method needs to be called once the camera stops moving - from `onCameraIdle` */
    onCameraIdle() {
      maybeResetInterval(relayoutWhenDraggingInterval);
      relayoutMapView(); // re-layout once again when the camera stops moving
    },
  };
};

export default useOsmInfoWindowFix;
