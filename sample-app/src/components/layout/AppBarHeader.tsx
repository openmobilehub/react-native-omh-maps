import React from 'react';
import { Appbar, useTheme } from 'react-native-paper';

import { getHeaderTitle } from '@react-navigation/elements';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

import Route from '../../Routes';

export function AppBarHeader({
  navigation,
  route,
  options,
  back,
}: NativeStackHeaderProps) {
  const theme = useTheme();
  const title = getHeaderTitle(options, route.name);

  return (
    <Appbar.Header style={[options.headerStyle, styles.header]}>
      <Appbar.BackAction disabled={!back} onPress={navigation.goBack} />

      <Appbar.Content title={title} style={styles.headerTitle} />

      {route.name !== Route.about && (
        <Appbar.Action
          icon="information-outline"
          onPress={() => {
            navigation.push(Route.about);
          }}
          color={theme.colors.onSurface}
        />
      )}
    </Appbar.Header>
  );
}

const styles = {
  header: {
    backgroundColor: '#BB86FC',
  },
  headerTitle: {
    marginLeft: 8,
  },
};

export default AppBarHeader;
