import React from 'react';
import { Appbar } from 'react-native-paper';

import { getHeaderTitle } from '@react-navigation/elements';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

import Route from '../Routes';

export function AppBarHeader({
  navigation,
  route,
  options,
  back,
}: NativeStackHeaderProps) {
  const title = getHeaderTitle(options, route.name);

  return (
    <Appbar.Header style={options.headerStyle}>
      <Appbar.BackAction disabled={!back} onPress={navigation.goBack} />

      <Appbar.Content title={title} style={styles.headerTitle} />

      {route.name !== Route.aboutScreen && (
        <Appbar.Action
          icon="information-outline"
          onPress={() => {
            navigation.push(Route.aboutScreen);
          }}
        />
      )}
    </Appbar.Header>
  );
}

const styles = {
  headerTitle: {
    marginLeft: 8,
  },
};

export default AppBarHeader;
