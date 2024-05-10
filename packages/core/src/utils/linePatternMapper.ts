import { OmhPatternItem } from '../types/common';

export function convertToPattern(
  input: OmhPatternItem[] | undefined,
  scaleFactor: number = 1
): number[] | undefined {
  if (!input) return undefined;
  const patternArray = [];
  for (let index = 0; index < input.length; index++) {
    const shouldBeDash = index % 2 === 0;
    switch (input[index]?.variant) {
      case 'dot': {
        /* ignore, dot is not supported*/
        break;
      }
      case 'dash': {
        if (!shouldBeDash) {
          patternArray.push(0);
        }
        patternArray.push((input[index]?.variant.length || 0) * scaleFactor);
        break;
      }
      case 'gap': {
        if (shouldBeDash) {
          patternArray.push(0);
        }
        patternArray.push((input[index]?.variant.length || 0) * scaleFactor);
        break;
      }
    }
  }
  return patternArray;
}
