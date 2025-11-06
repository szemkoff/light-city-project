import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className={styles.heroImage}>
        <img 
          src="/light-city-project/img/inspiration/light-city-vision-1.jpg" 
          alt="Light City Vision" 
          className={styles.backgroundImage}
        />
        <div className={styles.heroOverlay}></div>
      </div>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/START-HERE">
            🌟 Start Here
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/concepts/core-concepts">
            Explore the Vision
          </Link>
        </div>
      </div>
    </header>
  );
}

function FeatureSection() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className="col col--4">
            <div className={styles.feature}>
              <h3>✨ Spiritual Foundation</h3>
              <p>
                Rooted in higher-dimensional principles, sacred geometry, and consciousness evolution. 
                A city designed to elevate human awareness and connection.
              </p>
              <Link to="/docs/concepts/philosophy">Learn More →</Link>
            </div>
          </div>
          <div className="col col--4">
            <div className={styles.feature}>
              <h3>🏛️ Sacred Architecture</h3>
              <p>
                Inspired by the crystal city of Delphin, featuring a central spire, communospheres, 
                and resonance technology that maintains consciousness connection.
              </p>
              <Link to="/docs/design/architecture">Explore Design →</Link>
            </div>
          </div>
          <div className="col col--4">
            <div className={styles.feature}>
              <h3>🌍 Practical Manifestation</h3>
              <p>
                A 6-stage development roadmap from vision to reality, with documentation, tools, 
                and community frameworks for implementation.
              </p>
              <Link to="/docs/project/development-stages">See Roadmap →</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VisionSection() {
  return (
    <section className={styles.visionSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>A Blueprint for Higher-Consciousness Civilization</h2>
        <div className="row">
          <div className="col col--6">
            <img 
              src="/light-city-project/img/inspiration/light-city-vision-2.jpg" 
              alt="Light City Vision 2"
              className={styles.visionImage}
            />
          </div>
          <div className="col col--6">
            <div className={styles.visionText}>
              <p>
                Light City represents a future where humanity operates with higher ethics, compassion, 
                and unity. It exists as both an etheric blueprint and a practical framework for 
                manifestation on Earth.
              </p>
              <p>
                This project documents the vision, architectural principles, energy systems, and 
                development roadmap for creating a city that elevates consciousness and serves as 
                a model for humanity's evolution.
              </p>
              <p>
                <strong>Inspired by Delphin</strong> - a real crystal city on another world - Light City 
                brings these proven principles to Earth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Anchoring a Higher-Consciousness Civilization on Earth">
      <HomepageHeader />
      <main>
        <FeatureSection />
        <VisionSection />
      </main>
    </Layout>
  );
}

