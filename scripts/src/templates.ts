import * as prettier from 'prettier';

import getPrettierConfig from './prettierConfig';

export const TSCONFIG_TEMPLATE = prettier.format(
  JSON.stringify({
    extends: '../../tsconfig',
  }),
  getPrettierConfig('json')
);

export const TSCONFIG_BUILD_TEMPLATE = prettier.format(
  JSON.stringify({
    extends: './tsconfig',
    exclude: ['lib', 'node_modules'],
  }),
  getPrettierConfig('json')
);

export const JEST_CONFIG_TS_TEMPLATE = prettier.format(
  `
  import type { Config } from 'jest';

  const config: Config = {
      preset: 'react-native',
      modulePathIgnorePatterns: ['node_modules', 'lib'],
  };

  export default config;
  `,
  getPrettierConfig('typescript')
);
