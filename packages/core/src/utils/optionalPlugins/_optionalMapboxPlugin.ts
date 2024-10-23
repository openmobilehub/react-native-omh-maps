let mapboxPlugin;

try {
  mapboxPlugin = require('@openmobilehub/maps-plugin-mapbox');
} catch (error) {
  // Fallback or default behavior if Mapbox plugin is not installed
  console.warn('@openmobilehub/maps-plugin-mapbox is not installed');
  mapboxPlugin = null;
}

export default mapboxPlugin;
