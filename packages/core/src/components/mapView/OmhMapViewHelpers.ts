// As zoom level is not supported by Apple Maps, we need to calculate the latitudeDelta and longitudeDelta based on the zoom level and the map dimensions.
// The following formulas are inspired by the following SO thread: https://stackoverflow.com/questions/4189621/setting-the-zoom-level-for-a-mkmapview/20589521#20589521

export const getLongitudeDelta = (zoomLevel: number, width: number) => {
  return ((360 / Math.pow(2, zoomLevel)) * width) / 256;
};

export const getLatitudeDelta = (zoomLevel: number, height: number) => {
  return ((360 / Math.pow(2, zoomLevel)) * height) / 256;
};
