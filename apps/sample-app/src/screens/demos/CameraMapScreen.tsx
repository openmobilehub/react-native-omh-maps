import React, { useRef, useState } from 'react';
import { Image, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { MD2Colors, Modal } from 'react-native-paper';

import {
  OmhCameraMoveStartedReason,
  OmhMapView,
  OmhMapViewRef,
} from '@omh/react-native-maps-core';

import { PanelButton } from '../../components/controls/PanelButton';
import useSnackbar from '../../hooks/useSnackbar';
import { demoStyles } from '../../styles/demoStyles';
import { Constants } from '../../utils/Constants';
import { isFeatureSupported } from '../../utils/SupportUtils';
import { PanelCheckbox } from '../../components/controls/PanelCheckbox';

const getSupportedFeatures = (omhMapRef: OmhMapViewRef | null) => {
  const mapProvider = omhMapRef?.getProviderName();

  if (Platform.OS === 'ios') {
    return {
      zoom: true,
      rotate: true,
      showCameraPosition: true,
      moveCamera: true,
      makeSnapshot: true,
    };
  }

  return {
    zoom: isFeatureSupported(mapProvider, '*'),
    rotate: isFeatureSupported(mapProvider, [
      'GoogleMaps',
      'OpenStreetMap',
      'Mapbox',
    ]),
    showCameraPosition: isFeatureSupported(mapProvider, '*'),
    moveCamera: isFeatureSupported(mapProvider, '*'),
    makeSnapshot: isFeatureSupported(mapProvider, ['GoogleMaps', 'Mapbox']),
  };
};

export const CameraMapScreen = () => {
  const omhMapRef = useRef<OmhMapViewRef | null>(null);
  const { showSnackbar } = useSnackbar();

  const [snapshotModalVisible, setSnapshotModalVisible] = useState(false);
  const [snapshotSource, setSnapshotSource] = useState<string | null>(null);
  const [zoomGesturesEnabled, setZoomGesturesEnabled] = useState(true);
  const [rotateGesturesEnabled, setRotateGesturesEnabled] = useState(true);

  const [supportedFeatures, setSupportedFeatures] = useState<
    ReturnType<typeof getSupportedFeatures>
  >(() => getSupportedFeatures(omhMapRef.current));

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
    setSnapshotSource(result);

    setSnapshotModalVisible(true);
  };

  const handleSnapshotModalDismiss = () => {
    setSnapshotModalVisible(false);
    setSnapshotSource(null);
  };

  const handleCameraIdle = () => {
    showSnackbar('Camera idle');
  };

  const handleCameraMoveStarted = (reason: OmhCameraMoveStartedReason) => {
    let reasonCopy = 'Unknown Action';

    switch (reason) {
      case 'apiAnimation':
        reasonCopy = 'API Animation';
        break;
      case 'developerAnimation':
        reasonCopy = 'Developer Animation';
        break;
      case 'gesture':
        reasonCopy = 'Gesture';
        break;
    }

    showSnackbar(`Camera move started by ${reasonCopy}`);
  };

  const handleMapLoaded = () => {
    setSupportedFeatures(getSupportedFeatures(omhMapRef.current));

    omhMapRef.current?.setCameraCoordinate(
      Constants.Maps.GREENWICH_COORDINATE,
      15.0
    );
  };

  return (
    <>
      <View style={demoStyles.rootContainer}>
        <View style={demoStyles.mapContainer}>
          <OmhMapView
            ref={omhMapRef}
            zoomEnabled={zoomGesturesEnabled}
            rotateEnabled={rotateGesturesEnabled}
            onMapLoaded={handleMapLoaded}
            onCameraIdle={handleCameraIdle}
            onCameraMoveStarted={handleCameraMoveStarted}
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
              enabled={supportedFeatures.zoom}
            />
            <PanelCheckbox
              value={rotateGesturesEnabled}
              onValueChange={setRotateGesturesEnabled}
              label="Rotate Gestures"
              enabled={supportedFeatures.rotate}
            />
            <PanelButton
              onPress={handleShowCameraPositionButtonPress}
              label="Show camera position coordinate"
              enabled={supportedFeatures.showCameraPosition}
            />
            <PanelButton
              onPress={handleMoveMapToEverestButtonPress}
              label="Move map to Everest"
              enabled={supportedFeatures.moveCamera}
            />
            <PanelButton
              onPress={handleMoveMapToSaharaButtonPress}
              label="Move map to Sahara"
              enabled={supportedFeatures.moveCamera}
            />
            <PanelButton
              onPress={handleMakeSnapshotButtonPress}
              label="Make snapshot"
              enabled={supportedFeatures.makeSnapshot}
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
