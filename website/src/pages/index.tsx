import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import PageLayout from '../components/PageLayout';
import clsx from 'clsx';
import styles from './index.module.css';

function HeroSection() {
  const { siteConfig } = useDocusaurusContext();
  
  return (
    <section className={styles.heroSection}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              <span className={styles.heroTitleGold}>Light City:</span>{' '}
              <span className={styles.heroTitleGray}>Anchoring Higher-Consciousness Civilization</span>
            </h1>
            <p className={styles.heroSubtitle}>
              A living blueprint for regenerative communities, sacred architecture, and unity consciousness
            </p>
            <div className={styles.heroButtons}>
              <Link className={clsx('button', styles.buttonPrimary)} to="/about">
                Explore the Vision
              </Link>
              <Link className={clsx('button', styles.buttonSecondary)} to="/investors">
                View Financial Model
              </Link>
              <Link className={clsx('button', styles.buttonSecondary)} to="/investors">
                Get Involved
              </Link>
            </div>
          </div>
          <div className={styles.heroImage}>
            <img src="/light-city-project/img/inspiration/light-city-vision-1.jpg" alt="Light City Vision" />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      iconPath: '/light-city-project/img/icons/architecture-icon.svg',
      title: 'Sacred Architecture',
      description: '30-90m communosphere domes using proven CLT & BIPV technology',
      link: '/about',
    },
    {
      iconPath: '/light-city-project/img/icons/consciousness-icon.svg',
      title: 'Unity Consciousness',
      description: 'Research-grade protocols for consciousness field studies (TRL 1-3)',
      link: '/researchers',
    },
    {
      iconPath: '/light-city-project/img/icons/regenerative-icon.svg',
      title: 'Regenerative Living',
      description: 'Zero-waste, renewable energy, permaculture food systems',
      link: '/builders',
    },
  ];

  return (
    <section className={styles.featuresSection}>
      <div className="container">
        <div className={styles.featuresGrid}>
          {features.map((feature, idx) => (
            <div key={idx} className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <img src={feature.iconPath} alt={feature.title} className={styles.featureIcon} />
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
              <Link to={feature.link} className={styles.featureLink}>
                Learn More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FoundationsSection() {
  const foundations = [
    {
      title: 'Proven Technology',
      description: 'Using commercially available technologies (TRL 7-9): Cross-Laminated Timber, Building-Integrated Photovoltaics, geodesic structures',
      highlight: '85.4m tall CLT tower proven (Mjøstårnet, Norway)',
      label: 'Proven Technology',
    },
    {
      title: 'Phased Development',
      description: 'Start small (200 residents, 3 domes), scale systematically (Phase 2: 1,500 residents, Phase 3: 8,000+ residents)',
      highlight: '2025-2031+ with clear milestones',
      label: 'Phased Development',
    },
    {
      title: 'Transparent Governance',
      description: 'Founder-led development (Stages 1-4) transitioning to community governance (Stages 5-6) with clear decision-making framework',
      highlight: 'Community Council voting with 80% consent threshold',
      label: 'Transparent Governance',
    },
    {
      title: 'Investor-Ready',
      description: 'Complete financial model with 3 scenarios, sensitivity analysis, 8-12% IRR for impact investors',
      highlight: 'Break-even at 180 residents',
      label: 'Investor-Ready',
    },
  ];

  return (
    <section className={styles.foundationsSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Built on Proven Foundations</h2>
        <div className={styles.foundationsGrid}>
          {foundations.map((foundation, idx) => (
            <div key={idx} className={styles.foundationCard}>
              <div className={styles.foundationContent}>
                <h3 className={styles.foundationTitle}>{foundation.title}</h3>
                <p className={styles.foundationDescription}>{foundation.description}</p>
                <div className={styles.foundationHighlight}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>{foundation.highlight}</span>
                </div>
              </div>
              <div className={styles.foundationLabel}>{foundation.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { value: '15+', label: 'Visual Diagrams', description: 'Comprehensive documentation' },
    { value: '85%', label: 'Stage 1 Complete', description: 'Active development' },
    { value: '6', label: 'Development Stages', description: 'Clear roadmap' },
    { value: '$22M-$95M', label: 'Investment Range', description: 'Phased capital needs' },
  ];

  return (
    <section className={styles.statsSection}>
      <div className="container">
        <div className={styles.statsGrid}>
          {stats.map((stat, idx) => (
            <div key={idx} className={styles.statCard}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
              <p className={styles.statDescription}>{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DelphinSection() {
  const comparison = [
    { aspect: 'Spire', delphin: '40,000 ft (12 km)', lightCity: '60-300m (200-1,000 ft)' },
    { aspect: 'Communospheres', delphin: '600-1,200 ft, 10K people', lightCity: '30-90m, 80-400 people' },
    { aspect: 'Technology', delphin: 'Advanced consciousness-matter', lightCity: 'Proven: CLT, BIPV, geodesic' },
    { aspect: 'Status', delphin: 'Aspirational reference', lightCity: 'Buildable, investor-ready' },
  ];

  return (
    <section className={styles.delphinSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Inspired by Delphin: An Archetypal Crystal City</h2>
        <p className={styles.delphinIntro}>
          Delphin is described in channeled/contact information as a crystal city on planet Israel (another star system). 
          We treat this as inspirational reference and design archetype rather than empirical evidence. 
          The principles—central spire, communospheres, sacred geometry—align with Light City's vision and provide a coherent design pattern.
        </p>
        <div className={styles.comparisonTable}>
          <div className={styles.tableHeader}>
            <div className={styles.tableCell}>Aspect</div>
            <div className={styles.tableCell}>Delphin (Off-World)</div>
            <div className={styles.tableCell}>Light City (Earth)</div>
          </div>
          {comparison.map((row, idx) => (
            <div key={idx} className={styles.tableRow}>
              <div className={styles.tableCell}>{row.aspect}</div>
              <div className={styles.tableCell}>{row.delphin}</div>
              <div className={styles.tableCell}>{row.lightCity}</div>
            </div>
          ))}
        </div>
        <div className={styles.delphinCTA}>
          <Link to="/about" className={clsx('button', styles.buttonPrimary)}>
            Learn More About Our Design
          </Link>
        </div>
      </div>
    </section>
  );
}

function JoinSection() {
  const roles = [
    {
      iconPath: '/light-city-project/img/icons/investors-icon.svg',
      title: 'Investors',
      description: 'Review Financial Model',
      detail: '8-12% IRR, impact-first',
      link: '/investors',
    },
    {
      iconPath: '/light-city-project/img/icons/residents-icon.svg',
      title: 'Residents',
      description: 'Explore Living Experience',
      detail: '$500-$1,700/month, community governance',
      link: '/residents',
    },
    {
      iconPath: '/light-city-project/img/icons/builders-icon.svg',
      title: 'Builders',
      description: 'See Technical Specs',
      detail: 'TRL 7-9 technologies, phased construction',
      link: '/builders',
    },
  ];

  return (
    <section className={styles.joinSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Join the Movement</h2>
        <div className={styles.rolesGrid}>
          {roles.map((role, idx) => (
            <Link key={idx} to={role.link} className={styles.roleCard}>
              <div className={styles.roleIconWrapper}>
                <img src={role.iconPath} alt={role.title} className={styles.roleIcon} />
              </div>
              <h3 className={styles.roleTitle}>{role.title}</h3>
              <p className={styles.roleDescription}>{role.description}</p>
              <p className={styles.roleDetail}>{role.detail}</p>
            </Link>
          ))}
        </div>
        <div className={styles.newsletterBox}>
          <h3 className={styles.newsletterTitle}>Stay Connected</h3>
          <form className={styles.newsletterForm}>
            <input 
              type="email" 
              placeholder="Enter your email for updates" 
              className={styles.newsletterInput}
            />
            <button type="submit" className={clsx('button', styles.buttonPrimary)}>
              Subscribe
            </button>
          </form>
          <p className={styles.newsletterDisclaimer}>We respect your privacy. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <PageLayout
      title={siteConfig.title}
      description="A living blueprint for regenerative communities, sacred architecture, and unity consciousness">
      <main>
        <HeroSection />
        <FeaturesSection />
        <FoundationsSection />
        <StatsSection />
        <DelphinSection />
        <JoinSection />
      </main>
    </PageLayout>
  );
}
