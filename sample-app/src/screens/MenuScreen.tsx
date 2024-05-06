import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

import { MapProvider, OmhMapsModule } from '@omh/react-native-maps-core';

import Route, { RoutesDescriptions } from '../Routes';
import MapProviderPicker from '../components/MapProviderPicker';
import MenuListItem from '../components/ui/MenuListItem';
import useMapProviderChoiceContext from '../hooks/useMapProviderChoice';

const menuRoutes: Route[] = [
  Route.plainMap,
  Route.cameraMap,
  Route.markerMap,
  Route.locationSharing,
  // Route.multipleMaps,
  Route.stylesMap,
];

const defaultMapProvider = OmhMapsModule.getDefaultMapProvider();

OmhMapsModule.initialize({
  gmsPath: defaultMapProvider.path,
  nonGmsPath: defaultMapProvider.path,
});

export const MenuScreen = () => {
  const theme = useTheme();
  const { changeMapProvider, mapProvider } = useMapProviderChoiceContext();

  const handleMapProviderChange = (newProvider: MapProvider) => {
    changeMapProvider(newProvider);

    OmhMapsModule.initialize({
      gmsPath: newProvider.path,
      nonGmsPath: newProvider.path,
    });
  };

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: theme.colors.background,
      }}>
      <MapProviderPicker
        style={styles.mapProviderPicker}
        defaultProvider={mapProvider}
        onChange={handleMapProviderChange}
        centeredLabel={false}
      />

      {menuRoutes.map((route, index) => (
        <MenuListItem
          key={index}
          route={route}
          title={route}
          description={RoutesDescriptions[route]}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mapProviderPicker: {
    marginTop: 20,
  },
});

export default MenuScreen;
