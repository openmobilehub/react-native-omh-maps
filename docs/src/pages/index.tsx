import clsx from 'clsx';

import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';

import styles from './index.module.css';

type HomepageLink = Record<'text' | 'link', string>;

const HOMEPAGE_LINKS: HomepageLink[] = [
  {
    text: 'Get started 🚀',
    link: '/docs/getting-started',
  },
  {
    text: 'API reference 📚',
    link: '/docs/api',
  },
  {
    text: 'Contribute 🤝',
    link: '/docs/contributing',
  },
];

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="RN OMH Maps landing page"
      description="OMH Maps for React Native">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>

          <p className="hero__subtitle">{siteConfig.tagline}</p>

          <div className={styles.buttons}>
            {[
              HOMEPAGE_LINKS.map(({ text, link }, index) => (
                <Link
                  key={index}
                  className={clsx(
                    'button button--secondary button--lg',
                    styles.homepageButton
                  )}
                  to={link}>
                  {text}
                </Link>
              )),
            ]}
          </div>
        </div>
      </header>

      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
