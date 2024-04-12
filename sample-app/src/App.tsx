import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { OmhMapView } from '@omh/react-native-maps-core';

export default function App() {
  return (
    <View style={styles.container}>
      <OmhMapView style={styles.mapView} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapView: {
    width: '100%',
    height: '100%',
  },
});
