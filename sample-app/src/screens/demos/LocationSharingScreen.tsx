import React, { useRef, useState } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Platform,
} from 'react-native';
import {
  request,
  requestMultiple,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import { ActivityIndicator, FAB } from 'react-native-paper';
import shadow from '../../assets/img/marker_shadow.webp';
import pinMarker from '../../assets/img/marker_pin.png';
import useSnackbar from '../../hooks/useSnackbar';
import Route from '../../Routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
  OmhMapView,
  OmhMapViewRef,
  OmhMapsLocationModule,
} from '@openmobilehub/maps-core';

import useLogger from '../../hooks/useLogger';
import { demoStyles } from '../../styles/demoStyles';
import { RootStackParamList } from '../../App';
import { PanelCheckbox } from '../../components/controls/PanelCheckbox';

type Props = NativeStackScreenProps<RootStackParamList, Route.locationSharing>;

export const LocationSharingScreen = ({ navigation }: Props) => {
  const logger = useLogger('LocationSharingScreen');

  const markerMoveAnim = useRef(new Animated.Value(0)).current;

  const [locationEnabled, setLocationEnabled] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [lat, setLat] = useState(0.0);
  const [lng, setLng] = useState(0.0);

  const [isLoading, setIsLoading] = useState(true);

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
    navigation.navigate(Route.locationResult, { lat: lat, lng: lng });
  };

  const handleCameraMoveStarted = () => {
    moveMarkerUp();
  };

  const handleCameraIdle = async () => {
    moveMarkerDown();
    try {
      const currentLocation = await omhMapRef.current?.getCameraCoordinate();
      if (currentLocation != null) {
        setLng(currentLocation.longitude);
        setLat(currentLocation.latitude);
      }
    } catch (error) {
      logger.error('cannot find location' + error);
    }
  };

  const handleMapLoaded = () => {
    requestLocationPermission();
  };

  const showUserLocation = async () => {
    try {
      const currentLocation = await OmhMapsLocationModule.getCurrentLocation();
      omhMapRef.current?.setCameraCoordinate(currentLocation, 15.0);
      setLng(currentLocation.longitude);
      setLat(currentLocation.latitude);
      setIsLoading(false);
    } catch (error) {
      showSnackbar('Error getting location');
      logger.error('cannot find location ' + error);
    }
  };

  const requestLocationPermission = async () => {
    try {
      let permissionsGranted = false;

      if (Platform.OS === 'ios') {
        permissionsGranted =
          (await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)) ===
          RESULTS.GRANTED;
      } else {
        const statuses = await requestMultiple([
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        ]);
        const fineLocationAccessGranted =
          statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] ===
          RESULTS.GRANTED;
        const coarseLocationAccessGranted =
          statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] ===
          RESULTS.GRANTED;

        permissionsGranted =
          fineLocationAccessGranted && coarseLocationAccessGranted;
      }

      if (permissionsGranted) {
        setLocationEnabled(true);
        showUserLocation();
      } else {
        setIsLoading(false);
        showSnackbar('Location permission denied');
      }
    } catch (error) {
      setIsLoading(false);
      showSnackbar('Error requesting location permission');
      logger.error('there was an issue with requestin permissions ' + error);
    }
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
        />
        <FAB
          onPress={handleFabClicked}
          icon="check"
          size="medium"
          style={styles.fab}
        />
        <View style={styles.markerContainer}>
          <Image source={shadow} style={styles.shadow} testID="drop_pin" />
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
              <Text>Lat: {lat}</Text>
              <Text>Lng: {lng}</Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.bottomScrollContainer}>
        <PanelCheckbox
          label="My Location Enabled"
          value={locationEnabled}
          onValueChange={value => {
            setLocationEnabled(value);
            if (value) {
              showUserLocation();
            }
          }}
        />
      </View>
      <ActivityIndicator
        animating={isLoading}
        size={'large'}
        style={styles.activityIndicator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    paddingVertical: 16,
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
    padding: 16,
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
    ...Platform.select({
      ios: {
        top: 10,
      },
      android: {
        bottom: 10,
      },
    }),
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
    // backgroundColor: 'red',
    pointerEvents: 'box-none',
  },
  shadow: { position: 'absolute' },
  activityIndicator: {
    position: 'absolute',
  },
});
export default LocationSharingScreen;
