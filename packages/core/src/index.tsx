import {
  requireNativeComponent,
  UIManager,
  Platform,
  type ViewStyle,
} from 'react-native';

const LINKING_ERROR =
  `The package 'rn-omh-maps-core' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

type RnOmhMapsCoreProps = {
  color: string;
  style: ViewStyle;
};

const ComponentName = 'RnOmhMapsCoreView';

export const RnOmhMapsCoreView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<RnOmhMapsCoreProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };
