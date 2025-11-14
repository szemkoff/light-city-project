import React, { useState } from 'react';
import { TrendingUp, DollarSign, Shield, Clock, AlertTriangle } from 'lucide-react';
import { investorData } from '../data/mockData';
import '../styles/InvestorsPage.css';

const InvestorsPage = () => {
  const [activeTab, setActiveTab] = useState('financial');
  const [emailInput, setEmailInput] = useState('');

  const handleInquiry = (e) => {
    e.preventDefault();
    console.log('Investment inquiry:', emailInput);
    alert('Thank you for your interest! We\'ll send you the investment deck shortly.');
    setEmailInput('');
  };

  return (
    <div className="investors-page">
      {/* Hero Section */}
      <section className="investor-hero">
        <div className="container">
          <h1>Impact Investment Opportunity</h1>
          <p className="hero-subtitle">
            Build the future of regenerative living with proven technologies and transparent governance
          </p>
          <div className="key-stats-grid">
            {investorData.keyStats.map((stat, idx) => (
              <div key={idx} className="key-stat-card">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-sublabel">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Overview Tabs */}
      <section className="investment-overview">
        <div className="container">
          <div className="tabs-container">
            <div className="tabs-header">
              <button
                className={`tab-button ${activeTab === 'financial' ? 'active' : ''}`}
                onClick={() => setActiveTab('financial')}
              >
                <DollarSign size={20} />
                Financial Model
              </button>
              <button
                className={`tab-button ${activeTab === 'risk' ? 'active' : ''}`}
                onClick={() => setActiveTab('risk')}
              >
                <Shield size={20} />
                Risk Analysis
              </button>
              <button
                className={`tab-button ${activeTab === 'returns' ? 'active' : ''}`}
                onClick={() => setActiveTab('returns')}
              >
                <TrendingUp size={20} />
                Returns & Exit
              </button>
              <button
                className={`tab-button ${activeTab === 'timeline' ? 'active' : ''}`}
                onClick={() => setActiveTab('timeline')}
              >
                <Clock size={20} />
                Timeline
              </button>
            </div>

            <div className="tabs-content">
              {activeTab === 'financial' && (
                <div className="tab-panel">
                  <h2>Financial Model</h2>
                  <p className="tab-intro">
                    Our financial model includes three scenarios (Low, Mid, High) with detailed sensitivity analysis.
                  </p>

                  <div className="scenario-comparison">
                    <div className="table-responsive">
                      <table className="financial-table">
                        <thead>
                          <tr>
                            <th>Metric</th>
                            {investorData.financialScenarios.map((scenario, idx) => (
                              <th key={idx}>{scenario.scenario}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>CAPEX (S1-S5)</td>
                            {investorData.financialScenarios.map((scenario, idx) => (
                              <td key={idx}>{scenario.capex}</td>
                            ))}
                          </tr>
                          <tr>
                            <td>Annual OPEX (S6)</td>
                            {investorData.financialScenarios.map((scenario, idx) => (
                              <td key={idx}>{scenario.opex}</td>
                            ))}
                          </tr>
                          <tr>
                            <td>Capacity (residents)</td>
                            {investorData.financialScenarios.map((scenario, idx) => (
                              <td key={idx}>{scenario.capacity}</td>
                            ))}
                          </tr>
                          <tr>
                            <td>Break-even</td>
                            {investorData.financialScenarios.map((scenario, idx) => (
                              <td key={idx}>{scenario.breakeven} residents</td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <h3 className="subsection-title">Revenue Model Breakdown</h3>
                  <div className="revenue-breakdown">
                    {investorData.revenueBreakdown.map((item, idx) => (
                      <div key={idx} className="revenue-item">
                        <div className="revenue-header">
                          <span className="revenue-source">{item.source}</span>
                          <span className="revenue-percentage">{item.percentage}%</span>
                        </div>
                        <div className="revenue-bar">
                          <div
                            className="revenue-fill"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <div className="revenue-amount">{item.amount}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'risk' && (
                <div className="tab-panel">
                  <h2>Risk Analysis</h2>
                  <p className="tab-intro">
                    We've identified and assessed the top risks with clear mitigation strategies.
                  </p>

                  <div className="risks-grid">
                    {investorData.topRisks.map((risk, idx) => (
                      <div key={idx} className="risk-card">
                        <div className="risk-header">
                          <AlertTriangle className="risk-icon" />
                          <h3>{risk.name}</h3>
                        </div>
                        <div className="risk-details">
                          <div className="risk-metric">
                            <span className="metric-label">Likelihood:</span>
                            <span className={`metric-badge ${risk.likelihood.toLowerCase()}`}>
                              {risk.likelihood}
                            </span>
                          </div>
                          <div className="risk-metric">
                            <span className="metric-label">Impact:</span>
                            <span className={`metric-badge ${risk.impact.toLowerCase()}`}>
                              {risk.impact}
                            </span>
                          </div>
                        </div>
                        <div className="risk-mitigation">
                          <strong>Mitigation:</strong>
                          <p>{risk.mitigation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'returns' && (
                <div className="tab-panel">
                  <h2>Returns & Exit Strategy</h2>
                  <p className="tab-intro">
                    Impact-first investment with patient capital and multiple exit options.
                  </p>

                  <div className="returns-cards">
                    <div className="return-card">
                      <h3>Preferred Return</h3>
                      <div className="return-value">4-6% Annual</div>
                      <p>Years 1-3 during construction and ramp-up</p>
                    </div>
                    <div className="return-card">
                      <h3>Equity IRR</h3>
                      <div className="return-value">8-12%</div>
                      <p>Years 5-10 operational phase</p>
                    </div>
                    <div className="return-card">
                      <h3>Exit Timeline</h3>
                      <div className="return-value">5-10 Years</div>
                      <p>Refinancing or sale to community co-op</p>
                    </div>
                  </div>

                  <div className="exit-strategies">
                    <h3 className="subsection-title">Exit Strategies</h3>
                    <div className="timeline-visual">
                      <div className="timeline-item">
                        <div className="timeline-marker">Year 5-7</div>
                        <div className="timeline-content">
                          <h4>Refinancing</h4>
                          <p>Traditional lender refinancing with full return to investors</p>
                        </div>
                      </div>
                      <div className="timeline-item">
                        <div className="timeline-marker">Year 10+</div>
                        <div className="timeline-content">
                          <h4>Sale or Community Buyout</h4>
                          <p>Sale to community co-op or impact fund (1.5-2.5x multiple)</p>
                        </div>
                      </div>
                      <div className="timeline-item">
                        <div className="timeline-marker">Ongoing</div>
                        <div className="timeline-content">
                          <h4>Dividend Distributions</h4>
                          <p>Regular distributions from operational profits</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'timeline' && (
                <div className="tab-panel">
                  <h2>Development Timeline</h2>
                  <p className="tab-intro">
                    Phased development approach with clear milestones and capital deployment.
                  </p>

                  <div className="timeline-gantt">
                    <div className="gantt-item">
                      <div className="gantt-label">Q4 2025</div>
                      <div className="gantt-bar" style={{ width: '85%' }}>
                        <span>Stage 1: Foundation (85% Complete)</span>
                      </div>
                    </div>
                    <div className="gantt-item">
                      <div className="gantt-label">Q2 2026</div>
                      <div className="gantt-bar" style={{ width: '100%' }}>
                        <span>Stage 2: Design</span>
                      </div>
                    </div>
                    <div className="gantt-item">
                      <div className="gantt-label">Q4 2026</div>
                      <div className="gantt-bar" style={{ width: '100%' }}>
                        <span>Stage 3: Digital Platform</span>
                      </div>
                    </div>
                    <div className="gantt-item">
                      <div className="gantt-label">Q4 2027</div>
                      <div className="gantt-bar" style={{ width: '100%' }}>
                        <span>Stage 4: Community Building</span>
                      </div>
                    </div>
                    <div className="gantt-item highlighted">
                      <div className="gantt-label">Q1 2028</div>
                      <div className="gantt-bar capital-raise" style={{ width: '100%' }}>
                        <span>Stage 5: Physical Construction ⭐ Capital Raise</span>
                      </div>
                    </div>
                    <div className="gantt-item">
                      <div className="gantt-label">Q4 2029</div>
                      <div className="gantt-bar" style={{ width: '100%' }}>
                        <span>Construction Complete</span>
                      </div>
                    </div>
                    <div className="gantt-item">
                      <div className="gantt-label">Q2 2031</div>
                      <div className="gantt-bar success" style={{ width: '100%' }}>
                        <span>Break-even Achieved</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Investment Process */}
      <section className="investment-process">
        <div className="container">
          <h2 className="section-title">Investment Process</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Initial Inquiry</h3>
              <p>Submit interest form</p>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Information Package</h3>
              <p>Receive detailed deck + financial model</p>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>Due Diligence</h3>
              <p>Q&A sessions, reference checks</p>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h3>Term Sheet</h3>
              <p>Negotiate terms and structure</p>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <div className="step-number">5</div>
              <h3>Close</h3>
              <p>Investment agreement & capital call</p>
            </div>
          </div>
          <p className="process-timeline">Timeline: 2-4 months from inquiry to close</p>
        </div>
      </section>

      {/* CTA */}
      <section className="investor-cta">
        <div className="container">
          <div className="cta-box">
            <h2>Ready to Build the Future?</h2>
            <form onSubmit={handleInquiry} className="inquiry-form">
              <input
                type="email"
                placeholder="Enter your email to request investment deck"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
              />
              <button type="submit" className="cta-button primary">Request Investment Deck</button>
            </form>
            <p className="contact-info">Or email us directly: <a href="mailto:investors@lightcityproject.org">investors@lightcityproject.org</a></p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InvestorsPage;
