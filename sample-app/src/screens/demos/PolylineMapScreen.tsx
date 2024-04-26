import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Checkbox, Subheading } from 'react-native-paper';

import {
  OmhCoordinate,
  OmhMapView,
  OmhPolyline,
} from '@omh/react-native-maps-core';

import { demoStyles } from '../../styles/demoStyles';

const points: OmhCoordinate[] = [
  { latitude: 0.0, longitude: 0.0 },
  { latitude: 30.0, longitude: 10.0 },
  { latitude: 20.0, longitude: 20.0 },
  { latitude: 20.0, longitude: 20.0 },
  { latitude: 20.0, longitude: 30.0 },
  { latitude: 10.0, longitude: 30.0 },
  { latitude: -10.0, longitude: 40.0 },
  { latitude: 15.0, longitude: 60.0 },
];

export const PolylineMapScreen = () => {
  const [mountCustomizablePolyline, setMountCustomizablePolyline] =
    useState(true);

  return (
    <View style={demoStyles.rootContainer}>
      <View style={demoStyles.mapContainer}>
        <OmhMapView width="100%" height="100%">
          {mountCustomizablePolyline && <OmhPolyline points={points} />}
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
            label="Mount customizable <OmhPolyline/>"
            status={mountCustomizablePolyline ? 'checked' : 'unchecked'}
            onPress={() => {
              setMountCustomizablePolyline(!mountCustomizablePolyline);
            }}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default PolylineMapScreen;
