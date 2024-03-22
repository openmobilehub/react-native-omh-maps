import { validate as validateEmail } from 'email-validator';
import libxmljs, { Element } from 'libxmljs2';
import fs from 'node:fs';
import path from 'node:path';
import ora from 'ora';
import * as prettier from 'prettier';
import prompts, { PromptObject } from 'prompts';
import validateNpmPackage from 'validate-npm-package-name';

import { Constants, Templates, Utils } from './src';
import { scriptsWorkspacePath } from './src/constants';
import getPrettierConfig from './src/prettierConfig';

let bPluginNamePrefilled = false;
const questions: PromptObject[] = [
  {
    type: 'text',
    name: 'plugin-slug',
    message: `Name suffix of the plugin`,
    validate: value =>
      value.trim().length > 0
        ? // check if valid package name
          !validateNpmPackage(value).errors?.length
          ? // ensure the package name starts with a proper prefix
            value.startsWith(Constants.PLUGIN_NAME_PREFIX)
            ? true
            : `Plugin name must start with '${Constants.PLUGIN_NAME_PREFIX}'`
          : 'Invalid plugin name (must be a valid NPM package name)'
        : 'Plugin name cannot be empty',
    format: value => value.trim().toLowerCase(),
    onRender(this: any) {
      // prefill the input with the default prefix if nothing provided by the user
      if (!bPluginNamePrefilled) {
        this.value = Constants.PLUGIN_NAME_PREFIX;
        this.cursor = Constants.PLUGIN_NAME_PREFIX.length;
        bPluginNamePrefilled = true;
      }
    },
  },
  {
    type: 'text',
    name: 'plugin-description',
    message:
      "Description suffix of the plugin (appended to 'React Native OMH Maps ')",
    validate: value =>
      value.trim().length > 0 ? true : 'Plugin description cannot be empty',
  },
  {
    type: 'text',
    name: 'plugin-author-name',
    message: 'Author name',
    initial: 'Open Mobile Hub',
    validate: value =>
      value.trim().length > 0 ? true : 'Author name cannot be empty',
  },
  {
    type: 'text',
    name: 'plugin-author-email',
    message: 'Author email',
    initial: 'contact@openmobilehub.com',
    validate: value =>
      value.trim().length > 0
        ? // check if email is valid
          validateEmail(value)
          ? true
          : 'Invalid email address'
        : 'Author email cannot be empty',
  },
  {
    type: 'text',
    name: 'plugin-author-url',
    message: 'Author URL',
    initial: 'https://openmobilehub.com',
    validate: value =>
      value.trim().length > 0
        ? // check if URL is valid
          /^https?:\/\/[^ "]+$/.test(value)
          ? true
          : 'Invalid URL'
        : 'Author URL cannot be empty',
  },
];

(async () => {
  const response = await prompts(questions);

  const spinner = ora().start();

  const pluginSlug = response['plugin-slug'],
    pluginDescription = response['plugin-description'],
    pluginAuthorName = response['plugin-author-name'],
    pluginAuthorEmail = response['plugin-author-email'],
    pluginAuthorUrl = response['plugin-author-url'];

  if (
    [
      pluginSlug,
      pluginDescription,
      pluginAuthorEmail,
      pluginAuthorName,
      pluginAuthorUrl,
    ].some(item => !item)
  ) {
    spinner.fail('Cancelled');
    process.exit(-1);
  }

  const pluginDirName = `plugin-${pluginSlug
      .replace(Constants.PLUGIN_NAME_PREFIX, '')
      .replace(/\//g, '-')}`,
    packagesPath = path.join(scriptsWorkspacePath, '..', 'packages'),
    newPackagePath = path.join(packagesPath, pluginDirName),
    rootWorkspacePath = path.join(scriptsWorkspacePath, '..');

  if (fs.existsSync(newPackagePath)) {
    spinner.fail(
      `The plugin directory ${newPackagePath} already exists. Please choose a different plugin name.`
    );
    process.exit(-1);
  } else {
    console.log(
      `Final package will be created in directory: ${newPackagePath}`
    );
  }

  spinner.text = 'Creating new plugin...';

  try {
    await Utils.spawnWrapper(
      path.join(
        rootWorkspacePath,
        'node_modules',
        '.bin',
        'create-react-native-library'
      ),
      [
        pluginDirName,
        `--slug=${pluginSlug}`, // NPM package name
        `--description="React Native OMH Maps ${pluginDescription}"`,
        `--author-name="${pluginAuthorName}"`,
        `--author-email="${pluginAuthorEmail}"`,
        `--author-url="${pluginAuthorUrl}"`,
        `--repo-url=https://github.com/openmobilehub/react-native-omh-maps`,
        `--type=view-legacy`, // see https://github.com/callstack/react-native-builder-bob/blob/main/packages/create-react-native-library/src/index.ts#L176
        `--languages=kotlin-swift`, // see https://github.com/callstack/react-native-builder-bob/blob/main/packages/create-react-native-library/src/index.ts#L176
        `--local=false`, // create a library in the directory passed in as first positional arg
        `--example=false`, // don't create an example app
      ],
      {
        cwd: packagesPath,
      }
    );
  } catch (err: any) {
    spinner.fail(
      `Failed to create the new plugin (CRNL exited with code ${err.code}). Full output below:`
    );
    process.exit(err.code ?? -1);
  }

  spinner.text = 'Adjusting the generated code & configuration files for you';

  for (const obsoleteFileName of [
    '.github/',
    '.yarn/',
    'example/',
    '.editorconfig',
    '.gitignore',
    '.gitattributes',
    '.nvmrc',
    '.yarnrc.yml',
    '.watchmanconfig',
    '.yarnrc',
    'LICENSE',
    'README.md',
    'CONTRIBUTING.md',
    'CODE_OF_CONDUCT.md',
    'lefthook.yml',
    'tsconfig.json',
    'tsconfig.build.json',
    'turbo.json',
  ]) {
    fs.rmSync(path.join(newPackagePath, obsoleteFileName), {
      recursive: true,
      force: true,
    });
  }

  // alter package.json
  const packageJsonPath = path.join(newPackagePath, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  for (const obsoletePackageJsonKey of [
    `devDependencies`,
    `resolutions`,
    `workspaces`,
    `jest`,
    `commitlint`,
    `release-it`,
    `eslintConfig`,
    `prettier`,
    `eslintIgnore`,
  ]) {
    delete packageJson[obsoletePackageJsonKey];
  }

  packageJson.version = '1.0.0-beta';

  delete packageJson.scripts.example;
  packageJson.devDependencies = {
    '@types/node': '*',
    'del-cli': '*',
    'eslint': '*',
    'jest': '*',
    'react-native-builder-bob': '*',
    'release-it': '*',
    'typescript': '*',
    'ts-node': '*',
  };

  fs.writeFileSync(
    packageJsonPath,
    await prettier.format(
      JSON.stringify(packageJson),
      getPrettierConfig('json')
    )
  );

  // create config files
  fs.writeFileSync(
    path.join(newPackagePath, 'tsconfig.json'),
    await Templates.TSCONFIG_TEMPLATE
  );

  fs.writeFileSync(
    path.join(newPackagePath, 'tsconfig.build.json'),
    await Templates.TSCONFIG_BUILD_TEMPLATE
  );

  fs.writeFileSync(
    path.join(newPackagePath, 'jest.config.ts'),
    await Templates.JEST_CONFIG_TS_TEMPLATE
  );

  spinner.text = 'Adding entrypoint to docs configuration';

  // add the new plugin to the docs configuration
  const docsConfigEntrypointsPath = path.join(
    rootWorkspacePath,
    'docs',
    'entrypoints.json'
  );
  const docsConfigEntrypointsJson = JSON.parse(
    fs.readFileSync(docsConfigEntrypointsPath, 'utf-8')
  );

  docsConfigEntrypointsJson.push(`../packages/${pluginDirName}/src/index.tsx`);

  fs.writeFileSync(
    docsConfigEntrypointsPath,
    await prettier.format(
      JSON.stringify(docsConfigEntrypointsJson),
      getPrettierConfig('json')
    )
  );

  spinner.text = "Adding an alias to root workspace's tsconfig.json";

  // add an alias to root workspace's tsconfig.json
  const rootTsConfigPath = path.join(rootWorkspacePath, 'tsconfig.json');
  const rootTsConfig = JSON.parse(fs.readFileSync(rootTsConfigPath, 'utf-8'));
  rootTsConfig.compilerOptions.paths[pluginSlug] = [
    `./packages/${pluginDirName}/src/index`,
  ];

  fs.writeFileSync(
    rootTsConfigPath,
    await prettier.format(
      JSON.stringify(rootTsConfig),
      getPrettierConfig('json')
    )
  );

  spinner.text = 'Customizing package name in Android project';
  const androidPackageName = `com.openmobilehub.android.rn.maps.plugin.${pluginSlug.replace(Constants.PLUGIN_NAME_PREFIX, '')}`;
  const androidSrcDirPath = path.join(newPackagePath, 'android', 'src', 'main'),
    androidSrcJavaDirPath = path.join(androidSrcDirPath, 'java'),
    androidEndSrcPackageDirPath = path.join(
      androidSrcJavaDirPath,
      ...androidPackageName.split('.')
    );

  fs.mkdirSync(androidEndSrcPackageDirPath, {
    recursive: true,
  });

  const files = fs.readdirSync(androidSrcJavaDirPath, { recursive: true });

  let filesToBeWritten: { [filePath: string]: string } = {};
  console.log(); // new line
  for (const fileFullPath of files
    .map(fileRelPath =>
      path.join(androidSrcJavaDirPath, fileRelPath.toString())
    )
    .filter(pth => pth.endsWith('.kt') && fs.lstatSync(pth).isFile())) {
    const fileContent = fs.readFileSync(fileFullPath, 'utf-8');

    const newFileContent = fileContent.replace(
      /^package .*$/m,
      `package ${androidPackageName}`
    );

    const destFilePath = path.join(
      androidEndSrcPackageDirPath,
      path.basename(fileFullPath)
    );
    console.log(
      `Re-writing source Kotlin file ${fileFullPath.replace(rootWorkspacePath, '')} to ${destFilePath.replace(rootWorkspacePath, '')}`
    );

    filesToBeWritten[destFilePath] = newFileContent;
  }

  // delete all java/ src tree files before the buffer is written
  fs.rmSync(androidSrcJavaDirPath, { recursive: true });
  fs.mkdirSync(androidSrcJavaDirPath, { recursive: true }); // restore the directory

  for (const [destFilePath, newFileContent] of Object.entries(
    filesToBeWritten
  )) {
    fs.mkdirSync(path.dirname(destFilePath), { recursive: true });
    fs.writeFileSync(destFilePath, newFileContent);
  }
  filesToBeWritten = {}; // clear the buffer

  // overwrite AndroidManifest.xml changing the package name
  const androidManifestPath = path.join(
    androidSrcDirPath,
    'AndroidManifest.xml'
  );
  var xml = fs.readFileSync(androidManifestPath, 'utf-8');

  var xmlDoc = libxmljs.parseXml(xml);

  // query using xpath syntax
  var manifestNode = xmlDoc.get('//manifest') as Element;
  manifestNode.attr('package')!.value(androidPackageName);

  fs.writeFileSync(androidManifestPath, xmlDoc.toString());

  // run 'yarn install' in root workspace so that all workspaces are resolved & dependencies are linked to the new plugin
  spinner.text = 'Running yarn install in root workspace...';
  try {
    await Utils.spawnWrapper('yarn', ['install'], {
      cwd: rootWorkspacePath,
    });
  } catch (err: any) {
    spinner.fail(
      `Failed to install dependencies in root workspace (yarn exited with code ${err.code}). Full output below:`
    );
    process.exit(err.code ?? -3);
  }

  spinner.text =
    'Adding a peer dependency to the new package in sample-app workspace';

  // add a @module typedoc tag to TS entrypoint
  const entrypointPath = path.join(newPackagePath, 'src', 'index.tsx');
  const entrypointContent = fs.readFileSync(entrypointPath, 'utf-8');

  fs.writeFileSync(
    entrypointPath,
    await prettier.format(
      `
        /**
         * ${pluginDescription}
         * @module ${pluginSlug}
         */

        ${entrypointContent}
      `,
      getPrettierConfig('typescript')
    )
  );

  // add the new package to the root workspace
  try {
    await Utils.spawnWrapper('yarn', ['sample-app', 'add', pluginSlug], {
      cwd: rootWorkspacePath,
    });
  } catch (err: any) {
    spinner.fail(
      `Failed to create the new plugin (yarn exited with code ${err.code}). Full output below:`
    );
    process.exit(err.code ?? -2);
  }

  spinner.succeed(
    `New plugin is ready 🚀 You can find it in '${newPackagePath}'.\nYarn dependencies have just been linked so you can start developing right away.`
  );
})();
