import React from 'react';
import { BookOpen, HelpCircle, List, ExternalLink } from 'lucide-react';
import '../styles/ResourcesPage.css';

const ResourcesPage = () => {
  return (
    <div className="resources-page">
      <section className="resources-hero">
        <div className="container">
          <h1>Resources Hub</h1>
          <p className="hero-subtitle">
            Documentation, guides, and references for Light City
          </p>
        </div>
      </section>

      <section className="resources-grid-section">
        <div className="container">
          <div className="resources-grid">
            <div className="resource-card">
              <BookOpen size={48} className="resource-icon" />
              <h2>Documentation</h2>
              <p>
                Complete project documentation including architecture specs, financial models, 
                governance framework, and development stages.
              </p>
              <a 
                href="https://github.com/szemkoff/light-city-project" 
                target="_blank" 
                rel="noopener noreferrer"
                className="resource-link"
              >
                View on GitHub <ExternalLink size={16} />
              </a>
            </div>

            <div className="resource-card">
              <HelpCircle size={48} className="resource-icon" />
              <h2>FAQ</h2>
              <p>
                Frequently asked questions about Light City, covering investors, residents, 
                builders, researchers, and general inquiries.
              </p>
              <button className="resource-link">Coming Soon</button>
            </div>

            <div className="resource-card">
              <List size={48} className="resource-icon" />
              <h2>Glossary</h2>
              <p>
                Definitions of technical terms, acronyms, and concepts used throughout 
                the Light City project documentation.
              </p>
              <button className="resource-link">Coming Soon</button>
            </div>
          </div>
        </div>
      </section>

      <section className="key-documents">
        <div className="container">
          <h2 className="section-title">Key Documents</h2>
          <div className="documents-list">
            <div className="document-item">
              <h3>Core Concepts</h3>
              <p>Foundational principles, Delphin reference, and multidimensional vision</p>
              <a 
                href="https://szemkoff.github.io/light-city-project/docs/concepts/core-concepts"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read More <ExternalLink size={16} />
              </a>
            </div>

            <div className="document-item">
              <h3>Architecture Specifications</h3>
              <p>Physical implementation, phasing, TRLs, and buildable specs</p>
              <a 
                href="https://szemkoff.github.io/light-city-project/docs/design/architecture"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read More <ExternalLink size={16} />
              </a>
            </div>

            <div className="document-item">
              <h3>Development Stages & Financial Model</h3>
              <p>Timeline, costs, revenue model, and financial analysis</p>
              <a 
                href="https://szemkoff.github.io/light-city-project/docs/project/development-stages"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read More <ExternalLink size={16} />
              </a>
            </div>

            <div className="document-item">
              <h3>Governance Framework</h3>
              <p>Decision-making, authority, and community structure</p>
              <a 
                href="https://szemkoff.github.io/light-city-project/docs/project/governance"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read More <ExternalLink size={16} />
              </a>
            </div>

            <div className="document-item">
              <h3>Technology Catalog</h3>
              <p>34 technologies with specs, TRLs, costs, and suppliers</p>
              <a 
                href="https://szemkoff.github.io/light-city-project/docs/technical/technology-catalog"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read More <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="media-kit">
        <div className="container">
          <h2 className="section-title">Media Kit</h2>
          <div className="media-content">
            <p>
              Logos, brand guidelines, press releases, and high-resolution images available for 
              media and partners. Contact us for access to the complete media kit.
            </p>
            <button className="cta-button primary">Request Media Kit</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;
