import React, { useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Checkbox, Subheading } from 'react-native-paper';

import { OmhMapView, OmhMapViewRef } from '@omh/react-native-maps-core';

import OmhMarker from '../../../packages/core/src/OmhMarker';
import useLogger from '../hooks/useLogger';
import { demoStyles } from '../styles/demoStyles';
import { Constants } from '../utils/Constants';

export const MarkerMapScreen = () => {
  const logger = useLogger('MarkerMapScreen');
  // const defaultMapProvider = useChosenMapProvider();

  const [mountCustomizableMarker, setMountCustomizableMarker] = useState(true);

  const omhMapRef = useRef<OmhMapViewRef | null>(null);

  return (
    <View style={demoStyles.rootContainer}>
      <View style={demoStyles.mapContainer}>
        <OmhMapView
          ref={omhMapRef}
          onMapLoaded={() => {
            logger.log('OmhMapView has been loaded');
          }}
          onMapReady={() => {
            logger.log('OmhMapView has become ready');

            omhMapRef.current?.setCameraCoordinate(
              Constants.Maps.GREENWICH_COORDINATE,
              15.0
            );
          }}
          width="100%"
          height="100%"
          // paths={{
          //   gmsPath: defaultMapProvider.path,
          //   nonGmsPath: defaultMapProvider.path,
          // }}
        >
          {mountCustomizableMarker && (
            <>
              <OmhMarker position={Constants.Maps.GREENWICH_COORDINATE} />
              <OmhMarker position={Constants.Maps.EVEREST_COORDINATE} />
            </>
          )}
        </OmhMapView>
      </View>

      <View style={demoStyles.demoControlsScrollViewContainer}>
        <ScrollView
          contentContainerStyle={
            demoStyles.demoControlsScrollViewContentContainer
          }>
          <Subheading style={demoStyles.centeredHeading}>
            Demo controls
          </Subheading>

          <Checkbox.Item
            label="Mount customizable <OmhMarker/>"
            status={mountCustomizableMarker ? 'checked' : 'unchecked'}
            onPress={() => {
              setMountCustomizableMarker(!mountCustomizableMarker);
            }}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default MarkerMapScreen;
