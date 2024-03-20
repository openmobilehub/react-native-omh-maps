import type { Config } from 'jest';

const config: Config = {
  preset: 'react-native',
  modulePathIgnorePatterns: [
    '<rootDir>/sample-app/node_modules',
    '<rootDir>/packages/core/lib',
  ],
};

export default config;
