export enum Route {
  menu = 'Menu',
  about = 'About app',
  plainMap = 'Plain Map',
  markerMap = 'Marker Map',
  cameraMap = 'Camera Map',
  polylineMap = 'Polylines map',
  stylesMap = 'Styles Map',
  locationSharing = 'Location Sharing Map',
  locationResult = 'Location Result',
  // multipleMaps = 'Multiple maps',
}

export const RoutesDescriptions: Record<Route, string> = {
  [Route.menu]: 'Menu',
  [Route.about]: 'About app',
  [Route.plainMap]: 'Interactive map without any additional features.',
  [Route.markerMap]: 'Interactive map with markers.',
  [Route.cameraMap]: 'Map showcasing the camera features',
  [Route.polylineMap]: 'Map showcasing the polylines',
  [Route.stylesMap]: 'Map showcasing custom styles',
  [Route.locationSharing]: 'Map showcasing location sharing via deep links',
  [Route.locationResult]: 'Location result screen',
  // [Route.multipleMaps]:
  //   'Multiple maps from different providers displayed simultaneously.',
};

export default Route;
