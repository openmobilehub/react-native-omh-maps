import React, { useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { MD2Colors, Modal } from 'react-native-paper';

import { OmhMapView, OmhMapViewRef } from '@omh/react-native-maps-core';

import useChosenMapProvider from '../hooks/useChosenMapProvider';
import useLogger from '../hooks/useLogger';
import { demoStyles } from '../styles/demoStyles';
import { Constants } from '../utils/Constants';
import { PanelCheckbox } from '../components/PanelCheckbox';
import { PanelButton } from '../components/PanelButton';

export const CameraMapScreen = () => {
  const logger = useLogger('CameraMapScreen');

  const mapProvider = useChosenMapProvider();

  const [snapshotModalVisible, setSnapshotModalVisible] = useState(false);
  const [snapshotSource, setSnapshotSource] = useState<string | null>(null);
  const [zoomGesturesEnabled, setZoomGesturesEnabled] = useState(true);
  const [rotateGesturesEnabled, setRotateGesturesEnabled] = useState(true);

  const omhMapRef = useRef<OmhMapViewRef | null>(null);

  const handleShowCameraPositionButtonPress = () => {
    console.log('show camera position');
  };

  const handleMoveMapToEventButtonPress = () => {
    console.log('move map to event');
  };

  const handleMoveMapToSaharaButtonPress = () => {
    console.log('move map to sahara');
  };

  const handleMakeSnapshotButtonPress = () => {
    setSnapshotModalVisible(true);
    setSnapshotSource('https://reactnative.dev/img/tiny_logo.png');
    console.log('make snapshot');
  };

  const handleSnapshotModalDismiss = () => {
    setSnapshotModalVisible(false);
    setSnapshotSource(null);
  };

  return (
    <>
      <View style={demoStyles.rootContainer}>
        <View style={demoStyles.mapContainer}>
          <OmhMapView
            ref={omhMapRef}
            onMapReady={() => {
              logger.log('OmhMapView has become ready');

              omhMapRef.current?.setCameraCoordinate(
                Constants.Maps.GREENWICH_COORDINATE,
                15.0
              );
            }}
            width={`100%`}
            height={`100%`}
            paths={{
              gmsPath: mapProvider.path,
              nonGmsPath: mapProvider.path,
            }}
          />
        </View>
        <View style={demoStyles.demoControlsScrollViewContainer}>
          <ScrollView
            contentContainerStyle={
              demoStyles.demoControlsScrollViewContentContainer
            }>
            <PanelCheckbox
              value={zoomGesturesEnabled}
              onValueChange={setZoomGesturesEnabled}
              label="Zoom Gestures"
            />
            <PanelCheckbox
              value={rotateGesturesEnabled}
              onValueChange={setRotateGesturesEnabled}
              label="Rotate Gestures"
            />
            <PanelButton
              onPress={handleShowCameraPositionButtonPress}
              label="Show camera position coordinate"
            />
            <PanelButton
              onPress={handleMoveMapToEventButtonPress}
              label="Move map to event"
            />
            <PanelButton
              onPress={handleMoveMapToSaharaButtonPress}
              label="Move map to Sahara"
            />
            <PanelButton
              onPress={handleMakeSnapshotButtonPress}
              label="Make snapshot"
            />
          </ScrollView>
        </View>
      </View>
      <Modal
        visible={snapshotModalVisible}
        onDismiss={handleSnapshotModalDismiss}
        contentContainerStyle={styles.modalContent}>
        {snapshotSource && (
          <Image
            source={{ uri: snapshotSource }}
            style={styles.snapshotImage}
          />
        )}
        <PanelButton onPress={handleSnapshotModalDismiss} label="Close" />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
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
  modalContent: {
    backgroundColor: 'white',
    height: '60%',
    width: '90%',
    alignSelf: 'center',
    padding: 16,
  },
  snapshotImage: {
    width: '100%',
    flex: 1,
  },
});

export default CameraMapScreen;
