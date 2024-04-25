import React, { useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { MD2Colors, Modal } from 'react-native-paper';

import { OmhMapView, OmhMapViewRef } from '@omh/react-native-maps-core';

import { PanelCheckbox } from '../../components/controls/PanelCheckbox';
import { PanelButton } from '../../components/ui/PanelButton';
import useSnackbar from '../../hooks/useSnackbar';
import { demoStyles } from '../../styles/demoStyles';
import { Constants } from '../../utils/Constants';

export const CameraMapScreen = () => {
  // const mapProvider = useChosenMapProvider();
  const { showSnackbar } = useSnackbar();

  const [snapshotModalVisible, setSnapshotModalVisible] = useState(false);
  const [snapshotSource, setSnapshotSource] = useState<string | null>(null);
  const [zoomGesturesEnabled, setZoomGesturesEnabled] = useState(true);
  const [rotateGesturesEnabled, setRotateGesturesEnabled] = useState(true);

  const omhMapRef = useRef<OmhMapViewRef | null>(null);

  const handleShowCameraPositionButtonPress = async () => {
    const cameraPosition = await omhMapRef.current?.getCameraCoordinate();
    if (cameraPosition !== null) {
      showSnackbar(
        'Camera position coordinate: ' + JSON.stringify(cameraPosition, null, 2)
      );
    }
  };

  const handleMoveMapToEverestButtonPress = () => {
    omhMapRef.current?.setCameraCoordinate(
      Constants.Maps.EVEREST_COORDINATE,
      Constants.Maps.EVEREST_ZOOM_LEVEL
    );
  };

  const handleMoveMapToSaharaButtonPress = () => {
    omhMapRef.current?.setCameraCoordinate(
      Constants.Maps.SAHARA_COORDINATE,
      Constants.Maps.SAHARA_ZOOM_LEVEL
    );
  };

  const handleMakeSnapshotButtonPress = async () => {
    const result = await omhMapRef.current?.takeSnapshot('jpg');
    if (!result) {
      return;
    }
    console.log('Snapshot result:', result);
    setSnapshotSource(result);

    setSnapshotModalVisible(true);
  };

  const handleSnapshotModalDismiss = () => {
    setSnapshotModalVisible(false);
    setSnapshotSource(null);
  };

  const handleCameraIdle = () => {
    showSnackbar('Camera idle');
    console.log('camera idle');
  };

  const handleCameraMoveStarted = (reason: string) => {
    showSnackbar('Camera move started: ' + reason);
    console.log('camera move started', reason);
  };

  return (
    <>
      <View style={demoStyles.rootContainer}>
        <View style={demoStyles.mapContainer}>
          <OmhMapView
            ref={omhMapRef}
            zoomEnabled={zoomGesturesEnabled}
            rotateEnabled={rotateGesturesEnabled}
            onMapLoaded={() => {
              console.log("OmhMapView's OmhMap has been loaded");
              omhMapRef.current?.setCameraCoordinate(
                Constants.Maps.GREENWICH_COORDINATE,
                15.0
              );
            }}
            onCameraIdle={handleCameraIdle}
            onCameraMoveStarted={event => handleCameraMoveStarted(event)}
            width={`100%`}
            height={`100%`}
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
              onPress={handleMoveMapToEverestButtonPress}
              label="Move map to Everest"
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
