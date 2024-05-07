import { OmhCoordinate } from '@omh/react-native-maps-core';

export namespace Constants {
  export namespace Maps {
    export const GREENWICH_COORDINATE: OmhCoordinate = {
      latitude: 51.4779,
      longitude: -0.0015,
    };
    export const EVEREST_COORDINATE: OmhCoordinate = {
      latitude: 27.9881,
      longitude: 86.925,
    };
    export const EVEREST_ZOOM_LEVEL = 15;

    export const SAHARA_COORDINATE: OmhCoordinate = {
      latitude: 23.4162,
      longitude: 25.6628,
    };
    export const SAHARA_ZOOM_LEVEL = 5;

    export const CENTER_COORDINATE: OmhCoordinate = {
      latitude: 0.0,
      longitude: 0.0,
    };

    export const CENTER_ZOOM_LEVEL = 0;
  }

  export namespace UI {
    export const SLIDER_THROTTLE_MS = 350;
  }
}
