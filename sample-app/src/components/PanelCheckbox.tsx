import React from 'react';
import { StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';

type Props = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label: string;
  enabled?: boolean;
};

export const PanelCheckbox = ({
  value,
  onValueChange,
  label,
  enabled = true,
}: Props) => {
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
      disabled={!enabled}
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
