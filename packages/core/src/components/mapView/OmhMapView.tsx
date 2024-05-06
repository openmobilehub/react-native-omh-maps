import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import {
  NativeSyntheticEvent,
  PixelRatio,
  StyleSheet,
  View,
  ViewStyle,
  findNodeHandle,
} from 'react-native';
import { ViewProps } from 'react-native';

import NativeOmhMapsCoreModule, { Spec } from '../../NativeOmhMapsCoreModule';
import {
  OmhCoordinate,
  OmhEvent,
  OmhMapProviderVariant,
  Percentage,
} from '../../types/common';
import { OmhMapsCoreModuleFunctionWithoutViewRef } from '../../utils/typeHelpers';
import RNOmhMapsCoreViewNativeComponent from './RNOmhMapsCoreViewNativeComponent';

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
      mapStyle,
      onMapReady,
      myLocationEnabled,
      onMyLocationClicked,
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
            getCurrentLocation: notReadyPromiseHandler,
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
          getCurrentLocation: () =>
            NativeOmhMapsCoreModule.getCurrentLocation(),
        };
      },
      [getViewRefHandle]
    );

    const handleMapReady = useCallback(() => {
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
  getCurrentLocation: () => Promise<OmhCoordinate>;
};

enum MapErrors {
  MAP_NOT_IN_TREE_YET = 'OmhMap is not mounted in the RN view tree yet.',
}

export type OmhSnapshotFormat = 'png' | 'jpg' | 'base64';

/**
 * The OMH Map View properties.
 */
export type OmhMapViewProps = Omit<ViewProps, 'style'> & {
  /** The scale factor of the map. */
  scaleFactor?: number;
  /** The style to be applied to the map container */
  style?: Omit<ViewStyle, 'width' | 'height'> | null;
  /** The JSON map style */
  mapStyle?: string | object;
  width: number | Percentage;
  height: number | Percentage;
  /** If true, rotation is enabled on the map. */
  rotateEnabled?: boolean;
  /** If true, zoom is enabled on the map. */
  zoomEnabled?: boolean;
  /** If true, the user's location and the re-centering button is displayed on the map. */
  myLocationEnabled?: boolean;
  /** Internal map ready callback, invoked when the map view is ready, but the map is not loaded yet */
  onMapReady?: () => void;
  /** Callback invoked when the map is loaded */
  onMapLoaded?: () => void;
  /** Callback invoked when the map camera is idle */
  onCameraIdle?: () => void;
  /** Callback invoked when the location button was clicked on map*/
  onMyLocationClicked?: () => void;
  /** Callback invoked when the map camera starts to move */
  onCameraMoveStarted?: (reason: OmhCameraMoveStartedReason) => void;
  /**
   * Map entities to be shown inside the map.
   *
   * **Note:** only OMH Map entities are allowed. Non-map children will be ignored.
   */
  children?: React.ReactNode;
};

/**
 * Reason for the camera movement on the map.
 */
export type OmhCameraMoveStartedReason =
  | 'unknown'
  | 'gesture'
  | 'apiAnimation'
  | 'developerAnimation';

/**
 * Options for taking a snapshot of the map.
 */
export type OmhSnapshotOptions = {
  /** The format of the snapshot result. */
  result: 'file' | 'base64';
};

/**
 * The style of the map.
 */
export type OmhMapStyle = any;

/** Event triggered when the My Location button is pressed. */
export type MyLocationButtonPressEvent = OmhEvent<{}>;
/** Event triggered when the map has finished loading. */
export type MapLoadedEvent = OmhEvent<{}>;
/** Event triggered when the camera becomes idle after movement. */
export type CameraIdleEvent = OmhEvent<{}>;
/** Event triggered when the camera starts moving. */
export type CameraMoveStartedEvent = OmhEvent<{
  /** The reason for the camera movement. */
  reason: OmhCameraMoveStartedReason;
}>;

/**
 * Events for the OmhMapView component.
 */
export type OmhMapEvents = {
  /** Called when the map has finished loading. */
  onMapLoaded: (event: MapLoadedEvent) => void;
  /** Called when the My Location button is pressed. */
  onMyLocationButtonPress: (event: MyLocationButtonPressEvent) => void;
  /** Called when the camera becomes idle after movement. */
  onCameraIdle: (event: CameraIdleEvent) => void;
  /** Called when the camera starts moving. */
  onCameraMoveStarted: (event: CameraMoveStartedEvent) => void;
};

/**
 * Properties for the OmhMapView component.
 */
export type OmhMapViewComponentProps = ViewProps &
  OmhMapViewProps &
  OmhMapEvents;

/**
 * Imperative methods for the OmhMapView component.
 */
export type OmhMapMethods = {
  /** Takes a snapshot of the map with the given options. */
  takeSnapshot: (options: OmhSnapshotOptions) => Promise<string>;
  /** Returns the name of the map provider. */
  getProviderName: () => void;
  /** Returns the current camera position. */
  getCameraPosition: () => OmhCoordinate;
  /** Moves the camera to the given position and zoom level. */
  moveCamera: (position: OmhCoordinate, zoomLevel: number) => void;
  /** Returns whether the user's location is enabled on the map. */
  isMyLocationEnabled: () => boolean;
};

export default OmhMapView;
