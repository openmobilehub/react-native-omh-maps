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
import MarkerMapScreen from './screens/demos/MarkerMapScreen';
import PlainMapScreen from './screens/demos/PlainMapScreen';
import PolylineMapScreen from './screens/demos/PolylineMapScreen';

const Stack = createNativeStackNavigator();

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
          <NavigationContainer>
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
                name={Route.polylineMap}
                component={PolylineMapScreen}
                options={screenOptions}
              />

              {/* <Stack.Screen
              name={Route.multipleMaps}
              component={MultipleMapsScreen}
              options={screenOptions}
            /> */}
            </Stack.Navigator>
          </NavigationContainer>
        </SnackbarProvider>
      </MapProviderChoiceContextProvider>
    </PaperProvider>
  );
}
