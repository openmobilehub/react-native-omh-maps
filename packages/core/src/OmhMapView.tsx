import React, { useState } from 'react';
import { PixelRatio, StyleSheet, View, ViewStyle } from 'react-native';

import RNOmhMapsCoreViewNativeComponent from './RNOmhMapsCoreViewNativeComponent';

type Percentage = `${number}%`;

/**
 * The root map view component. Actual implementation is picked based on the platform capabilities (GMS or non-GMS)
 * and availability of installed providers (`@omh/react-native-maps-plugin-*`).
 */
export type OmhMapViewProps = {
  /** The style to be applied to the map container */
  style: Omit<ViewStyle, 'width' | 'height'> | null;
  width: number | Percentage;
  height: number | Percentage;
};

/**
 * OMH Maps Map View
 */
export const OmhMapView = ({ style, width, height }: OmhMapViewProps) => {
  const [componentSize, setComponentSize] = useState({ width: 0, height: 0 });

  const ref = React.useRef<typeof RNOmhMapsCoreViewNativeComponent | null>(
    null
  );

  return (
    <View
      onLayout={event => {
        // since the Fragment size is measured manually in Android native code,
        // RN needs to calculate the actual size of the container (i.e., the available size)
        const { width, height } = event.nativeEvent.layout;

        setComponentSize({ width, height });
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
        // @ts-ignore next line: missing typing for 'ref' prop on HostComponent
        ref={ref}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: { overflow: 'hidden' },
});

export default OmhMapView;
