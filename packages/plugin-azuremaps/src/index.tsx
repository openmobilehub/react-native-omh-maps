/**
 * React Native OMH Maps Azure Maps Plugin
 * @module @omh/react-native-maps-plugin-azuremaps
 */

import {
  requireNativeComponent,
  UIManager,
  Platform,
  type ViewStyle,
} from 'react-native';

const LINKING_ERROR =
  `The package '@omh/react-native-maps-plugin-azuremaps' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

type ReactNativeMapsPluginAzuremapsProps = {
  color: string;
  style: ViewStyle;
};

const ComponentName = 'ReactNativeMapsPluginAzuremapsView';

export const ReactNativeMapsPluginAzuremapsView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<ReactNativeMapsPluginAzuremapsProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };
