import React from 'react';
import { StyleSheet } from 'react-native';

import { OmhMapView } from '@omh/react-native-maps-core';

export const PlainMapScreen = () => <OmhMapView style={styles.mapView} />;

const styles = StyleSheet.create({
  mapView: {
    width: '100%',
    height: '100%',
  },
});

export default PlainMapScreen;
