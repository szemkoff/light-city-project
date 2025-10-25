import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className={styles.heroOverlay}></div>
      <div className="container" style={{position: 'relative', zIndex: 1}}>
        <Heading as="h1" className="hero__title" style={{
          fontSize: '4rem',
          fontWeight: 700,
          textShadow: '0 4px 12px rgba(0,0,0,0.5)',
          marginBottom: '1rem'
        }}>
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle" style={{
          fontSize: '1.5rem',
          textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          marginBottom: '2rem'
        }}>
          {siteConfig.tagline}
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/START-HERE"
            style={{
              marginRight: '1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              color: '#2e3440'
            }}>
            🌟 Start Here
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/docs/concepts/core-concepts"
            style={{
              borderColor: 'rgba(255, 255, 255, 0.9)',
              color: 'white'
            }}>
            Explore the Vision
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomepageContent() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row" style={{marginBottom: '4rem'}}>
          <div className="col col--12" style={{textAlign: 'center'}}>
            <Heading as="h2" style={{fontSize: '2.5rem', marginBottom: '1rem'}}>
              A Blueprint for Higher-Consciousness Civilization
            </Heading>
            <p style={{fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', color: '#666'}}>
              Light City represents a future where humanity operates with higher ethics, compassion, and unity. 
              It exists as both an etheric blueprint and a practical framework for manifestation on Earth.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col col--4">
            <div className={styles.featureCard}>
              <Heading as="h3">✨ Spiritual Foundation</Heading>
              <p>
                Rooted in higher-dimensional principles, sacred geometry, and consciousness evolution. 
                A city designed to elevate human awareness and connection.
              </p>
              <Link to="/docs/concepts/philosophy">Learn More →</Link>
            </div>
          </div>
          <div className="col col--4">
            <div className={styles.featureCard}>
              <Heading as="h3">🏛️ Sacred Architecture</Heading>
              <p>
                Inspired by the crystal city of Delphin, featuring a 40,000-foot central spire, 
                communospheres, and resonance technology.
              </p>
              <Link to="/docs/design/architecture">Explore Design →</Link>
            </div>
          </div>
          <div className="col col--4">
            <div className={styles.featureCard}>
              <Heading as="h3">🌍 Practical Manifestation</Heading>
              <p>
                A 6-stage development roadmap from vision to reality, with documentation, 
                tools, and community frameworks for implementation.
              </p>
              <Link to="/docs/project/development-stages">See Roadmap →</Link>
            </div>
          </div>
        </div>

        <div className="row" style={{marginTop: '4rem'}}>
          <div className="col col--6">
            <img 
              src="/light-city-project/img/light-city-vision-1.jpg" 
              alt="Light City Vision" 
              style={{
                width: '100%', 
                borderRadius: '12px', 
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
              }} 
            />
            <p style={{textAlign: 'center', marginTop: '1rem', fontStyle: 'italic', color: '#666'}}>
              Original Light City Vision
            </p>
          </div>
          <div className="col col--6">
            <img 
              src="/light-city-project/img/delphin-aerial-view-1.png" 
              alt="Delphin Crystal City" 
              style={{
                width: '100%', 
                borderRadius: '12px', 
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
              }} 
            />
            <p style={{textAlign: 'center', marginTop: '1rem', fontStyle: 'italic', color: '#666'}}>
              Delphin: A Living Example on Another World
            </p>
          </div>
        </div>

        <div className="row" style={{marginTop: '4rem', marginBottom: '4rem'}}>
          <div className="col col--12" style={{textAlign: 'center'}}>
            <Heading as="h2" style={{fontSize: '2rem', marginBottom: '1.5rem'}}>
              "The city is in the sky until it is in your hands."
            </Heading>
            <p style={{fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto 2rem', color: '#666'}}>
              To build it on Terra, begin building it in hearts. Structures follow spirit.
            </p>
            <Link
              className="button button--primary button--lg"
              to="/docs/START-HERE">
              Begin Your Journey
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome`}
      description="A comprehensive framework for manifesting Light City - a higher-consciousness civilization integrating spiritual principles, sacred architecture, and advanced energy systems.">
      <HomepageHeader />
      <main>
        <HomepageContent />
      </main>
    </Layout>
  );
}
