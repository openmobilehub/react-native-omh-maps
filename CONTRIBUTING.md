# Contributing

## Development workflow

This project is a monorepo managed using [Yarn workspaces](https://yarnpkg.com/features/workspaces). It contains the following packages:

- The library package in the root directory.
- An example app in the `sample-app/` directory.

To get started with the project, run `yarn` in the root directory to install the required dependencies for each package:

```sh
yarn
```

> Since the project relies on Yarn workspaces, you cannot use [`npm`](https://github.com/npm/cli) for development.

The [example app](/sample-app/) demonstrates usage of the library. You need to run it to test any changes you make.

It is configured to use the local version of the library, so any changes you make to the library's source code will be reflected in the example app. Changes to the library's JavaScript code will be reflected in the example app without a rebuild, but native code changes will require a rebuild of the example app.

To edit the Java or Kotlin files, open `sample-app/android` in Android studio and find the source files at `omh_rn-maps-core` under `Android`.

You can use various commands from the root directory to work with the project.

To start the packager:

```sh
yarn sample-app start
```

To run the example app on Android:

```sh
yarn sample-app android
```

To run the example app on iOS:

```sh
yarn sample-app ios
```

Make sure your code passes TypeScript and ESLint. Run the following to verify:

```sh
yarn typecheck
yarn lint
```

To fix formatting errors, run the following:

```sh
yarn lint --fix
```

Remember to add tests for your change if possible. Run the unit tests by:

```sh
yarn test
```

### Commit message convention

We follow the [conventional commits specification](https://www.conventionalcommits.org/en) for our commit messages:

- `fix`: bug fixes, e.g. fix crash due to deprecated method.
- `feat`: new features, e.g. add new method to the module.
- `refactor`: code refactor, e.g. migrate from class components to hooks.
- `docs`: changes into documentation, e.g. add usage example for the module..
- `test`: adding or updating tests, e.g. add integration tests using detox.
- `chore`: tooling changes, e.g. change CI config.

Our pre-commit hooks verify that your commit message matches this format when committing.

### Linting and tests

[ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [TypeScript](https://www.typescriptlang.org/)

We use [TypeScript](https://www.typescriptlang.org/) for type checking, [ESLint](https://eslint.org/) with [Prettier](https://prettier.io/) for linting and formatting the code, and [Jest](https://jestjs.io/) for testing.

Our pre-commit hooks verify that the linter and tests pass when committing.

### Publishing to npm

We use [release-it](https://github.com/release-it/release-it) to make it easier to publish new versions. It handles common tasks like bumping version based on semver, creating tags and releases etc.

To publish new versions, run the following:

```sh
yarn release
```

### Scripts

The `package.json` file contains various scripts for common tasks:

- `yarn`: setup project by installing dependencies.
- `yarn typecheck`: type-check files with TypeScript.
- `yarn lint`: lint files with ESLint.
- `yarn test`: run unit tests with Jest.
- `yarn build`: build the library.
- `yarn sample-app *`: alias for running scripts in the example app workspace, e.g.:
  - `yarn sample-app start`: start the Metro server for the example app.
  - `yarn sample-app android`: run the example app on Android.
  - `yarn sample-app ios`: run the example app on iOS.
  - `yarn sample-app build:android`: build the example app for Android.
    - `yarn sample-app build:ios`: build the example app for iOS.

### Sending a pull request

> **Working on your first pull request?** You can learn how from this _free_ series: [How to Contribute to an Open Source Project on GitHub](https://app.egghead.io/playlists/how-to-contribute-to-an-open-source-project-on-github).

When you're sending a pull request:

- Prefer small pull requests focused on one change.
- Verify that linters and tests are passing.
- Review the documentation to make sure it looks good.
- Follow the pull request template when opening a pull request.
- For pull requests that change the API or implementation, discuss with maintainers first by opening an issue.

### Creating a new package

To create a new package,perform the following:

1. Use `create-react-native-library` by issuing the following command inside `packages/`:
   `npx create-react-native-library@latest <package-name>`

When asked for information information, be sure to pass in:

- `@omh/react-native-maps-<package-name>` for the package name
- `React Native OMH Maps <package-name>` for the package description
- `Native view` for the package type
- `Kotlin & Swift` for the languages
- `https://github.com/openmobilehub/react-native-omh-maps` for the repository URL

2. Delete the following obsolete files / folders from the newly-created `packages/<package-directory>` directory:

- `.github/`
- `.yarn/`
- `example/`
- `.editorconfig`
- `.gitignore`
- `.gitattributes`
- `.nvmrc`
- `.yarnrc`
- `LICENSE`
- `README.md`
- `CONTRIBUTING.md`
- `CODE_OF_CONDUCT.md`
- `lefthook.yml`
- `tsconfig.json`
- `tsconfig.build.json`
- `turbo.json`

Functionalities provided by these files is already provided by the root-level project files to reduce redundancy.

3. Remove the following entries from `packages/<package-directory>/package.json`:

- `example` script
- entries:
  - `devDependencies`
  - `resolutions`
  - `workspaces`
  - `jest`
  - `commitlint`
  - `release-it`
  - `eslintConfig`
  - `prettier`
  - `eslintIgnore`

4. Since in yarn sub-workspaces still need to reference CLI dependencies in their respective `devDependencies`, place the following after `peerDependencies`:

   ```json
   "devDependencies": {
       "del-cli": "*",
       "eslint": "*",
       "jest": "*",
       "react-native-builder-bob": "*",
       "release-it": "*",
       "typescript": "*",
       "ts-node": "*"
   },
   ```

5. Create `packages/<package-directory>/tsconfig.json` with the following contents:

   ```json
   {
     "extends": "../../tsconfig"
   }
   ```

6. Create `packages/<package-directory>/tsconfig.build.json` with the following contents:

   ```json
   {
     "extends": "./tsconfig",
     "exclude": ["lib", "node_modules"]
   }
   ```

7. Create a `jest.config.ts` file with the following contents:

   ```typescript
   import type { Config } from 'jest';

   const config: Config = {
     preset: 'react-native',
     modulePathIgnorePatterns: ['node_modules', 'lib'],
   };

   export default config;
   ```

8. Add a peer dependency to the newly created package in `sample-app` workspace by running: `yarn sample-app add @omh/<package-name>` from the root workspace.

9. Add an alias entry to root workspace's `tsconfig.json`:

   ```json
   {
     "compilerOptions": {
       "paths": {
         // ...
         "@omh/react-native-maps-plugin-googlemap": [
           "./packages/plugin-googlemap/src/index"
         ]
       }
     }
   }
   ```
