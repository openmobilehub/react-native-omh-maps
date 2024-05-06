import { StyleSheet, View } from 'react-native';
import React from 'react';
import useLogger from '../../hooks/useLogger';
import { demoStyles } from '../../styles/demoStyles';
import { RootStackParamList } from '../../App';
import { Button, Text } from 'react-native-paper';
import Route from '../../Routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Share from 'react-native-share';

type Props = NativeStackScreenProps<RootStackParamList, Route.locationResult>;

export const LocationResultScreen = ({ route }: Props) => {
  const logger = useLogger('LocationResultScreen');

  const shareUrlWithMessage = async () => {
    const shareOptions = {
      title: 'Sharing link',
      url: `https://com.openmobilehub.android.maps.sample/maps?lat=${route.params.lat}&lng=${route.params.lng}`,
    };

    try {
      await Share.open(shareOptions);
    } catch (error) {
      logger.log(error);
    }
  };

  return (
    <View style={demoStyles.rootContainer}>
      <View style={styles.container}>
        <Text>
          lat/lng: ({route.params.lat},{route.params.lng})
        </Text>
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => {
            shareUrlWithMessage();
          }}>
          Share location
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
    borderRadius: 4,
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LocationResultScreen;
