import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  NativeSyntheticEvent,
  PixelRatio,
  StyleSheet,
  View,
} from 'react-native';

import { OmhMapContext } from '../../context/OmhMapContext';
import NativeOmhMapsCoreModule from '../../modules/core/NativeOmhMapsCoreModule';
import { OmhMapProviderName } from '../../types/common';
import { mergeStyles } from '../../utils/styleHelpers';
import {
  OmhCameraMoveStartedReason,
  OmhMapViewProps,
  OmhMapViewRef,
  OmhSnapshotFormat,
} from './OmhMapView.types';
import {
  getViewRefHandle,
  notReadyHandler,
  notReadyPromiseHandler,
  tweakCompass,
  useMyLocationIconFix,
  useOSMMapViewRelayout,
} from './OmhMapViewHelpers';
import RNOmhMapsCoreViewNativeComponent from './RNOmhMapsCoreViewNativeComponent';

function maybeResetInterval(
  intervalRef: React.MutableRefObject<NodeJS.Timeout | null>
) {
  if (intervalRef.current !== null) {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }
}

/**
 * The OMH Map View component. Actual implementation is picked based on the platform capabilities (GMS or non-GMS)
 * and availability of installed providers (`@omh/react-native-maps-plugin-*`).
 */
export const OmhMapView = forwardRef<OmhMapViewRef, OmhMapViewProps>(
  (
    {
      style,
      onMapLoaded,
      children,
      zoomEnabled,
      rotateEnabled,
      onCameraIdle: _onCameraIdle,
      onCameraMoveStarted,
      mapStyle,
      onMapReady,
      myLocationEnabled,
      onMyLocationClicked,
    },
    forwardedRef
  ) => {
    const [providerName, setProviderName] = useState<OmhMapProviderName | null>(
      null
    );
    const [isMapReady, setIsMapReady] = useState(false);
    const [componentSize, setComponentSize] = useState({ width: 0, height: 0 });

    const mergedStyles = mergeStyles(style);
    const { width, height, ...restStyles } = mergedStyles || {};

    const nativeComponentRef = React.useRef<
      typeof RNOmhMapsCoreViewNativeComponent | null
    >(null);

    const relayoutWhenDraggingInterval = useRef<NodeJS.Timeout | null>(null);

    const relayoutMapView = useOSMMapViewRelayout(
      nativeComponentRef,
      providerName
    );

    const onCameraIdle = () => {
      maybeResetInterval(relayoutWhenDraggingInterval);
      relayoutMapView();

      _onCameraIdle?.();
    };

    useMyLocationIconFix(nativeComponentRef, isMapReady, myLocationEnabled);

    React.useImperativeHandle(
      forwardedRef,
      () => {
        const nodeHandle = getViewRefHandle(nativeComponentRef);

        if (nodeHandle === null) {
          return {
            getCameraCoordinate: notReadyPromiseHandler,
            setCameraCoordinate: notReadyPromiseHandler,
            getProviderName: notReadyHandler,
            takeSnapshot: notReadyPromiseHandler,
          };
        }

        return {
          getCameraCoordinate: () =>
            NativeOmhMapsCoreModule.getCameraCoordinate(nodeHandle),
          setCameraCoordinate: (...args) =>
            NativeOmhMapsCoreModule.setCameraCoordinate(nodeHandle, ...args),
          getProviderName: () =>
            NativeOmhMapsCoreModule.getProviderName(nodeHandle),
          takeSnapshot: (format: OmhSnapshotFormat) =>
            NativeOmhMapsCoreModule.takeSnapshot(nodeHandle, format),
        };
      },
      []
    );

    const handleMapReady = useCallback(() => {
      tweakCompass(nativeComponentRef);
      setIsMapReady(true);

      onMapReady?.();
    }, [onMapReady]);

    const onCameraMoveStartedMapped = (
      event: NativeSyntheticEvent<{ reason: number }>
    ) => {
      let reason: OmhCameraMoveStartedReason = 'unknown';
      switch (event.nativeEvent.reason) {
        case 1:
          reason = 'gesture';
          break;
        case 2:
          reason = 'apiAnimation';
          break;
        case 3:
          reason = 'developerAnimation';
          break;
      }

      maybeResetInterval(relayoutWhenDraggingInterval);
      relayoutWhenDraggingInterval.current = setInterval(() => {
        relayoutMapView();
      }, 1000 / 45);

      onCameraMoveStarted?.(reason);
    };

    const props = isMapReady
      ? {
          zoomEnabled,
          rotateEnabled,
          myLocationEnabled,
          children,
          mapStyle: JSON.stringify(mapStyle),
        }
      : {};

    // on mount effect
    useEffect(() => {
      return () => {
        // on unmount effect
        maybeResetInterval(relayoutWhenDraggingInterval);
      };
    }, []);

    return (
      <OmhMapContext.Provider
        value={{
          providerName,
          nativeComponentRef,
        }}>
        <View
          onLayout={event => {
            // since the Fragment size is measured manually in Android native code,
            // RN needs to calculate the actual size of the container (i.e., the available size)
            const { width: laidOutWidth, height: laidOutHeight } =
              event.nativeEvent.layout;
            setComponentSize({ width: laidOutWidth, height: laidOutHeight });
          }}
          style={[
            styles.mapContainer,
            restStyles,
            {
              // below: since the native child component does not impose proper size when in controlled size mode,
              // always provide fallback values that fill the available space by default
              width: width || '100%',
              height: height || '100%',
            },
          ]}>
          <RNOmhMapsCoreViewNativeComponent
            // @ts-ignore next line: missing typing for 'ref' prop on HostComponent
            ref={nativeComponentRef}
            style={{
              width: PixelRatio.getPixelSizeForLayoutSize(componentSize.width), // convert dpi to px
              height: PixelRatio.getPixelSizeForLayoutSize(
                componentSize.height
              ), // convert dpi to px
            }}
            onMapReady={handleMapReady}
            onMapLoaded={event => {
              setProviderName(event.nativeEvent.providerName);

              onMapLoaded?.(event.nativeEvent.providerName);
            }}
            onCameraIdle={onCameraIdle}
            onMyLocationClicked={onMyLocationClicked}
            onCameraMoveStarted={onCameraMoveStartedMapped}
            {...props}
          />
        </View>
      </OmhMapContext.Provider>
    );
  }
);

const styles = StyleSheet.create({
  mapContainer: { overflow: 'hidden' },
});
