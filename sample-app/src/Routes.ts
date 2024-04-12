export enum Route {
  menuScreen = 'Menu',
  aboutScreen = 'About app',
  plainMapScreen = 'Plain map',
}

export const RoutesDescriptions: Record<Route, string> = {
  [Route.menuScreen]: 'Menu',
  [Route.aboutScreen]: 'About app',
  [Route.plainMapScreen]: 'Interactive map without any additional features.',
};

export default Route;
