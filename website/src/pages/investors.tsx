import React from 'react';
import Link from '@docusaurus/Link';
import MarketingPageLayout from '../components/MarketingPageLayout';
import styles from '../components/MarketingPageLayout/styles.module.css';

export default function Investors(): JSX.Element {
  return (
    <MarketingPageLayout
      title="For Investors"
      subtitle="Impact-aligned capital, transparent governance, and a phased path from documentation to physical site."
    >
      <p>
        Light City is structured for serious diligence: phased CAPEX, documented assumptions, governance
        milestones, and a clear separation between proven infrastructure (microgrid, structures) and
        exploratory research programs.
      </p>
      <h2>What to review first</h2>
      <ul>
        <li>
          <Link to="/docs/project/development-stages">Development Stages</Link> — timeline, costs, and
          financial model notes
        </li>
        <li>
          <Link to="/docs/project/governance">Governance</Link> — decision rights and community structure
        </li>
        <li>
          <Link to="/docs/design/architecture">Architecture</Link> — Earth-scale implementation vs.
          inspirational reference
        </li>
      </ul>
      <h2>Contact</h2>
      <p>
        Use the <Link to="/contact">contact form</Link> and choose <strong>Investor</strong>. To copy our address
        manually, use the image on the contact page (we do not publish the address as plain text).
      </p>
      <div className={styles.ctaRow}>
        <Link className="button button--primary" to="/contact">
          Contact
        </Link>
        <Link className="button button--primary" to="/docs/START-HERE">
          Documentation
        </Link>
        <Link className="button button--secondary" to="/about">
          Vision &amp; philosophy
        </Link>
      </div>
    </MarketingPageLayout>
  );
}
