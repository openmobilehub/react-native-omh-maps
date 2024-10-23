let openStreetMapPlugin;

try {
  openStreetMapPlugin = require('@openmobilehub/maps-plugin-openstreetmap');
} catch (error) {
  console.warn('@openmobilehub/maps-plugin-openstreetmap is not installed');
  openStreetMapPlugin = null;
}

export default openStreetMapPlugin;
