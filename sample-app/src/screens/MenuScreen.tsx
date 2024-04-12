import React from 'react';
import { ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';

import Route, { RoutesDescriptions } from '../Routes';
import MenuListItem from '../components/MenuListItem';

const menuRoutes: Route[] = [Route.plainMapScreen];

export const MenuScreen = () => {
  const theme = useTheme();

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: theme.colors.background,
      }}>
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
