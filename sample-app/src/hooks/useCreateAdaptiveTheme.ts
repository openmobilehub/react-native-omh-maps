import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

export function useCreateAdaptiveTheme() {
  const isDark = useColorScheme() === 'dark';

  return isDark ? MD3DarkTheme : MD3LightTheme;
}

export default useCreateAdaptiveTheme;
