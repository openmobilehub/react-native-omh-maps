import React from 'react';
import { Platform, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';

export type Choice<T> = { label: string; value: T; key: string };

export type PickerProps<T> = {
  value: T;
  label: string;
  choices: Choice<T>[];
  onChange: (value: T) => void;
  style?: ViewProps['style'];
  centeredLabel?: boolean;
  disabled?: boolean;
};

export default function Picker<T>({
  value,
  label,
  choices,
  onChange,
  style,
  disabled = false,
}: PickerProps<T>) {
  const theme = useTheme();

  return (
    <View style={[styles.wrapper, style]}>
      <Text style={styles.label}>{label}</Text>

      <RNPickerSelect
        onValueChange={(newValue: T) => {
          const newChoice = choices.find(p => p.value === newValue);

          if (!newChoice) {
            console.warn(
              `[Picker] Couldn't find just-selected value '${newValue}' in choices`
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
        disabled={disabled}
        style={{
          viewContainer: {
            flex: 3,
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select<ViewStyle>({
      ios: {
        marginVertical: 10,
      },
    }),
  },
  label: {
    flex: 1,
  },
});
