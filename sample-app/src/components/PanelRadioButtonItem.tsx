import React from 'react';
import { StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';

interface Props {
  label: string;
  enabled?: boolean;
}

export const PanelRadioButtonItem = ({ label, enabled = true }: Props) => {
  return (
    <RadioButton.Item
      disabled={!enabled}
      label={label}
      value={label}
      mode="android"
      position="leading"
      labelStyle={styles.label}
      style={styles.radioButton}
    />
  );
};

const styles = StyleSheet.create({
  radioButton: {
    paddingLeft: 0,
  },
  label: {
    textAlign: 'left',
  },
});
