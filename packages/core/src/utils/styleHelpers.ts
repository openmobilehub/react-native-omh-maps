import { ViewStyle } from 'react-native';

export const mergeStyles = (styles: any): ViewStyle | undefined => {
  const isArray = Array.isArray(styles);

  if (!isArray) return styles;

  const filteredStyles = styles.filter(
    style => style !== null && style !== undefined
  ) as ViewStyle[];

  return filteredStyles.reduce((acc, style) => {
    return { ...acc, ...style };
  }, {});
};
