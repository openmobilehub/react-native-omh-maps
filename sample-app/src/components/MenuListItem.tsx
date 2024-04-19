import React from 'react';
import { StyleSheet } from 'react-native';
import { List, useTheme } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';

import Route from '../Routes';

export type MenuListItemProps = {
  route: Route;
  title?: string;
  description?: string;
};

export function MenuListItem({ title, route, description }: MenuListItemProps) {
  const navigate = useNavigation();
  const theme = useTheme();

  return (
    <List.Item
      title={title ?? route}
      description={description}
      onPress={() => {
        navigate.navigate(
          // @ts-ignore next line
          route
        );
      }}
      style={[
        styles.listItem,
        theme.dark ? styles.borderDarkTheme : styles.borderLightTheme,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  listItem: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderStyle: 'solid',
  },
  borderLightTheme: {
    borderBottomColor: '#121212',
  },
  borderDarkTheme: {
    borderBottomColor: '#646464',
  },
});

export default MenuListItem;
