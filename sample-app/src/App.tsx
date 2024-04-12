import * as React from 'react';
import { PaperProvider } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Route from './Routes';
import AppBarHeader from './components/AppBarHeader';
import useCreateAdaptiveTheme from './hooks/useCreateAdaptiveTheme';
import AboutScreen from './screens/AboutScreen';
import MenuScreen from './screens/MenuScreen';
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
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            header: AppBarHeader,
          }}
          initialRouteName={Route.menuScreen}>
          <Stack.Screen
            name={Route.menuScreen}
            component={MenuScreen}
            options={screenOptions}
          />
          <Stack.Screen
            name={Route.aboutScreen}
            component={AboutScreen}
            options={screenOptions}
          />
          <Stack.Screen
            name={Route.plainMapScreen}
            component={PlainMapScreen}
            options={screenOptions}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
