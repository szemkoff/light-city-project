import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, Building2, Brain, Leaf, CheckCircle, TrendingUp, Users, DollarSign } from 'lucide-react';
import { heroContent, visionSnapshots, keyHighlights, projectStats, delphininspiration } from '../data/mockData';
import '../styles/HomePage.css';

const HomePage = () => {
  const [visibleStats, setVisibleStats] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const statsSection = document.getElementById('stats-section');
      if (statsSection) {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          setVisibleStats(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEmailSignup = (e) => {
    e.preventDefault();
    // Mock signup - will connect to backend later
    console.log('Email signup:', emailInput);
    alert('Thank you for your interest! We\'ll keep you updated.');
    setEmailInput('');
  };

  const iconMap = {
    building: Building2,
    brain: Brain,
    leaf: Leaf
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="flower-of-life-pattern"></div>
        </div>
        <div className="hero-content">
          <h1 className="hero-headline">{heroContent.headline}</h1>
          <p className="hero-subheadline">{heroContent.subheadline}</p>
          <div className="hero-cta-buttons">
            {heroContent.ctaButtons.map((btn, idx) => (
              <Link key={idx} to={btn.link} className={`cta-button ${btn.type}`}>
                {btn.text}
              </Link>
            ))}
          </div>
        </div>
        <div className="scroll-indicator">
          <ArrowDown className="bounce" />
        </div>
      </section>

      {/* Vision Snapshot Section */}
      <section className="vision-snapshot-section">
        <div className="container">
          <div className="section-grid">
            {visionSnapshots.map((item) => {
              const IconComponent = iconMap[item.icon];
              return (
                <div key={item.id} className="vision-card">
                  <div className="vision-icon">
                    <IconComponent size={48} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <Link to={item.link} className="vision-link">Learn More →</Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Highlights Section */}
      <section className="highlights-section">
        <div className="container">
          <h2 className="section-title">Built on Proven Foundations</h2>
          {keyHighlights.map((highlight, idx) => (
            <div key={highlight.id} className={`highlight-row ${idx % 2 === 1 ? 'reverse' : ''}`}>
              <div className="highlight-content">
                <h3>{highlight.title}</h3>
                <p>{highlight.description}</p>
                <div className="highlight-stat">
                  <CheckCircle size={20} />
                  <span>{highlight.stat}</span>
                </div>
              </div>
              <div className="highlight-image">
                <div className="image-placeholder">{highlight.title}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats-section" className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{visibleStats ? projectStats.visualDiagrams : 0}+</div>
              <div className="stat-label">Visual Diagrams</div>
              <p>Comprehensive documentation</p>
            </div>
            <div className="stat-card">
              <div className="stat-number">{visibleStats ? projectStats.stageComplete : 0}%</div>
              <div className="stat-label">Stage 1 Complete</div>
              <p>Active development</p>
            </div>
            <div className="stat-card">
              <div className="stat-number">{visibleStats ? projectStats.developmentStages : 0}</div>
              <div className="stat-label">Development Stages</div>
              <p>Clear roadmap</p>
            </div>
            <div className="stat-card">
              <div className="stat-number">{projectStats.investmentRange}</div>
              <div className="stat-label">Investment Range</div>
              <p>Phased capital needs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Delphin Inspiration Section */}
      <section className="delphin-section">
        <div className="container">
          <div className="delphin-content">
            <div className="delphin-text">
              <h2>Inspired by Delphin: An Archetypal Crystal City</h2>
              <p className="delphin-intro">
                Delphin is described in channeled/contact information as a crystal city on planet Israel (another star system). 
                We treat this as inspirational reference and design archetype rather than empirical evidence. 
                The principles—central spire, communospheres, sacred geometry—align with Light City's vision and provide a coherent design pattern.
              </p>
              <div className="comparison-table">
                <div className="table-header">
                  <div>Aspect</div>
                  <div>Delphin (Off-World)</div>
                  <div>Light City (Earth)</div>
                </div>
                {delphininspiration.comparison.map((row, idx) => (
                  <div key={idx} className="table-row">
                    <div className="table-cell">{row.aspect}</div>
                    <div className="table-cell">{row.delphin}</div>
                    <div className="table-cell">{row.lightCity}</div>
                  </div>
                ))}
              </div>
              <Link to="/about" className="cta-button secondary">Learn More About Our Design</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="section-title">Join the Movement</h2>
          <div className="cta-grid">
            <Link to="/investors" className="cta-card">
              <TrendingUp size={48} className="cta-icon" />
              <h3>Investors</h3>
              <p>Review Financial Model</p>
              <span className="cta-subtext">8-12% IRR, impact-first</span>
            </Link>
            <Link to="/residents" className="cta-card">
              <Users size={48} className="cta-icon" />
              <h3>Residents</h3>
              <p>Explore Living Experience</p>
              <span className="cta-subtext">$500-$1,700/month, community governance</span>
            </Link>
            <Link to="/builders" className="cta-card">
              <Building2 size={48} className="cta-icon" />
              <h3>Builders</h3>
              <p>See Technical Specs</p>
              <span className="cta-subtext">TRL 7-9 technologies, phased construction</span>
            </Link>
          </div>

          {/* Email Signup */}
          <div className="email-signup">
            <h3>Stay Connected</h3>
            <form onSubmit={handleEmailSignup} className="signup-form">
              <input
                type="email"
                placeholder="Enter your email for updates"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
              />
              <button type="submit" className="cta-button primary">Subscribe</button>
            </form>
            <p className="privacy-note">We respect your privacy. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
