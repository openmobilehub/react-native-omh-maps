import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import MapView, { Details, Region, SnapshotOptions } from 'react-native-maps';
import {
  OmhMapViewProps,
  OmhMapViewRef,
  OmhSnapshotFormat,
} from './OmhMapView.types';
import { mergeStyles } from '../../utils/styleHelpers';
import { OmhMapsModule } from '../../modules/core/OmhMapsModule.ios';
import { OmhCoordinate } from '../../types/common';
import { getLatitudeDelta, getLongitudeDelta } from './OmhMapViewHelpers';
import { LayoutChangeEvent } from 'react-native';

enum MapErrors {
  MAP_NOT_IN_TREE_YET = 'OmhMap is not mounted in the RN view tree yet.',
}

const notReadyPromiseHandler = () =>
  Promise.reject(new Error(MapErrors.MAP_NOT_IN_TREE_YET));

const notReadyHandler = () => {
  throw new Error(MapErrors.MAP_NOT_IN_TREE_YET);
};

export const OmhMapView = forwardRef<OmhMapViewRef, OmhMapViewProps>(
  (
    {
      style,
      zoomEnabled,
      rotateEnabled,
      onMapLoaded,
      onCameraIdle,
      onCameraMoveStarted,
      children,
    },
    forwardedRef
  ) => {
    const mapViewRef = React.useRef<MapView>(null);

    const isRegionChangeInProgress = useRef(false);
    const mapDimensions = useRef<{ width: number; height: number } | null>(
      null
    );

    const mergedStyles = mergeStyles(style);
    const { width, height, ...restStyles } = mergedStyles || {};

    const provider = OmhMapsModule.getSelectedMapProvider();

    useImperativeHandle(
      forwardedRef,
      () => {
        const safeMapViewRef = mapViewRef.current;

        if (safeMapViewRef === null) {
          return {
            getViewRefHandle: notReadyHandler,
            getCameraCoordinate: notReadyPromiseHandler,
            setCameraCoordinate: notReadyPromiseHandler,
            getCurrentLocation: notReadyPromiseHandler,
            getProviderName: notReadyHandler,
            takeSnapshot: notReadyPromiseHandler,
          };
        }

        return {
          getCameraCoordinate: async () => {
            const camera = await safeMapViewRef.getCamera();

            return Promise.resolve({
              latitude: camera.center.latitude,
              longitude: camera.center.longitude,
            });
          },
          setCameraCoordinate: async (
            coordinate: OmhCoordinate,
            zoomLevel: number
          ) => {
            if (provider.name === 'Google') {
              return safeMapViewRef.setCamera({
                center: {
                  latitude: coordinate.latitude,
                  longitude: coordinate.longitude,
                },
                zoom: zoomLevel,
              });
            }

            const safeMapDimensions = mapDimensions.current;

            if (!safeMapDimensions) {
              return notReadyPromiseHandler();
            }
            // Zoom level is not supported by Apple Maps
            safeMapViewRef.animateToRegion({
              latitude: coordinate.latitude,
              longitude: coordinate.longitude,
              latitudeDelta: getLatitudeDelta(
                zoomLevel,
                safeMapDimensions.height
              ),
              longitudeDelta: getLongitudeDelta(
                zoomLevel,
                safeMapDimensions.width
              ),
            });
          },
          getCurrentLocation: () => {
            // TODO: Implement this
            return Promise.resolve({ latitude: 0, longitude: 0 });
          },
          getProviderName: () => {
            return provider.name;
          },
          takeSnapshot: async (format: OmhSnapshotFormat) => {
            const options: SnapshotOptions =
              format === 'base64' ? { result: 'file' } : { format: format };

            const snapshot = await safeMapViewRef.takeSnapshot(options);

            return Promise.resolve(snapshot);
          },
        };
      },
      [provider.name]
    );

    const handleRegionChange = (_region: Region, details: Details) => {
      if (!onCameraMoveStarted) {
        return;
      }

      if (isRegionChangeInProgress.current === true) {
        return;
      }

      isRegionChangeInProgress.current = true;

      onCameraMoveStarted(details.isGesture ? 'gesture' : 'unknown');
    };

    const handleCameraIdle = () => {
      isRegionChangeInProgress.current = false;

      onCameraIdle?.();
    };

    const handleLayout = (event: LayoutChangeEvent) => {
      mapDimensions.current = {
        width: event.nativeEvent.layout.width,
        height: event.nativeEvent.layout.height,
      };
    };

    return (
      <MapView
        ref={mapViewRef}
        children={children}
        onLayout={handleLayout}
        provider={provider.name === 'Google' ? 'google' : undefined}
        showsCompass={true}
        zoomEnabled={zoomEnabled}
        zoomTapEnabled={zoomEnabled}
        rotateEnabled={rotateEnabled}
        onRegionChangeComplete={handleCameraIdle}
        onRegionChange={handleRegionChange}
        onMapReady={onMapLoaded}
        style={[
          { height: height || '100%', width: width || '100%' },
          restStyles,
        ]}
      />
    );
  }
);
