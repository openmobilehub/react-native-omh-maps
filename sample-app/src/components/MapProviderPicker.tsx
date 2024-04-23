import React, { useMemo } from 'react';
import { View, ViewProps } from 'react-native';
import { useTheme } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';

import { OmhMapsModule } from '@omh/react-native-maps-core';

import { MapProvider } from '../../../packages/core/src/NativeOmhMapsCoreModule';
import useLogger from '../hooks/useLogger';
import ControlParagraph from './ControlParagraph';

export type MapProviderPickerProps = {
  onChange: (provider: MapProvider) => void;
  style?: ViewProps['style'];
  centeredLabel?: boolean;
  label?: string;
  defaultProvider?: MapProvider | (() => MapProvider);
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

  const [provider, setProvider] = React.useState<MapProvider>(defaultProvider);
  console.log('provider', provider);
  return (
    <View style={style}>
      <ControlParagraph centered={centeredLabel}>{label}</ControlParagraph>

      <RNPickerSelect
        onValueChange={(value?: MapProvider['path']) => {
          const newProvider = availableProviders.find(p => p.path === value);

          if (!newProvider || newProvider.path === provider.path) return;

          logger.log(
            `New provider '${newProvider.name}' (${newProvider.path}) has been selected from map provider selection dropdown.`
          );

          setProvider(newProvider);
          onChange(newProvider);
        }}
        value={provider.path}
        placeholder={
          // empty object to disable placeholder
          {}
        }
        items={availableProviders.map(p => ({
          label: p.name,
          value: p.path,
          key: p.path,
          color: theme.colors.onSurface,
        }))}
      />
    </View>
  );
}
