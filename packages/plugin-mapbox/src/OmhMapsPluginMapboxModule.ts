import NativeOmhMapsPluginMapboxModule, {
  Spec,
} from './NativeOmhMapsPluginMapboxModule';

export const OmhMapsPluginMapboxModule: Spec = {
  setPublicToken: NativeOmhMapsPluginMapboxModule.setPublicToken,
  tweakCompass: NativeOmhMapsPluginMapboxModule.tweakCompass,
};
