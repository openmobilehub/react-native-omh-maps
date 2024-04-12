import React, { useState } from 'react';
import {
  PixelRatio,
  StyleSheet,
  UIManager,
  View,
  ViewStyle,
  findNodeHandle,
} from 'react-native';

import { getNativeComponent } from '../utils/getNativeComponent';

/**
 * The native RN map view component.
 */
export const RNOmhMapViewManager = getNativeComponent<{
  style?: {
    width?: number;
    height?: number;
  };
}>('RNOmhMapViewManager');

/**
 * The root map view component. Actual implementation is picked based on the platform capabilities (GMS or non-GMS)
 * and availability of installed providers (`@omh/react-native-maps-plugin-*`).
 */
export type OmhMapViewProps = {
  /** The style to be applied to the map container */
  style: ViewStyle;
};

/**
 * OMH Maps Map View
 */
export const OmhMapView = ({ style }: OmhMapViewProps) => {
  const [componentSize, setComponentSize] = useState({ width: 0, height: 0 });

  const ref = React.useRef<typeof RNOmhMapViewManager | null>(null);

  // dispatch RNOmhMapViewManager.Commands.createFragment on the native RNOmhMapViewManager
  // component to create and mount a new fragment in the native view hierarchy
  React.useEffect(() => {
    const viewId = findNodeHandle(ref.current as any);

    UIManager.dispatchViewManagerCommand(
      viewId,
      (UIManager as any).RNOmhMapViewManager.Commands.createFragment.toString(),
      [viewId]
    );
  }, []);

  return (
    <View
      onLayout={event => {
        // since the Fragment size is measured manually in Android native code,
        // RN needs to calculate the actual size of the container (i.e., the available size)
        const { width, height } = event.nativeEvent.layout;

        setComponentSize({ width, height });
      }}
      style={[
        {
          ...style,
          // below: since the native child component does not impose proper size when in controlled size mode,
          // always provide fallback values that fill the available space by default
          width: style.width ?? '100%',
          height: style.height ?? '100%',
        },
        styles.mapContainer,
      ]}>
      <RNOmhMapViewManager
        style={{
          width: PixelRatio.getPixelSizeForLayoutSize(componentSize.width), // convert dpi to px
          height: PixelRatio.getPixelSizeForLayoutSize(componentSize.height), // convert dpi to px
        }}
        // @ts-ignore next line: missing typing for 'ref' prop on HostComponent
        ref={ref}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: { overflow: 'hidden' },
});
