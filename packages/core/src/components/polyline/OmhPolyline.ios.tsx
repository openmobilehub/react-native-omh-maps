import React, { useMemo } from 'react';
import { OmhPolylineProps } from './OmhPolyline.types';
import { Polyline } from 'react-native-maps';
import { omhColorToString } from '../../utils/colorHelper';
import { convertToPattern } from '../../utils/linePatternMapper';

export const OmhPolyline = ({
  points,
  width,
  color,
  isVisible = true,
  zIndex,
  clickable,
  onPolylineClick,
  jointType,
  pattern,
  consumePolylineClicks,
  cap,
}: OmhPolylineProps) => {
  const onPress = () => {
    if (clickable) {
      onPolylineClick?.(consumePolylineClicks || true);
    }
  };

  const linePattern = useMemo(() => {
    return convertToPattern(pattern);
  }, [pattern]);

  const lineCap = useMemo(() => {
    if (!cap) return undefined;
    switch (cap.type) {
      case 'butt':
        return 'butt';
      case 'square':
        return 'square';
      case 'round':
        return 'round';
      case 'custom':
        return undefined;
    }
  }, [cap]);

  return (
    isVisible && (
      <Polyline
        coordinates={points}
        strokeWidth={(width || 0) / 2}
        strokeColor={color ? omhColorToString(color) : undefined}
        zIndex={zIndex}
        lineJoin={jointType}
        tappable={clickable}
        onPress={onPress}
        lineCap={lineCap}
        lineDashPattern={linePattern}
      />
    )
  );
};
