import dedent from 'dedent';

export const TSCONFIG_TEMPLATE = JSON.stringify({
  extends: '../../tsconfig',
});

export const TSCONFIG_BUILD_TEMPLATE = JSON.stringify({
  extends: './tsconfig',
  exclude: ['lib', 'node_modules'],
});

export const JEST_CONFIG_TS_TEMPLATE = dedent(`
    import type { Config } from 'jest';

    const config: Config = {
        preset: 'react-native',
        modulePathIgnorePatterns: ['node_modules', 'lib'],
    };

    export default config;
`);
