import React from 'react';
import PageLayout from '../components/PageLayout';
import styles from './about.module.css';

export default function About(): JSX.Element {
  return (
    <PageLayout title="About Light City" description="Vision & Philosophy">
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1>Vision & Philosophy</h1>
          <p className={styles.subtitle}>
            Light City is a multidimensional project: an etheric blueprint, a collective vision, 
            and a practical implementation plan.
          </p>
        </div>
      </section>

      {/* Core Principles */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Core Principles</h2>
          <div className={styles.cardGrid}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>🌟</div>
              <h3>Spirit Before Structure</h3>
              <p>
                Light City begins as an etheric template—a higher-dimensional pattern. 
                Physical implementation follows spiritual alignment.
              </p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>🌍</div>
              <h3>Gaia's Memory</h3>
              <p>
                Earth (Gaia) holds the memory of what Light City can be. We are co-creating 
                with planetary consciousness, not imposing.
              </p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>🤝</div>
              <h3>Collective Co-Creation</h3>
              <p>
                Light City is not a single person's vision but an emergent pattern drawing 
                from many consciousness streams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What is Light City */}
      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>What is Light City?</h2>
          <div className={styles.definitionGrid}>
            <div className={styles.definition}>
              <h3>Etheric Blueprint</h3>
              <p>
                A higher-dimensional pattern or template that exists in non-physical realms. 
                Inspired by Delphin (described in channeled information as a crystal city on 
                another world), Light City adapts these archetypal principles to Earth's constraints.
              </p>
            </div>
            <div className={styles.definition}>
              <h3>Collective Vision</h3>
              <p>
                A shared aspiration across consciousness streams—yours, mine, and others drawn 
                to regenerative living, unity consciousness, and sacred geometry. This is not 
                one person's project; it's an emergent pattern.
              </p>
            </div>
            <div className={styles.definition}>
              <h3>Personal Mission</h3>
              <p>
                My role (Stan) is to anchor this vision in the physical. I'm bringing decades 
                of technology experience, systems thinking, and a commitment to rigorous 
                implementation. This is both spiritual service and practical engineering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Purpose & Mission */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Purpose & Mission</h2>
          <div className={styles.missionBox}>
            <p className={styles.missionStatement}>
              To demonstrate that regenerative, consciousness-integrated communities are 
              buildable, scalable, and financially viable using proven technologies and 
              transparent governance.
            </p>
          </div>

          <div className={styles.timelineGrid}>
            <div className={styles.timelineCard}>
              <h4>Short-Term (Q4 2025 - Q2 2026)</h4>
              <ul>
                <li>Complete Stage 1: Foundation (documentation, financial model, governance)</li>
                <li>Complete Stage 2: Design (architecture, engineering, permits prep)</li>
                <li>Build awareness and community</li>
              </ul>
            </div>
            <div className={styles.timelineCard}>
              <h4>Medium-Term (Q3 2026 - Q4 2027)</h4>
              <ul>
                <li>Complete Stage 3: Digital platform (website, CRM, applications)</li>
                <li>Complete Stage 4: Community building (retreats, pilot programs)</li>
                <li>Secure land and permits</li>
              </ul>
            </div>
            <div className={styles.timelineCard}>
              <h4>Long-Term (2028-2031+)</h4>
              <ul>
                <li>Stage 5: Physical construction (200-300 residents, Phase 1)</li>
                <li>Stage 6: Operational community (break-even, scaling)</li>
                <li>Phase 2 & 3 expansion (1,500+, 8,000+ residents)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

