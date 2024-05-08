import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import RNCSlider from '@react-native-community/slider';

export type SliderProps = {
  label: string;
  onChange: (value: number) => void;
  minimumValue: number;
  maximumValue: number;
  style?: ViewStyle;
  defaultValue?: number;
  step?: number;
  disabled?: boolean;
};

export const Slider = ({
  label,
  onChange,
  style,
  step = 1,
  defaultValue,
  minimumValue,
  maximumValue,
  disabled = false,
}: SliderProps) => {
  const theme = useTheme();

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      <RNCSlider
        // this is not a controlled component, value is just initial value - as per the docs
        value={defaultValue}
        step={step ?? minimumValue}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        onValueChange={onChange}
        style={[styles.slider, style]}
        thumbTintColor={theme.colors.primary}
        minimumTrackTintColor={theme.colors.primary}
        disabled={disabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 16,
    alignItems: 'center',
  },
  label: {
    flex: 1,
  },
  slider: {
    flex: 3,
  },
});

export default Slider;
