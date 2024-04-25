import React, { useMemo } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';

import RNCSlider from '@react-native-community/slider';

import ControlParagraph from './ControlParagraph';

export type SliderProps = {
  label: string;
  onChange: (value: number) => void;
  minimumValue: number;
  maximumValue: number;
  centeredLabel?: boolean;
  style?: ViewStyle;
  defaultValue?: number;
  step?: number;
  disabled?: boolean;
};

export const Slider = ({
  label,
  onChange,
  style,
  centeredLabel = true,
  step = 1,
  defaultValue,
  minimumValue,
  maximumValue,
  disabled = false,
}: SliderProps) => {
  const theme = useTheme();

  const [tintedColor, untintedColor] = useMemo(
    () => [theme.colors.primary, theme.colors.secondary],
    [theme.colors.primary, theme.colors.secondary]
  );

  return (
    <>
      <ControlParagraph centered={centeredLabel}>{label}</ControlParagraph>

      <RNCSlider
        // this is not a controlled component, value is just initial value - as per the docs
        value={defaultValue}
        step={step ?? minimumValue}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        onValueChange={onChange}
        style={[styles.slider, style]}
        minimumTrackTintColor={tintedColor}
        maximumTrackTintColor={untintedColor}
        disabled={disabled}
      />
    </>
  );
};

const styles = StyleSheet.create({
  slider: {
    width: '100%',
    height: 30,
    marginVertical: 10,
  },
});

export default Slider;
