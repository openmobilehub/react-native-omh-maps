import React, { useMemo } from 'react';
import { Marker, MarkerPressEvent, Point } from 'react-native-maps';
import { OmhMarkerProps } from './OmhMarker.types';
import { OmhAnchor } from '@omh/react-native-maps-core';
import { omhColorToString } from '../../utils/colorHelper';
import {
  MarkerDragEvent,
  MarkerDragStartEndEvent,
} from 'react-native-maps/lib/sharedTypes';

/**
 * The OMH Marker component.
 */
export const OmhMarker = ({
  position,
  title,
  clickable,
  draggable,
  anchor,
  infoWindowAnchor,
  alpha,
  snippet,
  isVisible,
  isFlat,
  rotation,
  backgroundColor,
  //isInfoWindowShown,
  markerZIndex,
  icon,
  consumeMarkerClicks,
  onPress,
  onDragStart,
  onDrag,
  onDragEnd,
  //onInfoWindowPress,
  //onInfoWindowLongPress,
  //onInfoWindowClose,
  //onInfoWindowOpen,
}: OmhMarkerProps) => {
  const anchorToPoint = (
    omhAnchor: OmhAnchor | undefined
  ): Point | undefined => {
    if (!omhAnchor) return undefined;
    return { x: omhAnchor.u, y: omhAnchor.v };
  };

  const anchorPoint = useMemo(() => {
    return anchorToPoint(anchor);
  }, [anchor]);

  const calloutAnchorPoint = useMemo(() => {
    return anchorToPoint(infoWindowAnchor);
  }, [infoWindowAnchor]);

  const pinColor = useMemo(() => {
    if (!backgroundColor) return undefined;
    return omhColorToString(backgroundColor);
  }, [backgroundColor]);

  const handleOnPress = (event: MarkerPressEvent) => {
    onPress?.({
      ...event,
      nativeEvent: {
        ...event.nativeEvent,
        position: event.nativeEvent.coordinate,
      },
    });
  };

  const handleOnDragStart = (event: MarkerDragStartEndEvent) => {
    onDragStart?.({
      ...event,
      nativeEvent: {
        ...event.nativeEvent,
        position: event.nativeEvent.coordinate,
      },
    });
  };

  const handleOnDragEnd = (event: MarkerDragStartEndEvent) => {
    onDragEnd?.({
      ...event,
      nativeEvent: {
        ...event.nativeEvent,
        position: event.nativeEvent.coordinate,
      },
    });
  };

  const handleOnDrag = (event: MarkerDragEvent) => {
    onDrag?.({
      ...event,
      nativeEvent: {
        ...event.nativeEvent,
        position: event.nativeEvent.coordinate,
      },
    });
  };

  return (
    isVisible && (
      <Marker
        coordinate={position}
        title={title}
        description={snippet}
        tappable={clickable}
        draggable={draggable}
        anchor={anchorPoint}
        calloutAnchor={calloutAnchorPoint}
        opacity={alpha}
        pinColor={pinColor}
        flat={isFlat}
        rotation={rotation}
        //titleVisibility={isInfoWindowShown}
        //subtitleVisibility={isInfoWindowShown}
        zIndex={markerZIndex}
        icon={icon}
        stopPropagation={consumeMarkerClicks}
        //isPreselected={isInfoWindowShown}
        onPress={handleOnPress}
        onDragStart={handleOnDragStart}
        onDragEnd={handleOnDragEnd}
        onDrag={handleOnDrag}
      />
    )
  );
};
