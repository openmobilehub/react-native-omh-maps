import React, { useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Subheading } from 'react-native-paper';

import { OmhMapView, OmhMapViewRef } from '@omh/react-native-maps-core';

import OmhMarker from '../../../packages/core/src/OmhMarker';
import useChosenMapProvider from '../hooks/useChosenMapProvider';
import useLogger from '../hooks/useLogger';
import { Constants } from '../utils/Constants';

export const MarkerMapScreen = () => {
  const logger = useLogger('MarkerMapScreen');
  const defaultMapProvider = useChosenMapProvider();

  const omhMapRef = useRef<OmhMapViewRef | null>(null);

  return (
    <View style={styles.rootContainer}>
      <View style={[styles.mapContainer]}>
        <OmhMapView
          ref={omhMapRef}
          onMapReady={() => {
            logger.log('OmhMapView has become ready');

            omhMapRef.current?.setCameraCoordinate(
              Constants.Maps.GREENWICH_COORDINATE,
              15.0
            );
          }}
          width="100%"
          height="100%"
          paths={{
            gmsPath: defaultMapProvider.path,
            nonGmsPath: defaultMapProvider.path,
          }}>
          <OmhMarker position={Constants.Maps.GREENWICH_COORDINATE} />
        </OmhMapView>
      </View>

      <View style={styles.demoControlsScrollViewContainer}>
        <ScrollView
          contentContainerStyle={styles.demoControlsScrollViewContentContainer}>
          <Subheading style={styles.centeredHeading}>Demo controls</Subheading>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    flex: 0.6,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  demoControlsScrollViewContainer: {
    flex: 0.4,
    overflow: 'hidden',
    marginTop: 10,
    width: '100%',
  },
  demoControlsScrollViewContentContainer: {
    paddingVertical: 25,
    paddingHorizontal: 10,
    width: '100%',
  },
  centeredHeading: {
    textAlign: 'center',
    fontSize: 22,
    marginBottom: 20,
  },
});

export default MarkerMapScreen;
