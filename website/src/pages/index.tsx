import React from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import PageLayout from '../components/PageLayout';
import { WEB3FORMS_SUBMIT_URL, buildSiteAbsoluteUrl } from '../contactConfig';
import clsx from 'clsx';
import styles from './index.module.css';

function HeroSection() {
  const heroImg = useBaseUrl('img/inspiration/light-city-vision-1.jpg');

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
              <Link className={clsx('button', styles.buttonSecondary)} to="/contact">
                Contact
              </Link>
            </div>
          </div>
          <div className={styles.heroImage}>
            <img src={heroImg} alt="Light City Vision" />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const architectureIcon = useBaseUrl('img/icons/architecture-icon.svg');
  const consciousnessIcon = useBaseUrl('img/icons/consciousness-icon.svg');
  const regenerativeIcon = useBaseUrl('img/icons/regenerative-icon.svg');
  const features = [
    {
      iconPath: architectureIcon,
      title: 'Sacred Architecture',
      description: '30-90m communosphere domes using proven CLT & BIPV technology',
      link: '/about',
    },
    {
      iconPath: consciousnessIcon,
      title: 'Unity Consciousness',
      description: 'Research-grade protocols for consciousness field studies (TRL 1-3)',
      link: '/researchers',
    },
    {
      iconPath: regenerativeIcon,
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
  const { siteConfig } = useDocusaurusContext();
  const location = useLocation();
  const newsletterOk = new URLSearchParams(location.search).get('newsletter') === '1';
  const accessKey =
    (siteConfig.customFields as { web3formsAccessKey?: string } | undefined)?.web3formsAccessKey ?? '';
  const nextHome = buildSiteAbsoluteUrl(siteConfig.url, siteConfig.baseUrl, '?newsletter=1');

  const investorsIcon = useBaseUrl('img/icons/investors-icon.svg');
  const residentsIcon = useBaseUrl('img/icons/residents-icon.svg');
  const buildersIcon = useBaseUrl('img/icons/builders-icon.svg');
  const researchersIcon = useBaseUrl('img/icons/researchers-icon.svg');
  const roles = [
    {
      iconPath: investorsIcon,
      title: 'Investors',
      description: 'Review Financial Model',
      detail: '8-12% IRR, impact-first',
      link: '/investors',
    },
    {
      iconPath: residentsIcon,
      title: 'Residents',
      description: 'Explore Living Experience',
      detail: '$500-$1,700/month, community governance',
      link: '/residents',
    },
    {
      iconPath: buildersIcon,
      title: 'Builders',
      description: 'See Technical Specs',
      detail: 'TRL 7-9 technologies, phased construction',
      link: '/builders',
    },
    {
      iconPath: researchersIcon,
      title: 'Researchers',
      description: 'Protocols & Open Questions',
      detail: 'TRL 1-3 scope, ethics-first measurement',
      link: '/researchers',
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
          <h3 className={styles.newsletterTitle}>Stay connected</h3>
          {newsletterOk ? (
            <p className={styles.newsletterThanks} role="status">
              Thanks — your signup was sent. If the form service is configured, you should receive a confirmation.
            </p>
          ) : null}
          {accessKey ? (
            <form className={styles.newsletterForm} action={WEB3FORMS_SUBMIT_URL} method="POST">
              <input type="hidden" name="access_key" value={accessKey} />
              <input type="hidden" name="subject" value="Light City Project - Newsletter signup" />
              <input type="hidden" name="redirect" value={nextHome} />
              <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} />
              <input type="hidden" name="name" value="Newsletter signup" />
              <input type="hidden" name="role" value="Newsletter" />
              <input type="hidden" name="message" value="Signed up from homepage." />
              <input
                type="email"
                name="email"
                required
                placeholder="Email for project updates"
                className={styles.newsletterInput}
                autoComplete="email"
              />
              <button type="submit" className={clsx('button', styles.buttonPrimary)}>
                Subscribe
              </button>
            </form>
          ) : (
            <p className={styles.newsletterDisclaimer}>
              Newsletter uses the same backend as the <Link to="/contact">contact form</Link> once{' '}
              <code>WEB3FORMS_ACCESS_KEY</code> is set for the site build.
            </p>
          )}
          <p className={styles.newsletterDisclaimer}>
            For a full inquiry, use the <Link to="/contact">contact form</Link> and choose your role. We respect your
            privacy.
          </p>
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
