import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import {
  NativeSyntheticEvent,
  PixelRatio,
  StyleSheet,
  View,
  findNodeHandle,
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
  MapErrors,
  notReadyHandler,
  notReadyPromiseHandler,
} from './OmhMapViewHelpers';
import RNOmhMapsCoreViewNativeComponent from './RNOmhMapsCoreViewNativeComponent';

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

    const getViewRefHandle = useMemo(
      () =>
        <BAsserted extends boolean>(
          bThrowErrorIfNotInTree: BAsserted = false as any
        ): BAsserted extends true ? number : number | null => {
          const handle = findNodeHandle(nativeComponentRef.current);

          if (bThrowErrorIfNotInTree && handle === null)
            throw new Error(MapErrors.MAP_NOT_IN_TREE_YET);

          return handle!;
        },
      []
    );

    React.useImperativeHandle(
      forwardedRef,
      () => {
        const nodeHandle = getViewRefHandle();

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
      [getViewRefHandle]
    );

    const tweakCompass = useCallback(() => {
      try {
        const viewRef = getViewRefHandle(true);

        if (NativeOmhMapsCoreModule.getProviderName(viewRef) === 'Mapbox') {
          const mapboxPlugin = require('@omh/react-native-maps-plugin-mapbox');
          mapboxPlugin.OmhMapsPluginMapboxModule.tweakCompass(viewRef);
        }
      } catch (error) {
        console.error(error);
      }
    }, [getViewRefHandle]);

    const handleMapReady = useCallback(() => {
      tweakCompass();
      setIsMapReady(true);

      onMapReady?.();
    }, [onMapReady, tweakCompass]);

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
      <OmhMapContext.Provider
        value={{
          providerName,
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
