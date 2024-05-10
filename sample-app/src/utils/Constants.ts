import { OmhCoordinate, OmhPatternItem } from '@omh/react-native-maps-core';
import { JointTypeItem } from '../types/common';

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

  export namespace Pattern {
    export const dottedPattern: OmhPatternItem[] = [
      {
        variant: 'dot',
      },
      {
        variant: 'gap',
        length: 10.0,
      },
    ];

    export const dashedPattern: OmhPatternItem[] = [
      {
        variant: 'dash',
        length: 10.0,
      },
      {
        variant: 'gap',
        length: 10.0,
      },
    ];

    export const customPattern: OmhPatternItem[] = [
      {
        variant: 'dash',
        length: 10.0,
      },
      {
        variant: 'gap',
        length: 2.0,
      },
      {
        variant: 'dash',
        length: 10.0,
      },
      {
        variant: 'gap',
        length: 5.0,
      },
      {
        variant: 'dot',
      },
      {
        variant: 'gap',
        length: 5.0,
      },
      {
        variant: 'dot',
      },
    ];
  }

  export namespace JointType {
    export const jointTypeItems: JointTypeItem[] = [
      {
        label: 'Miter',
        value: 'miter',
      },
      {
        label: 'Round',
        value: 'round',
      },
      {
        label: 'Bevel',
        value: 'bevel',
      },
    ];
  }
}
