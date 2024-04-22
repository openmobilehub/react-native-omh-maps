import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

type Props = {
  onPress: () => void;
  label: string;
};

export const PanelButton = ({ onPress, label }: Props) => {
  return (
    <Button mode="contained" onPress={onPress} style={styles.button}>
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
