import { Platform, UIManager, requireNativeComponent } from 'react-native';

/**
 * Gets a native component from RN's UIManager.
 * @param ComponentName the name under which the native component is registered in UIManager
 * @throws an `Error` if the native component is not registered, which most likely means the package is not linked
 * @returns the native component if it exists, otherwise throws an error
 */
export function getNativeComponent<RNComponentProps>(ComponentName: string) {
  if (UIManager.getViewManagerConfig(ComponentName) != null) {
    return requireNativeComponent<RNComponentProps>(ComponentName);
  } else {
    return () => {
      const LINKING_ERROR =
        `The package @omh/react-native-maps-core' doesn't seem to be linked. Make sure: \n\n` +
        Platform.select({
          ios: "- You have run 'pod install'\n",
          default: '',
        }) +
        '- You rebuilt the app after installing the package\n' +
        '- You are not using Expo Go\n' +
        `\n\nError detected when trying to get native component '${ComponentName}'.`;

      throw new Error(LINKING_ERROR);
    };
  }
}
