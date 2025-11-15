import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

// ============================================================================
// HERO SECTION - Full Screen with Animated Gradient & Particles
// ============================================================================
function HeroSection() {
  const {siteConfig} = useDocusaurusContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle system
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle
        ctx.fillStyle = `rgba(255, 215, 0, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className={styles.hero}>
      <canvas ref={canvasRef} className={styles.heroCanvas} />
      <div className={styles.heroBackground} />
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          <span className={styles.gradientText}>Light City</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Anchoring Higher-Consciousness Civilization
        </p>
        <p className={styles.heroDescription}>
          A living blueprint for regenerative communities, sacred architecture, and unity consciousness
        </p>
        <div className={styles.heroButtons}>
          <Link className={`button button--primary button--lg ${styles.heroButton}`} to="/docs/START-HERE">
            🌟 Explore Vision
          </Link>
          <Link className={`button button--secondary button--lg ${styles.heroButton}`} to="/docs/project/development-stages">
            📊 See Roadmap
          </Link>
          <Link className={`button button--secondary button--lg ${styles.heroButton}`} to="/docs/project/contribution-based-residency">
            🏘️ Get Involved
          </Link>
        </div>
        <div className={styles.scrollIndicator}>
          <span>↓</span>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// VISION SNAPSHOT - 3 Image-Backed Cards
// ============================================================================
function VisionSnapshotSection() {
  const cards = [
    {
      title: 'Sacred Architecture',
      description: 'Geodesic domes and crystal spires designed with sacred geometry',
      image: '/light-city-project/img/technology/geodesic-dome.jpg',
      link: '/docs/design/architecture',
      icon: '🏛️',
    },
    {
      title: 'Unity Consciousness',
      description: 'Resonance fields maintaining awareness connection and knowledge sharing',
      image: '/light-city-project/img/diagrams/merkaba.svg',
      link: '/docs/concepts/core-concepts',
      icon: '🧠',
    },
    {
      title: 'Regenerative Living',
      description: 'Permaculture food forests and sustainable community systems',
      image: '/light-city-project/img/inspiration/light-city-vision-2.jpg',
      link: '/docs/concepts/purpose-and-mission',
      icon: '🌱',
    },
  ];

  return (
    <section className={styles.visionSnapshot}>
      <div className="container">
        <h2 className={styles.sectionTitle}>The Vision</h2>
        <div className={styles.cardGrid}>
          {cards.map((card, index) => (
            <Link to={card.link} key={index} className={styles.visionCard}>
              <div className={styles.cardImage} style={{backgroundImage: `url(${card.image})`}}>
                <div className={styles.cardOverlay} />
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardIcon}>{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <span className={styles.cardLink}>Learn More →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// STATS SECTION - Animated Counters with Gradient Background
// ============================================================================
function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: '21', label: 'Documentation Pages', suffix: '+' },
    { number: '85', label: 'Stage 1 Complete', suffix: '%' },
    { number: '6', label: 'Development Stages', suffix: '' },
    { number: '200', label: 'Target Residents', suffix: '+' },
  ];

  return (
    <section ref={sectionRef} className={styles.stats}>
      <div className="container">
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={`${styles.statNumber} ${isVisible ? styles.animate : ''}`}>
                {stat.number}{stat.suffix}
              </div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// DELPHIN SHOWCASE - Split Screen with Comparison
// ============================================================================
function DelphinSection() {
  return (
    <section className={styles.delphin}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Inspired by Delphin</h2>
        <p className={styles.sectionSubtitle}>
          An archetypal crystal city providing proven design principles
        </p>
        <div className={styles.delphinContent}>
          <div className={styles.delphinImage}>
            <img 
              src="/light-city-project/img/inspiration/delphin-aerial-view-2.png" 
              alt="Delphin Crystal City"
            />
          </div>
          <div className={styles.delphinText}>
            <p>
              <strong>Light City adapts principles from Delphin</strong>, described in channeled 
              contact information as an advanced crystal city. We treat this as an inspirational 
              archetype and design reference.
            </p>
            
            <div className={styles.comparisonTable}>
              <table>
                <thead>
                  <tr>
                    <th>Aspect</th>
                    <th>Delphin (Vision)</th>
                    <th>Light City (Earth)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Spire Height</td>
                    <td>40,000 ft</td>
                    <td>60-300m</td>
                  </tr>
                  <tr>
                    <td>Dome Size</td>
                    <td>600-1,200 ft</td>
                    <td>30-90m</td>
                  </tr>
                  <tr>
                    <td>Residents/Dome</td>
                    <td>10,000</td>
                    <td>80-400</td>
                  </tr>
                  <tr>
                    <td>Technology</td>
                    <td>Advanced</td>
                    <td>Proven (TRL 7-9)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Link to="/docs/concepts/communospheres" className="button button--primary">
              Learn About the Design →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// KEY HIGHLIGHTS - Alternating Image/Text Rows
// ============================================================================
function HighlightsSection() {
  const highlights = [
    {
      title: 'Proven Technology',
      description: 'Using commercially available materials and systems with TRL 7-9 ratings',
      points: [
        'Cross-Laminated Timber (CLT) construction',
        'Geodesic dome frameworks',
        'Solar + battery microgrids',
        'Permaculture food systems',
      ],
      image: '/light-city-project/img/technology/clt-construction.jpg',
      link: '/docs/technical/technology-catalog',
    },
    {
      title: 'Phased Development',
      description: 'Start small and scale sustainably with clear milestones',
      points: [
        'Stage 1-2: Foundation & Design (Current)',
        'Stage 3-4: Digital & Community (2026-2027)',
        'Stage 5: Physical Build (2028-2030)',
        'Stage 6: Operations (2031+)',
      ],
      image: '/light-city-project/img/diagrams/development-roadmap.svg',
      link: '/docs/project/development-stages',
    },
    {
      title: 'Transparent Governance',
      description: 'Clear decision-making with community transition plan',
      points: [
        'Founder-led (Stages 1-4)',
        'Community Council (Stage 5+)',
        'Consent-based decisions (80% threshold)',
        'Conflict resolution protocols',
      ],
      image: '/light-city-project/img/inspiration/light-city-vision-1.jpg',
      link: '/docs/project/governance',
    },
    {
      title: 'Investor-Ready',
      description: 'Complete financial model with multiple scenarios',
      points: [
        '3 scenarios (Conservative/Base/Optimistic)',
        '8-12% IRR for impact investors',
        '$22M-$95M budget (phased)',
        'Cross-subsidy revenue model',
      ],
      image: '/light-city-project/img/diagrams/stage-progress.svg',
      link: '/docs/project/development-stages',
    },
  ];

  return (
    <section className={styles.highlights}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Why Light City Works</h2>
        {highlights.map((highlight, index) => (
          <div 
            key={index} 
            className={`${styles.highlightRow} ${index % 2 === 1 ? styles.reverse : ''}`}
          >
            <div className={styles.highlightImage}>
              <img src={highlight.image} alt={highlight.title} />
            </div>
            <div className={styles.highlightText}>
              <h3>{highlight.title}</h3>
              <p>{highlight.description}</p>
              <ul>
                {highlight.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
              <Link to={highlight.link} className={styles.highlightLink}>
                Learn More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================================
// CALL TO ACTION - 3 Paths (Investors, Residents, Builders)
// ============================================================================
function CallToActionSection() {
  const paths = [
    {
      title: 'For Investors',
      description: 'Review financial model, governance, and impact metrics',
      icon: '💼',
      highlights: ['8-12% IRR', '$22M-$95M Budget', 'ESG Impact'],
      link: '/docs/project/development-stages',
      buttonText: 'View Financials',
    },
    {
      title: 'For Residents',
      description: 'Explore living experience, costs, and community culture',
      icon: '🏡',
      highlights: ['$500-$1,700/mo', 'Work-Exchange', 'Community Life'],
      link: '/docs/project/contribution-based-residency',
      buttonText: 'Apply to Live',
    },
    {
      title: 'For Builders',
      description: 'Access technical specs, technology catalog, and blueprints',
      icon: '🔨',
      highlights: ['TRL 7-9', 'CLT + Geodesic', '34 Technologies'],
      link: '/docs/technical/technology-catalog',
      buttonText: 'See Tech Specs',
    },
  ];

  return (
    <section className={styles.cta}>
      <div className="container">
        <h2 className={styles.ctaTitle}>Get Involved</h2>
        <p className={styles.ctaSubtitle}>
          Choose your path to participate in Light City
        </p>
        <div className={styles.ctaGrid}>
          {paths.map((path, index) => (
            <div key={index} className={styles.ctaCard}>
              <div className={styles.ctaIcon}>{path.icon}</div>
              <h3>{path.title}</h3>
              <p>{path.description}</p>
              <ul className={styles.ctaHighlights}>
                {path.highlights.map((highlight, i) => (
                  <li key={i}>{highlight}</li>
                ))}
              </ul>
              <Link to={path.link} className="button button--primary button--lg">
                {path.buttonText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// NEWSLETTER SIGNUP
// ============================================================================
function NewsletterSection() {
  return (
    <section className={styles.newsletter}>
      <div className="container">
        <h2>Stay Updated</h2>
        <p>Join our community and receive progress updates</p>
        <div className={styles.newsletterForm}>
          <input 
            type="email" 
            placeholder="Enter your email" 
            className={styles.newsletterInput}
          />
          <button className="button button--primary">Subscribe</button>
        </div>
        <p className={styles.newsletterNote}>
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}

// ============================================================================
// MAIN HOMEPAGE COMPONENT
// ============================================================================
export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Anchoring a Higher-Consciousness Civilization on Earth - A blueprint for regenerative communities, sacred architecture, and unity consciousness">
      <HeroSection />
      <main>
        <VisionSnapshotSection />
        <StatsSection />
        <DelphinSection />
        <HighlightsSection />
        <CallToActionSection />
        <NewsletterSection />
      </main>
    </Layout>
  );
}
