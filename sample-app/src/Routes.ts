export enum Route {
  menu = 'Menu',
  about = 'About app',
  plainMap = 'Plain map',
  markerMap = 'Marker map',
  multipleMaps = 'Multiple maps',
  cameraMap = 'Camera Map',
}

export const RoutesDescriptions: Record<Route, string> = {
  [Route.menu]: 'Menu',
  [Route.about]: 'About app',
  [Route.plainMap]: 'Interactive map without any additional features.',
  [Route.markerMap]: 'Interactive map with markers.',
  [Route.multipleMaps]:
    'Multiple maps from different providers displayed simultaneously.',
  [Route.cameraMap]: 'Map showcasing the camera features',
};

export default Route;
