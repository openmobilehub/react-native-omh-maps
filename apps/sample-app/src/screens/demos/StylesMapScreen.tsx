import React from 'react';
import { Platform, ScrollView, View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';

import {
  OmhMapView,
  OmhMapViewProps,
  OmhMapViewRef,
} from '@openmobilehub/maps-core';

import { PanelRadioButtonItem } from '../../components/controls/PanelRadioButtonItem';
import { demoStyles } from '../../styles/demoStyles';

enum RadioButtonValue {
  None = 'None',
  Dark = 'Dark',
  Retro = 'Retro',
  Silver = 'Silver',
}

const GOOGLE_MAPS_STYLES = {
  [RadioButtonValue.None]: undefined,
  [RadioButtonValue.Dark]: require('../../assets/mapStyles/google_style_dark.json'),
  [RadioButtonValue.Retro]: require('../../assets/mapStyles/google_style_retro.json'),
  [RadioButtonValue.Silver]: require('../../assets/mapStyles/google_style_silver.json'),
};

const MAPBOX_STYLES = {
  [RadioButtonValue.None]: undefined,
  [RadioButtonValue.Dark]: require('../../assets/mapStyles/mapbox_style_dark.json'),
  [RadioButtonValue.Retro]: require('../../assets/mapStyles/mapbox_style_retro.json'),
  [RadioButtonValue.Silver]: require('../../assets/mapStyles/mapbox_style_silver.json'),
};

const SUPPORTED_MAP_PROVIDERS =
  Platform.OS === 'ios' ? ['Google'] : ['GoogleMaps', 'Mapbox'];

export const StylesMapScreen = () => {
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
      case 'Google':
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
