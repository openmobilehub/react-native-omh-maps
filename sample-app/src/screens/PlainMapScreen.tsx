import _ from 'lodash';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { MD2Colors, Subheading, useTheme } from 'react-native-paper';

import { OmhMapView, OmhMapViewRef } from '@omh/react-native-maps-core';
import Slider from '@react-native-community/slider';

import { MapProvider } from '../../../packages/core/src/NativeOmhMapsCoreModule';
import ControlParagraph from '../components/ControlParagraph';
import MapProviderPicker from '../components/MapProviderPicker';
import useChosenMapProvider from '../hooks/useChosenMapProvider';
import useLogger from '../hooks/useLogger';
import { Constants } from '../utils/Constants';

export const PlainMapScreen = () => {
  const theme = useTheme();
  const logger = useLogger('PlainMapScreen');
  const defaultMapProvider = useChosenMapProvider();

  const [tintedColor, untintedColor] = useMemo(
    () => [theme.colors.primary, theme.colors.secondary],
    [theme.colors.primary, theme.colors.secondary]
  );

  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const [provider, setProvider] = useState<MapProvider>(defaultMapProvider);

  const omhMapRef = useRef<OmhMapViewRef | null>(null);

  const demoSizeModified = useMemo(
    () => width !== 100 || height !== 100,
    [width, height]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onWidthChange = useCallback(
    _.throttle(
      (value: number) => {
        logger.log(`Applying map width: ${value}%`);

        setWidth(value);
      },
      Constants.UI.SLIDER_THROTTLE_MS,
      { leading: false, trailing: true }
    ),
    [logger]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onHeightChange = useCallback(
    _.throttle(
      (value: number) => {
        logger.log(`Applying map height: ${value}%`);

        setHeight(value);
      },
      Constants.UI.SLIDER_THROTTLE_MS,
      { leading: false, trailing: true }
    ),
    [logger]
  );

  return (
    <View style={styles.rootContainer}>
      <View style={[styles.mapContainer]}>
        <OmhMapView
          ref={omhMapRef}
          onMapReady={() => {
            logger.log('OmhMapView has become ready');

            omhMapRef.current?.setCameraCoordinate(
              Constants.Maps.GREENWICH_COORDINATE,
              15.0
            );
          }}
          style={demoSizeModified ? styles.borderedView : null}
          width={`${width}%`}
          height={`${height}%`}
          paths={{
            gmsPath: provider.path,
            nonGmsPath: provider.path,
          }}
        />
      </View>

      <View style={styles.demoControlsScrollViewContainer}>
        <ScrollView
          contentContainerStyle={styles.demoControlsScrollViewContentContainer}>
          <Subheading style={styles.centeredHeading}>Demo controls</Subheading>

          <MapProviderPicker
            defaultProvider={defaultMapProvider}
            label="Live map provider override"
            onChange={newProvider => {
              logger.log(
                `Map provider has been changed to ${newProvider.name} (${newProvider.path})`
              );

              setProvider(newProvider);
            }}
          />

          <ControlParagraph centered>Map width: {width}%</ControlParagraph>

          <Slider
            // this is not a controlled component, value is just initial value - as per the docs
            value={100}
            step={1}
            minimumValue={0}
            maximumValue={100}
            onValueChange={onWidthChange}
            style={styles.slider}
            minimumTrackTintColor={tintedColor}
            maximumTrackTintColor={untintedColor}
          />

          <ControlParagraph centered>Map height: {height}%</ControlParagraph>

          <Slider
            // this is not a controlled component, value is just initial value - as per the docs
            value={100}
            step={1}
            minimumValue={0}
            maximumValue={100}
            onValueChange={onHeightChange}
            style={styles.slider}
            minimumTrackTintColor={tintedColor}
            maximumTrackTintColor={untintedColor}
          />
        </ScrollView>
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
    flex: 0.6,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  demoControlsScrollViewContainer: {
    flex: 0.4,
    overflow: 'hidden',
    marginTop: 10,
    width: '100%',
  },
  demoControlsScrollViewContentContainer: {
    paddingVertical: 25,
    paddingHorizontal: 10,
    width: '100%',
  },
  centeredHeading: {
    textAlign: 'center',
    fontSize: 22,
    marginBottom: 20,
  },
  slider: {
    width: '100%',
    height: 30,
    marginVertical: 10,
  },
  borderedView: {
    borderWidth: 3.5,
    borderStyle: 'dashed',
    borderColor: MD2Colors.grey500,
  },
});

export default PlainMapScreen;
