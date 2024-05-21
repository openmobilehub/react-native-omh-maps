
---

## Platforms

|  Platform  |  Supported  |
|:----------:|:-----------:|
|  Android   |      ✅      |
|    iOS     |      ❌      |

## Installation

```bash
yarn add @openmobilehub/maps-plugin-azuremaps
```

## Configuration

:::info[Prerequisites]

Each plugin requires you to follow the `@openmobilehub/maps-core` setup guide. You can find it [here](https://todo.add.link).

:::

### Credentials

1. Configure your Azure Maps account and get the subscription key according to the [official documentation](https://learn.microsoft.com/en-us/azure/azure-maps/quick-android-map?pivots=programming-language-kotlin#create-an-azure-maps-account) and save it for later use.

### Maven

Add the following maven setup to your `android/build.gradle` file:

```groovy
// ...
allprojects {
    repositories { repositoryHandler ->
        google()
        mavenCentral()
        // Azure Maps Maven repository
        maven {
            url = project.uri("https://atlas.microsoft.com/sdk/android")
        }
    }
}
```

### [Optional] Permissions

If you plan to use location services, you need to add the following permissions to your `AndroidManifest.xml` file:

```xml
<manifest ...>
   <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
   <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
   <application ...>
      ...
   </application>
</manifest>
```

## Usage

Before interacting with any maps plugin, it is necessary to initialize the maps module.

```typescript
import {OmhMapsModule} from '@openmobilehub/maps-core';
import {OmhMapsAzureMapsProvider, OmhMapsPluginAzureMapsModule} from '@openmobilehub/maps-plugin-azuremaps';

// You can use different providers for apps with and without Google Play Services.
// Remember to initialize the module before using any of its components.
OmhMapsModule.initialize({
  gmsProvider: OmhMapsAzureMapsProvider,
  nonGmsProvider: OmhMapsAzureMapsProvider,
});

// Credentials setup must be done before using the map view.
OmhMapsPluginAzureMapsModule.setSubscriptionKey('<YOUR_SUBSCRIPTION_KEY>');

const App = () => {
  return <OmhMapView />;
}
```

### Usage Guide

Interacting with the Azure Maps provider follows the same pattern as other providers, as they all implement the same interface. For a comprehensive list of available modules, components, and props, refer to the [Quick Start](https://todo.add.link) guide.

## Parity Matrix

:::info

TODO

:::

## License

- See [LICENSE](https://todo.add.link)
