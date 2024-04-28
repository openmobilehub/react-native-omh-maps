import React from 'react';
import { StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';

type Props = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label: string;
};

export const PanelCheckbox = ({ value, onValueChange, label }: Props) => {
  const handlePress = () => {
    onValueChange(!value);
  };

  return (
    <Checkbox.Item
      style={styles.checkbox}
      status={value ? 'checked' : 'unchecked'}
      onPress={handlePress}
      label={label}
      position="leading"
      labelStyle={styles.label}
    />
  );
};

const styles = StyleSheet.create({
  checkbox: {
    paddingLeft: 0,
  },
  label: {
    textAlign: 'left',
  },
});