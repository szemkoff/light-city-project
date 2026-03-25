import React from 'react';
import Link from '@docusaurus/Link';
import MarketingPageLayout from '../components/MarketingPageLayout';
import styles from '../components/MarketingPageLayout/styles.module.css';

export default function Builders(): JSX.Element {
  return (
    <MarketingPageLayout
      title="For Builders"
      subtitle="Buildable specifications, TRL framing, and energy systems that separate grid power from research programs."
    >
      <p>
        Technical documentation emphasizes phased construction, geodesic and mass-timber options, acoustic
        targets, and a two-track energy story: physical microgrid + optional subtle-environment research.
      </p>
      <h2>Key documents</h2>
      <ul>
        <li>
          <Link to="/docs/design/architecture">Architecture</Link>
        </li>
        <li>
          <Link to="/docs/technical/technology-catalog">Technology Catalog</Link>
        </li>
        <li>
          <Link to="/docs/concepts/energy-systems">Energy Systems</Link>
        </li>
        <li>
          <Link to="/docs/technical/urban-retrofit-guide">Urban Retrofit Guide</Link>
        </li>
      </ul>
      <h2>Contact</h2>
      <p>
        Technical or build collaboration: use the <Link to="/contact">contact form</Link> and choose{' '}
        <strong>Collaborator (builder, partner, service)</strong>.
      </p>
      <div className={styles.ctaRow}>
        <Link className="button button--primary" to="/contact">
          Contact
        </Link>
        <Link className="button button--primary" to="/docs/START-HERE">
          Documentation
        </Link>
        <Link className="button button--secondary" to="/docs/project/contributing">
          Contributing
        </Link>
      </div>
    </MarketingPageLayout>
  );
}
