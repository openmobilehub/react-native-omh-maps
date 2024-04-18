import React, { useEffect, useMemo } from 'react';
import Dropdown from 'react-native-input-select';

import { OmhMapsModule } from '@omh/react-native-maps-core';

import { MapProvider } from '../../../packages/core/src/NativeOmhMapsCoreModule';

export default function MapProviderPicker({
  onChange,
}: {
  onChange: (provider: MapProvider) => void;
}) {
  const availableProviders = useMemo(
    () => OmhMapsModule.getAvailableMapProviders(),
    []
  );

  const [provider, setProvider] = React.useState(
    OmhMapsModule.getDefaultMapProvider()
  );

  useEffect(() => {
    onChange(provider);
  }, [onChange, provider]);

  return (
    <Dropdown
      label="Map provider"
      placeholder="Select an option..."
      options={availableProviders.map(p => ({
        label: p.name,
        value: p.path,
      }))}
      selectedValue={provider.path}
      onValueChange={(value: MapProvider['path']) =>
        setProvider(availableProviders.find(p => p.path === value)!)
      }
      //   primaryColor={'green'}
    />
  );
}
