import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

type Props = {
  onPress: () => void;
  label: string;
  enabled?: boolean;
};

export const PanelButton = ({ onPress, label, enabled = true }: Props) => {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      style={styles.button}
      disabled={!enabled}>
      {label.toUpperCase()}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
    borderRadius: 4,
  },
});
