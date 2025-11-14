import React from 'react';
import { Hammer, Zap, Droplet, Wheat } from 'lucide-react';
import { builderData } from '../data/mockData';
import '../styles/BuildersPage.css';

const BuildersPage = () => {
  return (
    <div className="builders-page">
      <section className="builder-hero">
        <div className="container">
          <h1>Build the Future with Proven Technologies</h1>
          <p className="hero-subtitle">
            CLT, geodesic domes, BIPV, and regenerative systems
          </p>
        </div>
      </section>

      <section className="technical-specs">
        <div className="container">
          <h2 className="section-title">Architecture Specifications</h2>
          
          <div className="specs-grid">
            <div className="spec-card">
              <Hammer size={40} className="spec-icon" />
              <h3>Communospheres (Geodesic Domes)</h3>
              <ul>
                <li><strong>Phase 1:</strong> {builderData.communosphereSpecs.phase1}</li>
                <li><strong>Structure:</strong> {builderData.communosphereSpecs.structure}</li>
                <li><strong>Glazing:</strong> {builderData.communosphereSpecs.glazing}</li>
                <li><strong>Capacity:</strong> {builderData.communosphereSpecs.capacity}</li>
                <li><strong>TRL:</strong> {builderData.communosphereSpecs.trl}</li>
              </ul>
            </div>

            <div className="spec-card">
              <Zap size={40} className="spec-icon" />
              <h3>Spire Tower</h3>
              <ul>
                <li><strong>Height:</strong> {builderData.spireSpecs.height}</li>
                <li><strong>Structure:</strong> {builderData.spireSpecs.structure}</li>
                <li><strong>Functions:</strong> {builderData.spireSpecs.functions}</li>
                <li><strong>TRL:</strong> {builderData.spireSpecs.trl}</li>
              </ul>
            </div>

            <div className="spec-card">
              <Droplet size={40} className="spec-icon" />
              <h3>Energy Systems</h3>
              <ul>
                <li><strong>Solar PV:</strong> 2-5 MWp (Phase 1), rooftop + canopies + BIPV</li>
                <li><strong>Storage:</strong> 8-20 MWh (lithium-ion or flow batteries)</li>
                <li><strong>Backup:</strong> 500 kW - 2 MW diesel/propane genset</li>
                <li><strong>TRL:</strong> 8-9 (proven technology)</li>
              </ul>
            </div>

            <div className="spec-card">
              <Wheat size={40} className="spec-icon" />
              <h3>Water & Food Systems</h3>
              <ul>
                <li><strong>Rainwater:</strong> 500K-1M gallons storage</li>
                <li><strong>Greywater:</strong> 80% reuse with recycling</li>
                <li><strong>Agroforestry:</strong> 1-2 ha (Phase 1), 5-10 ha (Phase 2)</li>
                <li><strong>Greenhouses:</strong> 500-1,000 m² hydroponic/aquaponic</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="technology-catalog">
        <div className="container">
          <h2 className="section-title">Technology Catalog</h2>
          <div className="tech-table">
            <table>
              <thead>
                <tr>
                  <th>Technology</th>
                  <th>Status</th>
                  <th>TRL</th>
                  <th>Cost</th>
                  <th>Suppliers</th>
                </tr>
              </thead>
              <tbody>
                {builderData.technologies.map((tech, idx) => (
                  <tr key={idx}>
                    <td><strong>{tech.name}</strong></td>
                    <td><span className={`status-badge ${tech.status.toLowerCase()}`}>{tech.status}</span></td>
                    <td>{tech.trl}</td>
                    <td>{tech.cost}</td>
                    <td>{tech.suppliers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="phasing-timeline">
        <div className="container">
          <h2 className="section-title">Phasing & Timeline</h2>
          <div className="timeline-cards">
            {builderData.timeline.map((phase, idx) => (
              <div key={idx} className="timeline-card">
                <h3>{phase.phase}</h3>
                <div className="timeline-duration">{phase.duration}</div>
                <p>{phase.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="partnership-cta">
        <div className="container">
          <div className="cta-box">
            <h2>Build with Us</h2>
            <p>We're seeking partnerships with experienced contractors, engineers, and suppliers.</p>
            <div className="cta-buttons">
              <button className="cta-button primary">Submit Partnership Proposal</button>
              <button className="cta-button secondary">Download Technical Specs</button>
            </div>
            <p className="contact-info">Contact: <a href="mailto:builders@lightcityproject.org">builders@lightcityproject.org</a></p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BuildersPage;
