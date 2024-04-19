import React from 'react';
import { ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';

import Route, { RoutesDescriptions } from '../Routes';
import MapProviderPicker from '../components/MapProviderPicker';
import MenuListItem from '../components/MenuListItem';
import useLogger from '../hooks/useLogger';
import useMapProviderChoiceContext from '../hooks/useMapProviderChoice';

const menuRoutes: Route[] = [Route.plainMapScreen];

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
        defaultProvider={defaultMapProvider}
        onChange={newProvider => {
          logger.log(
            `Map provider has been changed to ${newProvider.name} (${newProvider.path})`
          );

          changeMapProvider(newProvider);
        }}
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

export default MenuScreen;
