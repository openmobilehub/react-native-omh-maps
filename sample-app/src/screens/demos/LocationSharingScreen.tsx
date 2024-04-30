import React, { useRef, useState } from 'react';
import {
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
import {
  requestMultiple,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import { Checkbox, FAB } from 'react-native-paper';
import shadow from '../../assets/img/marker_shadow.webp';
import pinMarker from '../../assets/img/marker_pin.png';
import useSnackbar from '../../hooks/useSnackbar';
import Route from '../../Routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { OmhMapView, OmhMapViewRef } from '@omh/react-native-maps-core';

import useLogger from '../../hooks/useLogger';
import { demoStyles } from '../../styles/demoStyles';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, Route.locationSharing>;

export const LocationSharingScreen = ({ navigation }: Props) => {
  const logger = useLogger('LocationSharingScreen');

  const markerMoveAnim = useRef(new Animated.Value(0)).current;

  const [locationEnabled, setLocationEnabled] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [latText, setLatText] = useState(0.0);
  const [lngText, setLngText] = useState(0.0);

  const omhMapRef = useRef<OmhMapViewRef | null>(null);
  const { showSnackbar } = useSnackbar();

  const moveMarkerUp = () => {
    Animated.timing(markerMoveAnim, {
      toValue: -40,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const moveMarkerDown = () => {
    Animated.timing(markerMoveAnim, {
      toValue: -20,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleLocationClicked = () => {
    showSnackbar('Centering location');
  };

  const handleFabClicked = () => {
    navigation.navigate(Route.locationResult, { lat: latText, lng: lngText });
  };

  const handleCameraMoveStarted = (_: string) => {
    moveMarkerUp();
  };

  const handleCameraIdle = () => {
    moveMarkerDown();
    var location = omhMapRef.current?.getCameraCoordinate();
    location
      ?.then(currentLocation => {
        if (currentLocation != null) {
          setLngText(currentLocation.longitude);
          setLatText(currentLocation.latitude);
        }
      })
      .catch(error => {
        logger.error('cannot find location' + error);
      });
  };

  const handleMapLoaded = () => {
    enableLocation();
  };

  const enableLocation = () => {
    requestLocationPermission();
  };

  const showUserLocation = () => {
    var location = omhMapRef.current?.getCurrentLocation();
    location
      ?.then(currentLocation => {
        omhMapRef.current?.setCameraCoordinate(currentLocation, 15.0);
        setLngText(currentLocation.longitude);
        setLatText(currentLocation.latitude);
      })
      .catch(error => {
        logger.error('cannot find location' + error);
      });
  };

  const requestLocationPermission = async () => {
    requestMultiple([
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    ]).then(statuses => {
      var fineLocationAccessGranted =
        statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.GRANTED;
      var coarseLocationAccessGranted =
        statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] ===
        RESULTS.GRANTED;

      if (fineLocationAccessGranted && coarseLocationAccessGranted) {
        setLocationEnabled(!locationEnabled);
        showUserLocation();
      }
    });
  };

  return (
    <View style={demoStyles.rootContainer}>
      <View style={styles.mapContainer}>
        <OmhMapView
          ref={omhMapRef}
          zoomEnabled={true}
          rotateEnabled={false}
          onMapLoaded={handleMapLoaded}
          onCameraIdle={handleCameraIdle}
          onCameraMoveStarted={handleCameraMoveStarted}
          myLocationEnabled={locationEnabled}
          onMyLocationClicked={handleLocationClicked}
          width={`100%`}
          height={`100%`}
        />
        <FAB
          onPress={handleFabClicked}
          icon="check"
          size="medium"
          style={styles.fab}
        />
        <View style={styles.markerContainer}>
          <Image source={shadow} style={styles.shadow} />
          <TouchableOpacity
            activeOpacity={70}
            onPress={() => {
              setTooltipVisible(!tooltipVisible);
            }}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              position: 'absolute',
              transform: [{ translateY: markerMoveAnim }],
            }}>
            <Image source={pinMarker} />
          </TouchableOpacity>
          {tooltipVisible && (
            <View style={styles.tooltip}>
              <Text>Lat: {latText}</Text>
              <Text>Lng: {lngText}</Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.bottomScrollContainer}>
        <ScrollView contentContainerStyle={styles.bottomContainer}>
          <Checkbox.Item
            label="My Location Enabled"
            status={locationEnabled ? 'checked' : 'unchecked'}
            onPress={() => {
              if (locationEnabled) {
                setLocationEnabled(false);
              } else {
                enableLocation();
              }
            }}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    paddingVertical: 8,
    paddingTop: 7,
    paddingHorizontal: 8,
    width: '100%',
  },
  tooltip: {
    backgroundColor: 'white',
    padding: 10,
    position: 'absolute',
    transform: [{ translateY: -75 }],
  },
  bottomScrollContainer: {
    flex: 0.1,
    overflow: 'hidden',
    width: '100%',
  },
  mapContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  markerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: { position: 'absolute' },
});
export default LocationSharingScreen;
