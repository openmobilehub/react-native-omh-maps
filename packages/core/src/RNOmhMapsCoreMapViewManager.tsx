/**
 * React Native OMH Maps Core Plugin
 * @module @omh/react-native-maps-core
 */

import {
  requireNativeComponent,
  UIManager,
  Platform,
  type ViewStyle,
} from 'react-native';

const LINKING_ERROR =
  `The package @omh/react-native-maps-core' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

export type RNOmhMapViewManagerProps = {
  style: Pick<ViewStyle, 'width' | 'height'>;
};

const ComponentName = 'RNOmhMapsCoreMapViewManager';

export const RNOmhMapViewManager =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<RNOmhMapViewManagerProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };
