import React, { useState } from 'react';
import { Home, Users, Calendar, CheckCircle } from 'lucide-react';
import { residentData } from '../data/mockData';
import '../styles/ResidentsPage.css';

const ResidentsPage = () => {
  const [activeTab, setActiveTab] = useState('daily-life');

  return (
    <div className="residents-page">
      {/* Hero */}
      <section className="resident-hero">
        <div className="container">
          <h1>Live in Coherence</h1>
          <p className="hero-subtitle">
            Experience regenerative community living in sacred architecture
          </p>
        </div>
      </section>

      {/* Living Experience Tabs */}
      <section className="living-experience">
        <div className="container">
          <div className="tabs-container">
            <div className="tabs-header">
              <button
                className={`tab-button ${activeTab === 'daily-life' ? 'active' : ''}`}
                onClick={() => setActiveTab('daily-life')}
              >
                <Calendar size={20} />
                Daily Life
              </button>
              <button
                className={`tab-button ${activeTab === 'units' ? 'active' : ''}`}
                onClick={() => setActiveTab('units')}
              >
                <Home size={20} />
                Unit Types & Costs
              </button>
              <button
                className={`tab-button ${activeTab === 'community' ? 'active' : ''}`}
                onClick={() => setActiveTab('community')}
              >
                <Users size={20} />
                Community Structure
              </button>
            </div>

            <div className="tabs-content">
              {activeTab === 'daily-life' && (
                <div className="tab-panel">
                  <h2>A Day in Light City</h2>
                  <p className="tab-intro">
                    Experience the rhythm of regenerative living with optional community activities and personal freedom.
                  </p>

                  <div className="daily-timeline">
                    {residentData.dailySchedule.map((item, idx) => (
                      <div key={idx} className="timeline-item">
                        <div className="timeline-time">{item.time}</div>
                        <div className="timeline-activity">{item.activity}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'units' && (
                <div className="tab-panel">
                  <h2>Unit Types & Pricing</h2>
                  <p className="tab-intro">
                    Choose from a range of living spaces designed for different lifestyles and budgets.
                  </p>

                  <div className="units-grid">
                    {residentData.unitTypes.map((unit, idx) => (
                      <div key={idx} className="unit-card">
                        <div className="unit-header">
                          <h3>{unit.type}</h3>
                          <div className="unit-size">{unit.size}</div>
                        </div>
                        <div className="unit-pricing">
                          <div className="monthly-fee">{unit.monthlyFee}/month</div>
                          <div className="annual-fee">{unit.annual} annually</div>
                        </div>
                        <ul className="unit-features">
                          {unit.features.map((feature, fidx) => (
                            <li key={fidx}>
                              <CheckCircle size={16} />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <div className="unit-availability">
                          {unit.availability} units available
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="whats-included">
                    <h3>What's Included</h3>
                    <div className="amenities-grid">
                      {residentData.includedAmenities.map((amenity, idx) => (
                        <div key={idx} className="amenity-item">
                          <CheckCircle size={20} className="check-icon" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'community' && (
                <div className="tab-panel">
                  <h2>Community Structure</h2>
                  <p className="tab-intro">
                    Transparent governance transitioning from founder-led to community-governed.
                  </p>

                  <div className="governance-section">
                    <div className="governance-card">
                      <h3>Stages 1-4: Founder-Led Development</h3>
                      <p>During the development phase, decisions are made by the founder to ensure agility and focused execution.</p>
                    </div>
                    <div className="governance-card">
                      <h3>Stages 5-6: Community Council</h3>
                      <p>Once operational, residents elect a Community Council (1 rep per 50 residents) using consent-based decision-making (80% threshold).</p>
                    </div>
                  </div>

                  <div className="community-features">
                    <div className="feature-box">
                      <h4>Monthly Town Halls</h4>
                      <p>All residents participate in monthly governance meetings to discuss budgets, programs, and major decisions.</p>
                    </div>
                    <div className="feature-box">
                      <h4>Committees</h4>
                      <p>Finance, Facilities, Programs, Conflict Resolution, and Membership committees manage day-to-day operations.</p>
                    </div>
                    <div className="feature-box">
                      <h4>Conflict Resolution</h4>
                      <p>4-stage process: direct conversation → mediation → committee review → council decision.</p>
                    </div>
                    <div className="feature-box">
                      <h4>Community Agreements</h4>
                      <p>Respect for diversity, participation in governance, sustainability practices, and quiet hours (10 PM - 7 AM).</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="application-process">
        <div className="container">
          <h2 className="section-title">Application Process</h2>
          <div className="process-flow">
            <div className="flow-step">
              <div className="flow-number">1</div>
              <h3>Inquiry</h3>
              <p>Attend retreat or info session ($200-$500, credited toward deposit if accepted)</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <div className="flow-number">2</div>
              <h3>Application</h3>
              <p>Submit written application + 3 references</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <div className="flow-number">3</div>
              <h3>Interview</h3>
              <p>Video call with Membership Committee (1 hour)</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <div className="flow-number">4</div>
              <h3>Trial Stay</h3>
              <p>1-4 week trial residency ($50-$100/night, credited)</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <div className="flow-number">5</div>
              <h3>Decision</h3>
              <p>Committee recommendation, Council approval (2-4 weeks)</p>
            </div>
          </div>
          <p className="process-timeline">Timeline: 2-4 months from inquiry to move-in</p>
        </div>
      </section>

      {/* CTA */}
      <section className="resident-cta">
        <div className="container">
          <div className="cta-box">
            <h2>Ready to Apply?</h2>
            <div className="cta-buttons">
              <button className="cta-button primary">Attend an Info Session</button>
              <button className="cta-button secondary">Download Resident Guide</button>
              <button className="cta-button tertiary">Join Waitlist</button>
            </div>
            <p className="contact-info">Questions? <a href="mailto:residents@lightcityproject.org">residents@lightcityproject.org</a></p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResidentsPage;
