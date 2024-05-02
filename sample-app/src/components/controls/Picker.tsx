import React from 'react';
import { View, ViewProps } from 'react-native';
import { useTheme } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';

import ControlParagraph from './ControlParagraph';

export type Choice<T> = { label: string; value: T; key: string };

export type PickerProps<T> = {
  value: T;
  label: string;
  choices: Choice<T>[];
  onChange: (value: T) => void;
  style?: ViewProps['style'];
  centeredLabel?: boolean;
};

export default function Picker<T>({
  value,
  label,
  choices,
  onChange,
  style,
  centeredLabel = true,
}: PickerProps<T>) {
  const theme = useTheme();

  return (
    <View style={style}>
      <ControlParagraph centered={centeredLabel}>{label}</ControlParagraph>

      <RNPickerSelect
        onValueChange={(newValue: T) => {
          const newChoice = choices.find(p => p.value === newValue);

          if (!newChoice) {
            console.warn(
              `[Picker] Couldn't find just-selected value '${value}' in choices`
            );
            return;
          }

          onChange(newChoice?.value);
        }}
        value={value}
        placeholder={
          // empty object to disable placeholder
          {}
        }
        items={choices.map(choice => ({
          label: choice.label,
          value: choice.value,
          key: choice.key,
          color: theme.colors.onSurface,
        }))}
      />
    </View>
  );
}
