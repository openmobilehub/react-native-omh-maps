import React, { useState } from 'react';
import {
  PixelRatio,
  StyleSheet,
  UIManager,
  View,
  ViewStyle,
  findNodeHandle,
} from 'react-native';

import {
  RNOmhMapViewManager,
  RNOmhMapViewManagerProps,
} from './RNOmhMapsCoreMapViewManager';

const createFragment = (viewId: number | null) =>
  UIManager.dispatchViewManagerCommand(
    viewId,
    (
      UIManager as any
    ).RNOmhMapsCoreMapViewManager.Commands.createFragment.toString(),
    [viewId]
  );

/**
 * The root map view component. Actual implementation is picked based on the platform capabilities (GMS or non-GMS)
 * and availability of installed providers (`@omh/react-native-maps-plugin-*`).
 */
export type ReactNativeOmhMapsCoreProps = RNOmhMapViewManagerProps & {
  /** The style to be applied to the map container */
  style: Pick<ViewStyle, 'margin'>;
};

export const ReactNativeOmhMapsCoreMapView = ({
  style,
}: ReactNativeOmhMapsCoreProps) => {
  const [componentSize, setComponentSize] = useState({ width: 0, height: 0 });

  const ref = React.useRef<typeof RNOmhMapViewManager | null>(null);

  React.useEffect(() => {
    const viewId = findNodeHandle(ref.current as any);
    createFragment(viewId);
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
          width: style.width ?? '100%',
          height: style.height ?? '100%',
        },
        styles.defaultMapContainer,
      ]}>
      <RNOmhMapViewManager
        style={{
          width: PixelRatio.getPixelSizeForLayoutSize(componentSize.width), // convert dpi to px
          height: PixelRatio.getPixelSizeForLayoutSize(componentSize.height), // convert dpi to px
        }}
        // @ts-ignore next line
        ref={ref}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  defaultMapContainer: { overflow: 'hidden' },
});
