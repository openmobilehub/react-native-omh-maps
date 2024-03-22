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

type RnOmhMapsCoreProps = {
  /** Test color property */
  color: string;
  /** Test style property */
  style: ViewStyle;
};

const ComponentName = 'RnOmhMapsCoreView';

/**
 * The root map view component. Actual implementation is picked based on the platform capabilities (GMS or non-GMS)
 * and availability of installed providers (`@omh/react-native-maps-plugin-*`).
 */
export const RnOmhMapsCoreView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<RnOmhMapsCoreProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };
