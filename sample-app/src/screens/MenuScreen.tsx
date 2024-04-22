import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

import Route, { RoutesDescriptions } from '../Routes';
import MapProviderPicker from '../components/MapProviderPicker';
import MenuListItem from '../components/MenuListItem';
import useLogger from '../hooks/useLogger';
import useMapProviderChoiceContext from '../hooks/useMapProviderChoice';

const menuRoutes: Route[] = [
  Route.plainMap,
  Route.cameraMap,
  Route.markerMap,
  Route.multipleMaps,
];

export const MenuScreen = () => {
  const theme = useTheme();
  const logger = useLogger('MenuScreen');
  const { changeMapProvider, mapProvider: defaultMapProvider } =
    useMapProviderChoiceContext();

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: theme.colors.background,
      }}>
      <MapProviderPicker
        style={styles.mapProviderPicker}
        defaultProvider={defaultMapProvider}
        onChange={newProvider => {
          logger.log(
            `Map provider has been changed to ${newProvider.name} (${newProvider.path})`
          );

          changeMapProvider(newProvider);
        }}
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
