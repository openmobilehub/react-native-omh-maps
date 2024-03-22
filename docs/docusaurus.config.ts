import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

import entryPoints from './entrypoints.json';

const config: Config = {
  title: 'RN OMH Maps',
  tagline: 'OMH Maps bindings for React Native',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://legendary-broccoli-93ze846.pages.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'openmobilehub', // Usually your GitHub org/user name.
  projectName: 'react-native-omh-maps', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/openmobilehub/react-native-omh-maps/tree/main/docs/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'React Native OMH Maps',
      logo: {
        alt: 'Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'gettingStartedSidebar',
          position: 'left',
          label: 'Getting started',
        },
        {
          type: 'docSidebar',
          sidebarId: 'apiSidebar',
          position: 'left',
          label: 'API',
        },
        {
          type: 'docSidebar',
          sidebarId: 'advancedUsageSidebar',
          position: 'left',
          label: 'Advanced usage',
        },
        {
          type: 'docSidebar',
          sidebarId: 'contributingSidebar',
          position: 'left',
          label: 'Contributing',
        },
        {
          href: 'https://github.com/openmobilehub/react-native-omh-maps',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation & guides',
          items: [
            {
              label: 'Getting started',
              to: '/docs/getting-started',
            },
            {
              label: 'Advanced usage',
              to: '/docs/advanced-usage',
            },
          ],
        },
        {
          title: 'API Reference',
          items: [
            {
              label: 'API Reference',
              to: '/docs/api',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Twitter',
              href: 'https://twitter.com/openmobilehub',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/openmobilehub/react-native-omh-maps',
            },
            {
              label: 'Android OMH Maps GitHub',
              href: 'https://github.com/openmobilehub/android-omh-maps',
            },
            {
              label: 'OMH Project Homepage',
              href: 'https://openmobilehub.com',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} OpenMobileHub. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    colorMode: {
      defaultMode: 'dark',
    },
  } satisfies Preset.ThemeConfig,
  plugins: [
    [
      'docusaurus-plugin-typedoc',
      // docusaurus-plugin-typedoc / TypeDoc options
      {
        entryPoints,
        tsconfig: '../tsconfig.json',
        cleanOutputDir: true,

        // sanitize README.md link to CONTRIBUTING.md
        plugin: ['typedoc-plugin-replace-text'],
        replaceText: {
          inCodeCommentText: true,
          inCodeCommentTags: true,
          inIncludedFiles: true,
          replacements: [
            {
              pattern: ']\\(CONTRIBUTING.md\\)',
              replace: '](../contributing.mdx)',
            },
          ],
        },
      } as import('typedoc').TypeDocOptionMap &
        import('typedoc-plugin-replace-text').Config as any,
    ],
  ],
};

export default config;
