import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

import { OmhMapProvider, OmhMapsModule } from '@omh/react-native-maps-core';

import Route, { RoutesDescriptions } from '../Routes';
import MapProviderPicker from '../components/MapProviderPicker';
import MenuListItem from '../components/ui/MenuListItem';
import useMapProviderChoiceContext from '../hooks/useMapProviderChoice';

const menuRoutes: Route[] = [
  Route.plainMap,
  Route.cameraMap,
  Route.locationSharing,
  Route.markerMap,
  Route.infoWindowMap,
  Route.polylineMap,
  Route.polygonMap,
  Route.stylesMap,
];

const defaultMapProvider = OmhMapsModule.getDefaultMapProvider();

OmhMapsModule.initialize({
  gmsProvider: defaultMapProvider,
  nonGmsProvider: defaultMapProvider,
  iosProvider: defaultMapProvider,
});

export const MenuScreen = () => {
  const theme = useTheme();
  const { changeMapProvider, mapProvider } = useMapProviderChoiceContext();

  const handleMapProviderChange = (newProvider: OmhMapProvider) => {
    changeMapProvider(newProvider);

    OmhMapsModule.initialize({
      gmsProvider: newProvider,
      nonGmsProvider: newProvider,
      iosProvider: newProvider,
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
