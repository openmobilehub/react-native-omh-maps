import { OmhLineJoin } from '@omh/react-native-maps-core';

export type JointTypeItem = {
  label: string;
  value: OmhLineJoin;
};

export enum PatternOption {
  NONE = 'None',
  DOTTED = 'Dotted',
  DASHED = 'Dashed',
  CUSTOM = 'Custom',
}
