import type { UserConfig } from '@commitlint/types';

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'signed-off-by': [2, 'always', 'Signed-off-by:'],
  },
};

export default config;
