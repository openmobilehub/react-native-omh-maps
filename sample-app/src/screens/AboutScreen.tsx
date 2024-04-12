import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Headline, Subheading } from 'react-native-paper';
import { version as rnVersion } from 'react-native/package.json';

import { version as appVersion } from '../../package.json';

export const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Headline>React Native OMH Maps Sample</Headline>
      <Subheading>App v{appVersion}</Subheading>
      <Subheading>RN v{rnVersion}</Subheading>
      <Subheading>
        Platform: {Platform.OS} {Platform.Version}
      </Subheading>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 2.5,
  },
});

export default AboutScreen;
