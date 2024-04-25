import React, { useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Checkbox, Subheading } from 'react-native-paper';

import {
  OmhMapView,
  OmhMapViewRef,
  OmhMarker,
} from '@omh/react-native-maps-core';

import useLogger from '../hooks/useLogger';
import { demoStyles } from '../styles/demoStyles';
import { Constants } from '../utils/Constants';

export const MarkerMapScreen = () => {
  const logger = useLogger('MarkerMapScreen');

  const [mountCustomizableMarker, setMountCustomizableMarker] = useState(true);

  const omhMapRef = useRef<OmhMapViewRef | null>(null);

  return (
    <View style={demoStyles.rootContainer}>
      <View style={demoStyles.mapContainer}>
        <OmhMapView
          ref={omhMapRef}
          onMapLoaded={() => {
            logger.log('OmhMapView has become loaded');

            omhMapRef.current?.setCameraCoordinate(
              Constants.Maps.GREENWICH_COORDINATE,
              15.0
            );
          }}
          width="100%"
          height="100%">
          {mountCustomizableMarker && (
            <OmhMarker position={Constants.Maps.GREENWICH_COORDINATE} />
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
