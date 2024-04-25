import React, { forwardRef, useMemo, useState } from 'react';
import {
  NativeSyntheticEvent,
  PixelRatio,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
  findNodeHandle,
} from 'react-native';

import NativeOmhMapsCoreModule, { Spec } from './NativeOmhMapsCoreModule';
import RNOmhMapsCoreViewNativeComponent from './RNOmhMapsCoreViewNativeComponent';
import { OmhMapsCoreModuleFunctionWithoutViewRef } from './typeHelpers';
import { OmhMapProviderVariant } from './types/common';

type Percentage = `${number}%`;

export type OmhMapViewRef = {
  getCameraCoordinate: OmhMapsCoreModuleFunctionWithoutViewRef<
    Spec['getCameraCoordinate']
  >;
  setCameraCoordinate: OmhMapsCoreModuleFunctionWithoutViewRef<
    Spec['setCameraCoordinate']
  >;
  getProviderName: OmhMapsCoreModuleFunctionWithoutViewRef<
    () => OmhMapProviderVariant
  >;
  takeSnapshot: (resultFormat: OmhSnapshotFormat) => Promise<string>;
};

enum MapErrors {
  MAP_NOT_IN_TREE_YET = 'OmhMap is not mounted in the RN view tree yet.',
}

type OmhCameraMoveStartedReason =
  | 'gesture'
  | 'apiAnimation'
  | 'developerAnimation'
  | 'unknown';

type OmhSnapshotFormat = 'png' | 'jpg' | 'base64';

/**
 * The OMH Map View properties.
 */
export type OmhMapViewProps = Omit<ViewProps, 'style'> & {
  /** The style to be applied to the map container */
  style?: Omit<ViewStyle, 'width' | 'height'> | null;
  width: number | Percentage;
  height: number | Percentage;
  zoomEnabled?: boolean;
  rotateEnabled?: boolean;
  onMapLoaded?: () => void;
  onCameraIdle?: () => void;
  onCameraMoveStarted?: (reason: OmhCameraMoveStartedReason) => void;
};

/**
 * The OMH Map View component. Actual implementation is picked based on the platform capabilities (GMS or non-GMS)
 * and availability of installed providers (`@omh/react-native-maps-plugin-*`).
 */
export const OmhMapView = forwardRef<OmhMapViewRef, OmhMapViewProps>(
  (
    {
      style,
      width,
      height,
      onMapLoaded,
      children,
      zoomEnabled,
      rotateEnabled,
      onCameraIdle,
      onCameraMoveStarted,
    },
    forwardedRef
  ) => {
    const [isMapReady, setIsMapReady] = useState(false);
    const [componentSize, setComponentSize] = useState({ width: 0, height: 0 });

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
          const notReadyPromiseHandler = () =>
            Promise.reject(new Error(MapErrors.MAP_NOT_IN_TREE_YET));

          const notReadyHandler = () => {
            throw new Error(MapErrors.MAP_NOT_IN_TREE_YET);
          };

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
            NativeOmhMapsCoreModule.getProviderName(
              nodeHandle
            ) as OmhMapProviderVariant,
          takeSnapshot: (format: OmhSnapshotFormat) =>
            NativeOmhMapsCoreModule.takeSnapshot(nodeHandle, format),
        };
      },
      [getViewRefHandle]
    );

    const handleMapReady = () => {
      setIsMapReady(true);
      console.log('Map is ready');
    };

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
          children,
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
          {
            ...style,
            // below: since the native child component does not impose proper size when in controlled size mode,
            // always provide fallback values that fill the available space by default
            width: width ?? '100%',
            height: height ?? '100%',
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

export default OmhMapView;
