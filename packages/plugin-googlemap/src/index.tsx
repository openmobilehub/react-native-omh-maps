import {
  requireNativeComponent,
  UIManager,
  Platform,
  type ViewStyle,
} from 'react-native';

const LINKING_ERROR =
  `The package '@omh/react-native-maps-plugin-googlemap' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

type ReactNativeMapsPluginGooglemapProps = {
  color: string;
  style: ViewStyle;
};

const ComponentName = 'ReactNativeMapsPluginGooglemapView';

export const ReactNativeMapsPluginGooglemapView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<ReactNativeMapsPluginGooglemapProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };
