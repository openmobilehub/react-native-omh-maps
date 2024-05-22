import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const PLUGIN_NAME_PREFIX = '@openmobilehub/maps-plugin-';

/** The root path of the scripts workspace */
export const scriptsWorkspacePath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..'
);
