/**
 * React Native OMH Maps OpenStreetMap Plugin
 * @module @omh/react-native-maps-plugin-openstreetmap
 */

import {
  requireNativeComponent,
  UIManager,
  Platform,
  type ViewStyle,
} from 'react-native';

const LINKING_ERROR =
  `The package '@omh/react-native-maps-plugin-openstreetmap' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

type ReactNativeMapsPluginOpenstreetmapProps = {
  color: string;
  style: ViewStyle;
};

const ComponentName = 'ReactNativeMapsPluginOpenstreetmapView';

export const ReactNativeMapsPluginOpenstreetmapView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<ReactNativeMapsPluginOpenstreetmapProps>(
        ComponentName
      )
    : () => {
        throw new Error(LINKING_ERROR);
      };
