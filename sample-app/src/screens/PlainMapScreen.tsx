import React from 'react';
import { StyleSheet } from 'react-native';

import { OmhMapView } from '@omh/react-native-maps-core';

export const PlainMapScreen = () => <OmhMapView style={styles.mapView} />;

const styles = StyleSheet.create({
  mapView: {
    width: '50%',
    height: '50%',
  },
});

export default PlainMapScreen;
