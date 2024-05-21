import React, { useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  OmhMapView,
  OmhMapViewRef,
  OmhMapsModule,
} from '@openmobilehub/maps-core';
import { useDeviceOrientation } from '@react-native-community/hooks';

import useLogger from '../../hooks/useLogger';
import { demoStyles } from '../../styles/demoStyles';
import { Constants } from '../../utils/Constants';

export const MultipleMapsScreen = () => {
  const logger = useLogger('MultipleMapsScreen');
  const availableProviders = useMemo(
    () => OmhMapsModule.getAvailableMapProviders(),
    []
  );
  const orientation = useDeviceOrientation();

  const omhMapRefs = useRef<{
    [providerPath: string]: OmhMapViewRef | null | undefined;
  }>({});

  return (
    <View
      style={[
        demoStyles.rootContainer,
        orientation === 'landscape'
          ? styles.landscapeContainer
          : styles.verticalContainer,
      ]}>
      {availableProviders.map(provider => (
        <View
          style={[
            demoStyles.mapContainer,
            {
              flex: 1 / availableProviders.length,
            },
          ]}
          key={provider.path}>
          <OmhMapView
            ref={ref => {
              omhMapRefs.current[provider.path] = ref;
            }}
            onMapReady={() => {
              logger.log("OmhMapView's OmhMap has become ready");

              omhMapRefs.current[provider.path]?.setCameraCoordinate(
                Constants.Maps.GREENWICH_COORDINATE,
                15.0
              );
            }}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  landscapeContainer: {
    flexDirection: 'row',
  },
  verticalContainer: {
    flexDirection: 'column',
  },
});

export default MultipleMapsScreen;
