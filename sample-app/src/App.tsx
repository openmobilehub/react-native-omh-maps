import * as React from 'react';
import { PaperProvider } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Route from './Routes';
import AppBarHeader from './components/AppBarHeader';
import { MapProviderChoiceContextProvider } from './context/MapProviderChoiceContext';
import useCreateAdaptiveTheme from './hooks/useCreateAdaptiveTheme';
import AboutScreen from './screens/AboutScreen';
import MarkerMapScreen from './screens/MarkerMapScreen';
import MenuScreen from './screens/MenuScreen';
import MultipleMapsScreen from './screens/MultipleMapsScreen';
import PlainMapScreen from './screens/PlainMapScreen';

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
              name={Route.markerMap}
              component={MarkerMapScreen}
              options={screenOptions}
            />

            <Stack.Screen
              name={Route.multipleMaps}
              component={MultipleMapsScreen}
              options={screenOptions}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </MapProviderChoiceContextProvider>
    </PaperProvider>
  );
}
