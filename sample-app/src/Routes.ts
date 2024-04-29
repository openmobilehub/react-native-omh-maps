export enum Route {
  menu = 'Menu',
  about = 'About app',
  plainMap = 'Plain Map',
  markerMap = 'Marker Map',
  cameraMap = 'Camera Map',
  stylesMap = 'Styles Map',
  // multipleMaps = 'Multiple maps',
}

export const RoutesDescriptions: Record<Route, string> = {
  [Route.menu]: 'Menu',
  [Route.about]: 'About app',
  [Route.plainMap]: 'Interactive map without any additional features.',
  [Route.markerMap]: 'Interactive map with markers.',
  [Route.cameraMap]: 'Map showcasing the camera features',
  [Route.stylesMap]: 'Map showcasing custom styles',
  // [Route.multipleMaps]:
  //   'Multiple maps from different providers displayed simultaneously.',
};

export default Route;
