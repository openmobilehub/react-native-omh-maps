import { findNodeHandle } from 'react-native';
import { MapStyleElement } from 'react-native-maps';
import React from 'react';
import { NativeOmhMapViewComponent } from './RNOmhMapsCoreViewNativeComponent';

// As zoom level is not supported by Apple Maps, we need to calculate the latitudeDelta and longitudeDelta based on the zoom level and the map dimensions.
// The following formulas are inspired by the following SO thread: https://stackoverflow.com/questions/4189621/setting-the-zoom-level-for-a-mkmapview/20589521#20589521

export const getLongitudeDelta = (zoomLevel: number, width: number) => {
  return ((360 / Math.pow(2, zoomLevel + 2)) * width) / 256;
};

export const getLatitudeDelta = (zoomLevel: number, height: number) => {
  return ((360 / Math.pow(2, zoomLevel + 2)) * height) / 256;
};

export enum MapErrors {
  MAP_NOT_IN_TREE_YET = 'OmhMapView is not mounted in the RN view tree yet.',
}

export const notReadyPromiseHandler = () =>
  Promise.reject(new Error(MapErrors.MAP_NOT_IN_TREE_YET));

export const notReadyHandler = () => {
  throw new Error(MapErrors.MAP_NOT_IN_TREE_YET);
};

export function isMapStyleElement(
  mapStyle: any
): mapStyle is MapStyleElement[] {
  if (!Array.isArray(mapStyle)) {
    return false;
  }

  return mapStyle.every(element => {
    if (!Array.isArray(element.stylers)) {
      return false;
    }

    if (
      element.featureType !== undefined &&
      typeof element.featureType !== 'string'
    ) {
      return false;
    }

    if (
      element.elementType !== undefined &&
      typeof element.elementType !== 'string'
    ) {
      return false;
    }

    return true;
  });
}

export const getViewRefHandle = <BAsserted extends boolean>(
  nativeComponentRef: React.MutableRefObject<NativeOmhMapViewComponent | null>,
  bThrowErrorIfNotInTree: BAsserted = false as any
): BAsserted extends true ? number : number | null => {
  const handle = findNodeHandle(nativeComponentRef.current);

  if (bThrowErrorIfNotInTree && handle === null)
    throw new Error(MapErrors.MAP_NOT_IN_TREE_YET);

  return handle!;
};
