import React, { useMemo } from 'react';
import { View, ViewProps } from 'react-native';
import { useTheme } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';

import { OmhMapsModule, OmhMapProvider } from '@omh/react-native-maps-core';

import useLogger from '../hooks/useLogger';
import ControlParagraph from './controls/ControlParagraph';

export type MapProviderPickerProps = {
  onChange: (provider: OmhMapProvider) => void;
  style?: ViewProps['style'];
  centeredLabel?: boolean;
  label?: string;
  defaultProvider?: OmhMapProvider | (() => OmhMapProvider);
};

export default function MapProviderPicker({
  onChange,
  style,
  centeredLabel = true,
  label = 'Map provider',
  defaultProvider = () => OmhMapsModule.getDefaultMapProvider(),
}: MapProviderPickerProps) {
  const theme = useTheme();
  const logger = useLogger('MapProviderPicker');
  const availableProviders = useMemo(
    () => OmhMapsModule.getAvailableMapProviders(),
    []
  );

  const [provider, setProvider] =
    React.useState<OmhMapProvider>(defaultProvider);

  return (
    <View style={style}>
      <ControlParagraph centered={centeredLabel}>{label}</ControlParagraph>

      <RNPickerSelect
        onValueChange={(newProviderName: string) => {
          const newProvider = availableProviders.find(
            ({ name }) => name === newProviderName
          );

          if (!newProvider || newProvider.name === provider.name) return;

          logger.log(
            `New provider '${newProvider.name}' (${newProvider.path}) has been selected from map provider selection dropdown.`
          );

          setProvider(newProvider);
          onChange(newProvider);
        }}
        placeholder={
          // empty object to disable placeholder
          {}
        }
        items={availableProviders.map(({ name }) => ({
          label: name,
          value: name,
          color: theme.colors.onSurface,
        }))}
        style={{
          inputIOS: {
            paddingLeft: 16,
          },
        }}
      />
    </View>
  );
}
