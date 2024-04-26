import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import {
  OmhMapView,
  OmhMapViewProps,
  OmhMapViewRef,
} from '@omh/react-native-maps-core';

import { demoStyles } from '../styles/demoStyles';
import { RadioButton, Text, useTheme } from 'react-native-paper';
import { PanelRadioButtonItem } from '../components/PanelRadioButtonItem';

enum RadioButtonValue {
  None = 'None',
  Dark = 'Dark',
  Retro = 'Retro',
  Silver = 'Silver',
}

const GOOGLE_MAPS_STYLES = {
  [RadioButtonValue.None]: undefined,
  [RadioButtonValue.Dark]: require('../assets/mapStyles/google_style_dark.json'),
  [RadioButtonValue.Retro]: require('../assets/mapStyles/google_style_retro.json'),
  [RadioButtonValue.Silver]: require('../assets/mapStyles/google_style_silver.json'),
};

const MAPBOX_STYLES = {
  [RadioButtonValue.None]: undefined,
  [RadioButtonValue.Dark]: require('../assets/mapStyles/mapbox_style_dark.json'),
  [RadioButtonValue.Retro]: require('../assets/mapStyles/mapbox_style_retro.json'),
  [RadioButtonValue.Silver]: require('../assets/mapStyles/mapbox_style_silver.json'),
};

const SUPPORTED_MAP_PROVIDERS = ['GoogleMaps', 'Mapbox'];

export const StylesMapScreen = () => {
  const theme = useTheme();
  const mapViewRef = React.useRef<OmhMapViewRef | null>(null);
  
  const [mapProvider, setMapProvider] = React.useState<string | undefined>(
    undefined
  );
  const [mapStyle, setMapStyle] =
    React.useState<OmhMapViewProps['mapStyle']>(undefined);
  const [selectedStyle, setSelectedStyle] = React.useState<RadioButtonValue>(
    RadioButtonValue.None
  );

  const handleMapLoaded = () => {
    setMapProvider(mapViewRef.current?.getProviderName());
  };

  const handleValueChange = (_value: string) => {
    const value = _value as RadioButtonValue;
    setSelectedStyle(value);

    switch (mapProvider) {
      case 'GoogleMaps':
        setMapStyle(GOOGLE_MAPS_STYLES[value]);
        break;
      case 'Mapbox':
        setMapStyle(MAPBOX_STYLES[value]);
        break;
    }
  };

  const isRadioButtonDisabled =
    mapProvider === undefined || !SUPPORTED_MAP_PROVIDERS.includes(mapProvider);

  return (
    <View style={demoStyles.rootContainer}>
      <View style={demoStyles.mapContainer}>
        <OmhMapView
          ref={mapViewRef}
          onMapLoaded={handleMapLoaded}
          width={`100%`}
          height={`100%`}
          mapStyle={mapStyle}
        />
      </View>
      <View style={demoStyles.demoControlsScrollViewContainer}>
        <ScrollView
          contentContainerStyle={
            demoStyles.demoControlsScrollViewContentContainer
          }>
          <Text variant="titleLarge">Select a map style:</Text>
          <RadioButton.Group
            onValueChange={handleValueChange}
            value={selectedStyle}>
            {[
              RadioButtonValue.None,
              RadioButtonValue.Dark,
              RadioButtonValue.Retro,
              RadioButtonValue.Silver,
            ].map(value => (
              <PanelRadioButtonItem
                key={value}
                label={value}
                enabled={!isRadioButtonDisabled}
              />
            ))}
          </RadioButton.Group>
        </ScrollView>
      </View>
    </View>
  );
};

export default StylesMapScreen;
