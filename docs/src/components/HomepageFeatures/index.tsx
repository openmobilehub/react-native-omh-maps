import clsx from 'clsx';

import Heading from '@theme/Heading';

import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'OMH means speed',
    Svg: require('@site/static/img/banner-progress.svg').default,
    description: (
      <>
        Save time and effort by enabling a single implementation to support any
        Android device.
      </>
    ),
  },
  {
    title: 'Simplicity of development',
    Svg: require('@site/static/img/banner-note-taking.svg').default,
    description: (
      <>
        OMH Maps unified, provider-agnostic interface simplifies development of
        apps for GMS and non-GMS maps users.
      </>
    ),
  },
  {
    title: 'Power of React Native',
    Svg: require('@site/static/img/banner-coding.svg').default,
    description: (
      <>
        RN OMH Maps is a client library that makes it easy to integrate maps on
        all types of devices and eliminates the need for separate codebases.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
