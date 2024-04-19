import React from 'react';
import { StyleSheet } from 'react-native';
import { Paragraph } from 'react-native-paper';

export type ControlParagraphProps = {
  centered?: boolean;
  children: string | React.ReactNode;
};

export default function ControlParagraph({
  children,
  centered = false,
}: ControlParagraphProps) {
  return (
    <Paragraph style={[styles.label, centered && styles.centered]}>
      {children}
    </Paragraph>
  );
}

const styles = StyleSheet.create({
  centered: {
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
  },
});
