import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

import Route, { RoutesDescriptions } from '../Routes';
import MapProviderPicker from '../components/MapProviderPicker';
import MenuListItem from '../components/MenuListItem';
import { MapProvider, OmhMapsModule } from '@omh/react-native-maps-core';

const menuRoutes: Route[] = [Route.plainMap, Route.cameraMap, Route.markerMap, Route.stylesMap];

const defaultMapProvider = OmhMapsModule.getDefaultMapProvider();

OmhMapsModule.initialize({
  gmsPath: defaultMapProvider.path,
  nonGmsPath: defaultMapProvider.path,
});

export const MenuScreen = () => {
  const theme = useTheme();

  const [_, setMapProvider] = React.useState(defaultMapProvider);

  const handleMapProviderChange = (newProvider: MapProvider) => {
    setMapProvider(newProvider);

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
        defaultProvider={defaultMapProvider}
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
