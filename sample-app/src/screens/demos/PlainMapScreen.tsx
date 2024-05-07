import _ from 'lodash';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { MD2Colors, Subheading } from 'react-native-paper';

import { OmhMapView, OmhMapViewRef } from '@omh/react-native-maps-core';

import { Slider } from '../../components/controls/Slider';
import useLogger from '../../hooks/useLogger';
import { demoStyles } from '../../styles/demoStyles';
import { Constants } from '../../utils/Constants';

export const PlainMapScreen = () => {
  const logger = useLogger('PlainMapScreen');

  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);

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
    <View style={demoStyles.rootContainer}>
      <View style={demoStyles.mapContainer}>
        <OmhMapView
          ref={omhMapRef}
          onMapLoaded={() => {
            logger.log('OmhMapView has been loaded');
          }}
          onMapReady={() => {
            logger.log("OmhMapView's OmhMap has become ready");

            omhMapRef.current?.setCameraCoordinate(
              Constants.Maps.GREENWICH_COORDINATE,
              15.0
            );
          }}
          style={[
            { height: `${height}%`, width: `${width}%` },
            demoSizeModified ? styles.borderedView : null,
          ]}
        />
      </View>

      <View style={demoStyles.demoControlsScrollViewContainer}>
        <ScrollView
          contentContainerStyle={
            demoStyles.demoControlsScrollViewContentContainer
          }>
          <Subheading style={demoStyles.centeredHeading}>
            Demo controls
          </Subheading>

          {/* <MapProviderPicker
            defaultProvider={defaultMapProvider}
            label="Live map provider override"
            onChange={newProvider => {
              logger.log(
                `Map provider has been changed to ${newProvider.name} (${newProvider.path})`
              );

              OmhMapsModule.initialize({
                gmsPath: newProvider.path,
                nonGmsPath: newProvider.path,
              });
            }}
          /> */}

          <Slider
            label={`Map width: ${width}%`}
            onChange={onWidthChange}
            defaultValue={100}
            step={1}
            minimumValue={0}
            maximumValue={100}
          />

          <Slider
            label={`Map width: ${height}%`}
            onChange={onHeightChange}
            defaultValue={100}
            step={1}
            minimumValue={0}
            maximumValue={100}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  borderedView: {
    borderWidth: 3.5,
    borderStyle: 'dashed',
    borderColor: MD2Colors.grey500,
  },
});

export default PlainMapScreen;
