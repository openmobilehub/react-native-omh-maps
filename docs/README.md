# React Native OMH Maps Documentation

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

API docs are generated automatically using [docusaurus-plugin-typedoc](https://www.npmjs.com/package/docusaurus-plugin-typedoc). Typedoc entrypoints are loaded from [`entrypoints.json`](./entrypoints.json) via [`docusaurus.config.ts`](docusaurus.config.ts) and corresponding Markdown outputs are emitted to [`/docs/docs/api`](./docs/api).
The [`/docs/docs/contributing.mdx`](/docs/docs/contributing.mdx) file is a wrapper that imports & renders root project's [`CONTRIBUTING.md`](/CONTRIBUTING.md) file to reduce redundancy. This `contributing.mdx` file - apart from functioning standalone - is processed by `typedoc-plugin-replace-text` to replace `CONTRIBUTING.md`'s relative links with Docusaurus docs files tree links.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
