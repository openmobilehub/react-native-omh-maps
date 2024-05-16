import React, { forwardRef, useCallback, useState } from 'react';
import {
  NativeSyntheticEvent,
  PixelRatio,
  StyleSheet,
  View,
} from 'react-native';
import NativeOmhMapsCoreModule from '../../modules/core/NativeOmhMapsCoreModule';
import RNOmhMapsCoreViewNativeComponent from './RNOmhMapsCoreViewNativeComponent';
import {
  OmhCameraMoveStartedReason,
  OmhMapViewProps,
  OmhMapViewRef,
  OmhSnapshotFormat,
} from './OmhMapView.types';
import { mergeStyles } from '../../utils/styleHelpers';
import {
  getViewRefHandle,
  notReadyHandler,
  notReadyPromiseHandler,
  tweakCompass,
  useMyLocationIconFix,
} from './OmhMapViewHelpers';

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
      onCameraIdle,
      onCameraMoveStarted,
      mapStyle,
      onMapReady,
      myLocationEnabled,
      onMyLocationClicked,
    },
    forwardedRef
  ) => {
    const [isMapReady, setIsMapReady] = useState(false);
    const [componentSize, setComponentSize] = useState({ width: 0, height: 0 });

    const mergedStyles = mergeStyles(style);
    const { width, height, ...restStyles } = mergedStyles || {};

    const nativeComponentRef = React.useRef<
      typeof RNOmhMapsCoreViewNativeComponent | null
    >(null);

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

    return (
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
            height: PixelRatio.getPixelSizeForLayoutSize(componentSize.height), // convert dpi to px
          }}
          onMapReady={handleMapReady}
          onMapLoaded={onMapLoaded}
          onCameraIdle={onCameraIdle}
          onMyLocationClicked={onMyLocationClicked}
          onCameraMoveStarted={onCameraMoveStartedMapped}
          {...props}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  mapContainer: { overflow: 'hidden' },
});
