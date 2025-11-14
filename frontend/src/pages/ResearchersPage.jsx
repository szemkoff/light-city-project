import React from 'react';
import { Microscope, Brain, HeartPulse, Leaf } from 'lucide-react';
import { researcherData } from '../data/mockData';
import '../styles/ResearchersPage.css';

const ResearchersPage = () => {
  return (
    <div className="researchers-page">
      <section className="researcher-hero">
        <div className="container">
          <h1>Advance Consciousness & Regenerative Science</h1>
          <p className="hero-subtitle">
            Collaborate on rigorous research with ethical protocols
          </p>
        </div>
      </section>

      <section className="research-areas">
        <div className="container">
          <h2 className="section-title">Research Areas</h2>
          <div className="research-grid">
            {researcherData.researchAreas.map((area, idx) => (
              <div key={idx} className="research-card">
                <div className="research-header">
                  <div className="trl-badge">{area.trl}</div>
                  <h3>{area.title}</h3>
                </div>
                <div className="research-details">
                  <div className="detail-item">
                    <strong>Hypothesis:</strong>
                    <p>{area.hypothesis}</p>
                  </div>
                  <div className="detail-item">
                    <strong>Methods:</strong>
                    <p>{area.methods}</p>
                  </div>
                  <div className="detail-item">
                    <strong>Status:</strong>
                    <p>{area.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="protocols-ethics">
        <div className="container">
          <h2 className="section-title">Research Protocols & Ethics</h2>
          <div className="ethics-content">
            <div className="ethics-box">
              <h3>Research Hygiene</h3>
              <ul>
                <li>Preregistered protocols (Open Science Framework)</li>
                <li>Blinded/sham sessions where applicable</li>
                <li>Third-party observers and replication</li>
                <li>Publish null results (no p-hacking)</li>
                <li>Public datasets (anonymized)</li>
              </ul>
            </div>
            <div className="ethics-box">
              <h3>IRB Approval</h3>
              <ul>
                <li>All human-subject research requires IRB approval</li>
                <li>Informed consent with detailed disclosure</li>
                <li>Right to withdraw without penalty</li>
                <li>Privacy protection (thoughts not broadcast)</li>
              </ul>
            </div>
            <div className="ethics-box">
              <h3>Ethics Framework</h3>
              <ul>
                <li>Consent UI: Physical/digital toggle for participation</li>
                <li>Opt-out zones: Quiet rooms, no-program hours (10 PM - 7 AM)</li>
                <li>Sensitive groups: Extra caution for children, pregnant women</li>
                <li>Autonomy: Right to disconnect anytime, no penalty</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="instrumentation">
        <div className="container">
          <h2 className="section-title">Measurement & Instrumentation</h2>
          <div className="instrument-grid">
            {researcherData.instrumentation.map((cat, idx) => (
              <div key={idx} className="instrument-card">
                <h3>{cat.category}</h3>
                <p>{cat.tools}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="collaboration">
        <div className="container">
          <div className="collab-box">
            <h2>Collaboration Opportunities</h2>
            <div className="collab-content">
              <div className="collab-section">
                <h3>We're Seeking Partnerships With:</h3>
                <ul>
                  <li>Universities (consciousness studies, sustainable design, agriculture)</li>
                  <li>Research institutes (HeartMath, Institute of Noetic Sciences, Bioneers)</li>
                  <li>Independent researchers (PhD students, postdocs)</li>
                  <li>Technology companies (biosensor manufacturers, software developers)</li>
                </ul>
              </div>
              <div className="collab-section">
                <h3>What We Offer:</h3>
                <ul>
                  <li>Real-world testbed (200-8,000 residents)</li>
                  <li>Instrumentation and data infrastructure</li>
                  <li>Funding for approved studies (grants, in-kind support)</li>
                  <li>Co-authorship on publications</li>
                  <li>Long-term research relationships (multi-year studies)</li>
                </ul>
              </div>
            </div>
            <div className="cta-buttons">
              <button className="cta-button primary">Submit Research Proposal</button>
              <button className="cta-button secondary">Download Research Protocols</button>
            </div>
            <p className="contact-info">Contact: <a href="mailto:researchers@lightcityproject.org">researchers@lightcityproject.org</a></p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResearchersPage;
