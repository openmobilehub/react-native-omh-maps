import React from 'react';
import { StyleSheet } from 'react-native';
import { List } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';

import Route from '../Routes';

export type MenuListItemProps = {
  route: Route;
  title?: string;
  description?: string;
};

export function MenuListItem({ title, route, description }: MenuListItemProps) {
  const navigate = useNavigation();

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
      style={styles.listItem}
    />
  );
}

const styles = StyleSheet.create({
  listItem: {
    paddingVertical: 10,
  },
});

export default MenuListItem;
