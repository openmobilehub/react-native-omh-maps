import React, { forwardRef, useMemo, useState } from 'react';
import {
  PixelRatio,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
  findNodeHandle,
} from 'react-native';

import NativeOmhMapsCoreModule, { Spec } from './NativeOmhMapsCoreModule';
import RNOmhMapsCoreViewNativeComponent, {
  NativeOmhMapViewProps,
} from './RNOmhMapsCoreViewNativeComponent';
import { OmhMapsCoreModuleFunctionWithoutViewRef } from './typeHelpers';

type Percentage = `${number}%`;

export type OmhMapViewRef = {
  getCameraCoordinate: OmhMapsCoreModuleFunctionWithoutViewRef<
    Spec['getCameraCoordinate']
  >;
  setCameraCoordinate: OmhMapsCoreModuleFunctionWithoutViewRef<
    Spec['setCameraCoordinate']
  >;
};

enum MapErrors {
  MAP_NOT_IN_TREE_YET = 'OmhMap is not mounted in the RN view tree yet.',
}

/**
 * The OMH Map View properties.
 */
export type OmhMapViewProps = Omit<ViewProps, 'style'> & {
  onMapReady?: () => void;
  /** The style to be applied to the map container */
  style: Omit<ViewStyle, 'width' | 'height'> | null;
  width: number | Percentage;
  height: number | Percentage;
  paths: NativeOmhMapViewProps['paths'];
};

/**
 * The OMH Map View component. Actual implementation is picked based on the platform capabilities (GMS or non-GMS)
 * and availability of installed providers (`@omh/react-native-maps-plugin-*`).
 */
export const OmhMapView = forwardRef<OmhMapViewRef, OmhMapViewProps>(
  (
    { style, width, height, paths, onMapReady = () => {}, children },
    forwardedRef
  ) => {
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

          return {
            getCameraCoordinate: notReadyPromiseHandler,
            setCameraCoordinate: notReadyPromiseHandler,
          };
        }

        return {
          getCameraCoordinate: () =>
            NativeOmhMapsCoreModule.getCameraCoordinate(nodeHandle),
          setCameraCoordinate: (...args) =>
            NativeOmhMapsCoreModule.setCameraCoordinate(nodeHandle, ...args),
        };
      },
      [getViewRefHandle]
    );

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
          style={{
            width: PixelRatio.getPixelSizeForLayoutSize(componentSize.width), // convert dpi to px
            height: PixelRatio.getPixelSizeForLayoutSize(componentSize.height), // convert dpi to px
          }}
          onMapReady={onMapReady}
          paths={paths}
          // @ts-ignore next line: missing typing for 'ref' prop on HostComponent
          ref={nativeComponentRef}>
          {children}
        </RNOmhMapsCoreViewNativeComponent>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  mapContainer: { overflow: 'hidden' },
});

export default OmhMapView;
