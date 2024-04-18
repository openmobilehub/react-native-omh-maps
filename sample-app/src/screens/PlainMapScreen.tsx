import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, MD2Colors } from 'react-native-paper';

import { OmhMapView } from '@omh/react-native-maps-core';
import Slider from '@react-native-community/slider';

export const PlainMapScreen = () => {
  const [width, setWidth] = useState(40);
  const [height, setHeight] = useState(40);

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
        />
      </View>

      <View style={styles.demoControlsContainer}>
        <Button>TEST</Button>
        <Slider
          minimumValue={0}
          maximumValue={100}
          // value={width}
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
          // value={height}
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