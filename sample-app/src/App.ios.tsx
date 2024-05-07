import React from 'react';

import { View } from 'react-native';
import { OmhMapView } from '@omh/react-native-maps-core';

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
      }}>
      <OmhMapView height={100} width={100} />
    </View>
  );
}
