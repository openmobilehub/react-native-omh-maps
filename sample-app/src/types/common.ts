import { OmhLineJoin, OmhPatternItem } from '@omh/react-native-maps-core';

export type JointTypeItem = {
  label: string;
  value: OmhLineJoin;
};

export type PatternItem = {
  label: PatternOption;
  value: OmhPatternItem[] | undefined;
};

export enum PatternOption {
  NONE = 'None',
  DOTTED = 'Dotted',
  DASHED = 'Dashed',
  CUSTOM = 'Custom',
}
