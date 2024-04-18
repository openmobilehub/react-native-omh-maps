import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, MD2Colors } from 'react-native-paper';

import { OmhMapView, OmhMapsModule } from '@omh/react-native-maps-core';
import Slider from '@react-native-community/slider';

import { MapProvider } from '../../../packages/core/src/NativeOmhMapsCoreModule';
import MapProviderPicker from '../components/MapProviderPicker';

export const PlainMapScreen = () => {
  const [width, setWidth] = useState(40);
  const [height, setHeight] = useState(40);
  const [provider, setProvider] = useState<MapProvider>(() =>
    OmhMapsModule.getDefaultMapProvider()
  );

  const demoSizeModified = useMemo(
    () => width !== 100 || height !== 100,
    [width, height]
  );

  return (
    <View style={styles.rootContainer}>
      <View style={[styles.mapContainer]}>
        <OmhMapView
          style={demoSizeModified ? styles.borderedView : null}
          width={`${width}%`}
          height={`${height}%`}
          paths={{
            gmsPath: provider.path,
            nonGmsPath: provider.path,
          }}
        />
      </View>

      <View style={styles.demoControlsContainer}>
        <MapProviderPicker
          onChange={newProvider => {
            setProvider(newProvider);
          }}
        />

        <Slider
          minimumValue={0}
          maximumValue={100}
          onValueChange={value => {
            setWidth(value);
          }}
          style={styles.slider}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />

        <Slider
          minimumValue={0}
          maximumValue={100}
          onValueChange={value => {
            setHeight(value);
          }}
          style={styles.slider}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    flex: 0.7,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  demoControlsContainer: {
    flex: 0.3,
    width: '100%',
    height: '100%',
  },
  slider: { width: '100%', height: 20 },
  borderedView: {
    borderWidth: 3.5,
    borderStyle: 'dashed',
    borderColor: MD2Colors.grey500,
  },
});

export default PlainMapScreen;
