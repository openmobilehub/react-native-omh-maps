import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import RNOmhMapsInfoWindowWrapperNativeComponent from './RNOmhMapsInfoWindowNativeComponent';

export type OmhInfoWindowProps = {
  children: React.ReactNode;
};

/**
 * The OMH Map Info Window Contents component, which - if present - needs to be rendered inside an
 * `OmhMarker` and wrap all the custom views to be shown as the custom contents of the info window.
 *
 * **Note**: this component needs to go in pair with the `infoWindowViewMode` property of the `OmhMapView`,
 * otherwise it will be ignored and - if used - needs to be rendered inside **all** `OmhMarker`s of that map.
 */
export const OmhInfoWindowContents = ({ children }: OmhInfoWindowProps) => {
  const [childrenSize, setChildrenSize] = useState({ width: 1, height: 1 });

  return (
    <RNOmhMapsInfoWindowWrapperNativeComponent
      childrenSize={childrenSize}
      style={styles.root}
      onLayout={({
        nativeEvent: {
          layout: { width, height },
        },
      }) => {
        // sometimes it happens that the measured size is a Double, while Android wants integers
        setChildrenSize({
          width: Math.ceil(width),
          height: Math.ceil(height),
        });
      }}>
      {children}
    </RNOmhMapsInfoWindowWrapperNativeComponent>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'lightgreen',
    alignSelf: 'baseline',
  },
});
