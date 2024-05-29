This directory contains files for importing optional plugins. It serves as a workaround to ensure that these plugins work seamlessly both within the sample app in this monorepo and in standalone packages.

We achieve this by using Metro's resolver.sourceExts option. This setup bundles .workspace.ts files for our monorepo and .ts files for standalone packages.

The root cause of the issue is that dynamic imports using import() do not resolve paths correctly in our current setup, leading to errors in the sample app.
