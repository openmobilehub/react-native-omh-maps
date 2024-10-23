# Development workflow

This project is a monorepo managed using [Yarn workspaces](https://yarnpkg.com/features/workspaces). It contains the following packages:

- An example app in the `apps/sample-app/` directory.
- The core library in the `packages/core/` directory.
- Plugin packages in the `packages/plugin-*/` directories.

To get started with the project, run `yarn` in the root directory to install the required dependencies for each package:

```sh
yarn
```

> Since the project relies on Yarn workspaces, you cannot use [`npm`](https://github.com/npm/cli) for development.

To develop, it is required that the [React Native Codegen](https://github.com/reactwg/react-native-new-architecture/blob/main/docs/codegen.md) is run at least once, and after any changes to the native specs, it must be re-run. This is done by running the following command:

```sh
yarn codegen:android
```

## Sample App

https://openmobilehub.github.io/react-native-omh-maps/docs/sample-app

The Sample App demonstrates usage of the library. To run the the application follow the instructions [here](https://openmobilehub.github.io/react-native-omh-maps/docs/sample-app).

It is configured to use the local version of the library, so any changes you make to the library's source code will be reflected in the example app. Changes to the library's JavaScript code will be reflected in the example app without a rebuild, but native code changes will require a rebuild of the example app.

To edit the Kotlin files, open `apps/sample-app/android` in Android studio and find the source files at `openmobilehub_rn-maps-core` under `Android`.

## Creating a new package

To create a new package, use the interactive CLI tool: `yarn scripts createPlugin`. The whole package along with scripts, configuration and dependencies will be bootstrapped for you using [React Native New Architecture](https://github.com/reactwg/react-native-new-architecture) (Fabric + Turbo Modules) with backwards compatibility code - implementation for Old Architecture. Each source set is compiled depending on whether the consumer application uses the new architecture (e.g. on Android - specifies `newArchEnabled=true` in `gradle.properties`). Yarn dependencies will be installed automatically and the package will be added to aliases in `tsconfig.json` and as a dependency to the sample app.

## Scripts

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
  - `yarn sample-app build:android:{debug,release}`: build the example app for Android.
  - `yarn sample-app build:ios:{debug,release}`: build the example app for iOS.
- `yarn scripts createPlugin`: interactively bootstraps a new OMH Maps plugin project.

## Commit message convention

We follow the [conventional commits specification](https://www.conventionalcommits.org/en) for our commit messages:

- `fix`: bug fixes, e.g. fix crash due to deprecated method.
- `feat`: new features, e.g. add new method to the module.
- `refactor`: code refactor, e.g. migrate from class components to hooks.
- `docs`: changes into documentation, e.g. add usage example for the module..
- `test`: adding or updating tests, e.g. add integration tests using detox.
- `chore`: tooling changes, e.g. change CI config.

Our pre-commit hooks verify that your commit message matches this format when committing.

## Linting and tests

[ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [TypeScript](https://www.typescriptlang.org/)

We use [TypeScript](https://www.typescriptlang.org/) for type checking, [ESLint](https://eslint.org/) with [Prettier](https://prettier.io/) for linting and formatting the code, and [Jest](https://jestjs.io/) for testing.

Our pre-commit hooks verify that the linter and tests pass when committing.

## Publishing to npm

To publish new version to the NPM we use `lerna`. Packages are published automatically after merging a commit that contains a version bump.

1. Run `yarn version:bump`
2. Create PR with a new version
3. After merging the PR with a version bump, package will be released automatically and a corresponding git tag will be created by the Github Actions Workflow

## Writing documentation

Documentation is located under [`/docs/`](https://github.com/openmobilehub/react-native-omh-maps/tree/main/docs/). We use [Docusaurus](https://docusaurus.io/) to generate the documentation website and [docusaurus-plugin-typedoc](https://www.npmjs.com/package/docusaurus-plugin-typedoc) to generate API documentation from TypeScript docstrings. The API documentation is built automatically with Github Actions and published GitHub Pages upon merging to the `main` branch with [this workflow file](https://github.com/openmobilehub/react-native-omh-maps/tree/main/.github/workflows/cd.yml).

Remember to document your code according to [JSDoc reference](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html) and to write proper Markdown documentation manually when needed in the `/docs/docs/` directory. Specifically, there exists a [`/docs/docs/advanced-usage`](https://github.com/openmobilehub/react-native-omh-maps/tree/main/docs/docs/advanced-usage) directory that makes an advanced usage section in the documentation that you can browse through to get a sense of how to document advanced usage of the library, or consider to add your pages directly there.

You can view information about the documentation and its scripts in the [README](https://github.com/openmobilehub/react-native-omh-maps/tree/main/docs/README.md). To simply run documentation locally, you can run:

```bash
yarn docs start
```

## Sending a pull request

> **Working on your first pull request?** You can learn how from this _free_ series: [How to Contribute to an Open Source Project on GitHub](https://app.egghead.io/playlists/how-to-contribute-to-an-open-source-project-on-github).

When you're sending a pull request:

- Prefer small pull requests focused on one change.
- Verify that linters and tests are passing.
- Review the documentation to make sure it looks good.
- Follow the pull request template when opening a pull request.
- For pull requests that change the API or implementation, discuss with maintainers first by opening an issue.
