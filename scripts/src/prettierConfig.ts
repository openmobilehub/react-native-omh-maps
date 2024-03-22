import path from 'node:path';
import * as prettier from 'prettier';

import { scriptsWorkspacePath } from './constants';

const prettierConfigBase: NonNullable<prettier.Options> =
  (await prettier.resolveConfig(
    path.join(scriptsWorkspacePath, '..', '.prettierrc.json')
  ))!;

function getPrettierConfig(parser: prettier.Options['parser']) {
  return {
    ...prettierConfigBase,
    parser,
  };
}

export default getPrettierConfig;
