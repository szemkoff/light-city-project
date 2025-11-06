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
              src="/light-city-project/img/inspiration/light-city-vision-1.jpg" 
              alt="Light City Vision"
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HighlightsSection() {
  return (
    <section className={styles.highlightsSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Why Light City Matters Now</h2>
        <div className="row">
          <div className="col col--3">
            <div className={styles.highlight}>
              <div className={styles.highlightIcon}>🔮</div>
              <h3>Proven Technology</h3>
              <p>Based on Delphin, an existing crystal city that demonstrates these principles work in reality.</p>
            </div>
          </div>
          <div className="col col--3">
            <div className={styles.highlight}>
              <div className={styles.highlightIcon}>⚡</div>
              <h3>Zero-Point Energy</h3>
              <p>Crystal spire technology provides unlimited clean energy without external power sources.</p>
            </div>
          </div>
          <div className="col col--3">
            <div className={styles.highlight}>
              <div className={styles.highlightIcon}>🧠</div>
              <h3>Unity Consciousness</h3>
              <p>Resonance fields naturally maintain awareness connection and instant knowledge sharing.</p>
            </div>
          </div>
          <div className="col col--3">
            <div className={styles.highlight}>
              <div className={styles.highlightIcon}>🌟</div>
              <h3>Sacred Design</h3>
              <p>Every structure based on sacred geometry that elevates consciousness and inspires beauty.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className={styles.statsSection}>
      <div className="container">
        <div className="row">
          <div className="col col--3">
            <div className={styles.stat}>
              <div className={styles.statNumber}>15+</div>
              <div className={styles.statLabel}>Visual Diagrams</div>
            </div>
          </div>
          <div className="col col--3">
            <div className={styles.stat}>
              <div className={styles.statNumber}>60%</div>
              <div className={styles.statLabel}>Stage 1 Complete</div>
            </div>
          </div>
          <div className="col col--3">
            <div className={styles.stat}>
              <div className={styles.statNumber}>6</div>
              <div className={styles.statLabel}>Development Stages</div>
            </div>
          </div>
          <div className="col col--3">
            <div className={styles.stat}>
              <div className={styles.statNumber}>∞</div>
              <div className={styles.statLabel}>Potential Impact</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DelphinSection() {
  return (
    <section className={styles.delphinSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Inspired by Delphin - A Real Crystal City</h2>
        <div className="row">
          <div className="col col--6">
            <div className={styles.delphinText}>
              <p>
                <strong>Light City isn't just a dream—it's based on a working model.</strong>
              </p>
              <p>
                Delphin is an actual crystal city on the planet Israel in another star system. Through 
                channeled contact, we've received detailed specifications about its architecture and 
                technology, providing a proven blueprint for Earth.
              </p>
              <p>
                <strong>Key Features:</strong>
              </p>
              <ul>
                <li>40,000-foot crystal spire generating all energy</li>
                <li>Communospheres housing 10,000+ people each</li>
                <li>Resonance technology maintaining consciousness connection</li>
                <li>Instantaneous knowledge transfer through resonant fields</li>
                <li>Concentric ring design with sacred geometry</li>
              </ul>
              <p>
                This isn't speculation—it's adaptation of proven, functioning technology.
              </p>
              <Link to="/docs/concepts/communospheres" className="button button--primary">
                Learn About Delphin →
              </Link>
            </div>
          </div>
          <div className="col col--6">
            <img 
              src="/light-city-project/img/inspiration/delphin-aerial-view-2.png" 
              alt="Delphin Crystal City"
              className={styles.visionImage}
            />
            <p className={styles.imageCaption}>
              Aerial view of Delphin showing the central crystal spire and surrounding communospheres
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CallToActionSection() {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <h2 className={styles.ctaTitle}>Ready to Explore the Vision?</h2>
        <p className={styles.ctaText}>
          Light City is an open project documenting a higher-consciousness civilization. 
          Dive into the complete documentation, explore sacred geometry diagrams, and discover 
          how this vision can become reality.
        </p>
        <div className={styles.ctaButtons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/START-HERE">
            📖 Read Documentation
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/concepts/sacred-geometry">
            ✨ View Sacred Geometry
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/blog">
            📝 Latest Updates
          </Link>
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
        <HighlightsSection />
        <VisionSection />
        <StatsSection />
        <DelphinSection />
        <CallToActionSection />
      </main>
    </Layout>
  );
}

