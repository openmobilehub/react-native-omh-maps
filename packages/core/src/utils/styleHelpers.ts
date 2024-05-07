import { StyleProp, ViewStyle } from 'react-native';

export const mergeStyles = (
  styles: StyleProp<ViewStyle>
): ViewStyle | undefined => {
  const isArray = Array.isArray(styles);

  if (!isArray) return styles as ViewStyle;

  const filteredStyles = styles.filter(
    style => style !== null && style !== undefined
  ) as ViewStyle[];

  return filteredStyles.reduce((acc, style) => {
    return { ...acc, ...style };
  }, {});
};
