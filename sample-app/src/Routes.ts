export enum Route {
  menu = 'Menu',
  about = 'About app',
  plainMap = 'Plain map',
  markerMap = 'Marker map',
  cameraMap = 'Camera Map',
  // multipleMaps = 'Multiple maps',
}

export const RoutesDescriptions: Record<Route, string> = {
  [Route.menu]: 'Menu',
  [Route.about]: 'About app',
  [Route.plainMap]: 'Interactive map without any additional features.',
  [Route.markerMap]: 'Interactive map with markers.',
  [Route.cameraMap]: 'Map showcasing the camera features',
  // [Route.multipleMaps]:
  //   'Multiple maps from different providers displayed simultaneously.',
};

export default Route;
