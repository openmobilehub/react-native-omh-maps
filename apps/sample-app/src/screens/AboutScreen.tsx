import _ from 'lodash';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Headline, Subheading } from 'react-native-paper';

import { version as appVersion } from '../../package.json';
import { demoStyles } from '../styles/demoStyles';

export const AboutScreen = () => {
  return (
    <View style={[demoStyles.rootContainer, styles.container]}>
      <Headline>React Native OMH Maps Sample</Headline>
      <Subheading>App v{appVersion}</Subheading>
      <Subheading>
        RN v{Platform.constants.reactNativeVersion.major}.
        {Platform.constants.reactNativeVersion.minor}.
        {Platform.constants.reactNativeVersion.patch}
      </Subheading>
      <Subheading>
        Platform: {_.capitalize(Platform.OS)}, API level {Platform.Version}
      </Subheading>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    rowGap: 2.5,
  },
});

export default AboutScreen;
