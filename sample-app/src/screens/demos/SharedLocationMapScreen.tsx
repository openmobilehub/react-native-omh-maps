import React, { useCallback } from 'react';

import { OmhMapView, OmhMapViewRef, OmhMarker } from '@openmobilehub/maps-core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import Route from '../../Routes';

type Props = NativeStackScreenProps<
  RootStackParamList,
  Route.sharedLocationMap
>;

export const SharedLocationMapScreen = ({ route }: Props) => {
  const ref = React.useRef<OmhMapViewRef | null>(null);

  const focusOnSharedLocation = useCallback(() => {
    ref.current?.setCameraCoordinate(
      {
        latitude: Number(route.params.lat),
        longitude: Number(route.params.lng),
      },
      15
    );
  }, [route.params]);

  return (
    <OmhMapView ref={ref} onMapLoaded={focusOnSharedLocation}>
      <OmhMarker
        position={{
          latitude: Number(route.params.lat),
          longitude: Number(route.params.lng),
        }}
      />
    </OmhMapView>
  );
};
