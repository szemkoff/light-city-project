import React from 'react';
import { Sparkles, Heart, Globe } from 'lucide-react';
import '../styles/AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1>Vision & Philosophy</h1>
          <p className="hero-subtitle">
            Light City is a multidimensional project: an etheric blueprint, a collective vision, and a practical implementation plan.
          </p>
        </div>
      </section>

      <section className="core-principles">
        <div className="container">
          <h2 className="section-title">Core Principles</h2>
          <div className="principles-grid">
            <div className="principle-card">
              <Sparkles size={48} className="principle-icon" />
              <h3>Spirit Before Structure</h3>
              <p>
                Light City begins as an etheric template—a higher-dimensional pattern. Physical implementation follows spiritual alignment.
              </p>
            </div>
            <div className="principle-card">
              <Heart size={48} className="principle-icon" />
              <h3>Gaia's Memory</h3>
              <p>
                Earth (Gaia) holds the memory of what Light City can be. We are co-creating with planetary consciousness, not imposing.
              </p>
            </div>
            <div className="principle-card">
              <Globe size={48} className="principle-icon" />
              <h3>Collective Co-Creation</h3>
              <p>
                Light City is not a single person's vision but an emergent pattern drawing from many consciousness streams.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="what-is-light-city">
        <div className="container">
          <h2 className="section-title">What is Light City?</h2>
          <div className="definition-boxes">
            <div className="def-box">
              <h3>Etheric Blueprint</h3>
              <p>
                A higher-dimensional pattern or template that exists in non-physical realms. Inspired by Delphin 
                (described in channeled information as a crystal city on another world), Light City adapts these 
                archetypal principles to Earth's constraints.
              </p>
            </div>
            <div className="def-box">
              <h3>Collective Vision</h3>
              <p>
                A shared aspiration across consciousness streams—yours, mine, and others drawn to regenerative living, 
                unity consciousness, and sacred geometry. This is not one person's project; it's an emergent pattern.
              </p>
            </div>
            <div className="def-box">
              <h3>Personal Mission</h3>
              <p>
                My role (Stan) is to anchor this vision in the physical. I'm bringing decades of technology experience, 
                systems thinking, and a commitment to rigorous implementation. This is both spiritual service and practical engineering.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="purpose-mission">
        <div className="container">
          <h2 className="section-title">Purpose & Mission</h2>
          <div className="mission-content">
            <p className="mission-statement">
              To demonstrate that regenerative, consciousness-integrated communities are buildable, scalable, 
              and financially viable using proven technologies and transparent governance.
            </p>
            <div className="timeline-phases">
              <div className="phase">
                <h4>Short-Term (Q4 2025 - Q2 2026)</h4>
                <ul>
                  <li>Complete Stage 1: Foundation (documentation, financial model, governance)</li>
                  <li>Complete Stage 2: Design (architecture, engineering, permits prep)</li>
                  <li>Build awareness and community</li>
                </ul>
              </div>
              <div className="phase">
                <h4>Medium-Term (Q3 2026 - Q4 2027)</h4>
                <ul>
                  <li>Complete Stage 3: Digital platform (website, CRM, applications)</li>
                  <li>Complete Stage 4: Community building (retreats, pilot programs)</li>
                  <li>Secure land and permits</li>
                </ul>
              </div>
              <div className="phase">
                <h4>Long-Term (2028-2031+)</h4>
                <ul>
                  <li>Stage 5: Physical construction (200-300 residents, Phase 1)</li>
                  <li>Stage 6: Operational community (break-even, scaling)</li>
                  <li>Phase 2 & 3 expansion (1,500+, 8,000+ residents)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
