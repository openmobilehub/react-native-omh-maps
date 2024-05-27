import * as React from 'react';
import { PaperProvider } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Route from './Routes';
import AppBarHeader from './components/layout/AppBarHeader';
import { SnackbarProvider } from './components/snackbar/SnackbarProvider';
import { MapProviderChoiceContextProvider } from './context/MapProviderChoiceContext';
import useCreateAdaptiveTheme from './hooks/useCreateAdaptiveTheme';
import AboutScreen from './screens/AboutScreen';
import MenuScreen from './screens/MenuScreen';
import CameraMapScreen from './screens/demos/CameraMapScreen';
import { InfoWindowScreen } from './screens/demos/InfoWindowScreen';
import LocationResultScreen from './screens/demos/LocationResultScreen';
import LocationSharingScreen from './screens/demos/LocationSharingScreen';
import MarkerMapScreen from './screens/demos/MarkerMapScreen';
import PlainMapScreen from './screens/demos/PlainMapScreen';
import PolygonMapScreen from './screens/demos/PolygonMapScreen';
import PolylineMapScreen from './screens/demos/PolylineMapScreen';
import { SharedLocationMapScreen } from './screens/demos/SharedLocationMapScreen';
import StylesMapScreen from './screens/demos/StylesMapScreen';

export type RootStackParamList = {
  [Route.menu]: undefined;
  [Route.about]: undefined;
  [Route.plainMap]: undefined;
  [Route.cameraMap]: undefined;
  [Route.markerMap]: undefined;
  [Route.locationSharing]: undefined;
  [Route.polylineMap]: undefined;
  [Route.polygonMap]: undefined;
  [Route.stylesMap]: undefined;
  [Route.locationResult]: { lat: number; lng: number };
  [Route.sharedLocationMap]: { lat: number; lng: number };
  [Route.infoWindowMap]: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const theme = useCreateAdaptiveTheme();

  const screenOptions = React.useMemo(
    () => ({
      contentStyle: {
        backgroundColor: theme.colors.background,
      },
    }),
    [theme.colors.background]
  );

  return (
    <PaperProvider theme={theme}>
      <MapProviderChoiceContextProvider>
        <SnackbarProvider>
          <NavigationContainer
            linking={{
              prefixes: ['omhsampleapp://'],
              config: {
                initialRouteName: Route.menu,
                screens: {
                  [Route.sharedLocationMap]: 'maps',
                  [Route.menu]: '',
                },
              },
            }}>
            <Stack.Navigator
              screenOptions={{
                header: AppBarHeader,
              }}
              initialRouteName={Route.menu}>
              <Stack.Screen
                name={Route.menu}
                component={MenuScreen}
                options={screenOptions}
              />

              <Stack.Screen
                name={Route.about}
                component={AboutScreen}
                options={screenOptions}
              />

              <Stack.Screen
                name={Route.plainMap}
                component={PlainMapScreen}
                options={screenOptions}
              />

              <Stack.Screen
                name={Route.cameraMap}
                component={CameraMapScreen}
                options={screenOptions}
              />

              <Stack.Screen
                name={Route.markerMap}
                component={MarkerMapScreen}
                options={screenOptions}
              />

              <Stack.Screen
                name={Route.infoWindowMap}
                component={InfoWindowScreen}
                options={screenOptions}
              />

              <Stack.Screen
                name={Route.polylineMap}
                component={PolylineMapScreen}
                options={screenOptions}
              />

              <Stack.Screen
                name={Route.polygonMap}
                component={PolygonMapScreen}
                options={screenOptions}
              />

              <Stack.Screen
                name={Route.stylesMap}
                component={StylesMapScreen}
                options={screenOptions}
              />

              <Stack.Screen
                name={Route.locationSharing}
                component={LocationSharingScreen}
                options={screenOptions}
              />

              <Stack.Screen
                name={Route.locationResult}
                component={LocationResultScreen}
                options={screenOptions}
              />

              <Stack.Screen
                name={Route.sharedLocationMap}
                component={SharedLocationMapScreen}
                options={screenOptions}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SnackbarProvider>
      </MapProviderChoiceContextProvider>
    </PaperProvider>
  );
}
