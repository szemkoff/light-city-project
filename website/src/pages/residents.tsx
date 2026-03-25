import React from 'react';
import Link from '@docusaurus/Link';
import MarketingPageLayout from '../components/MarketingPageLayout';
import styles from '../components/MarketingPageLayout/styles.module.css';

export default function Residents(): JSX.Element {
  return (
    <MarketingPageLayout
      title="For Residents"
      subtitle="Living philosophy, contribution-based residency, and realistic timelines for community formation."
    >
      <p>
        Future residency is organized around governance participation, shared infrastructure, and clear
        expectations for both lifestyle and contribution. The Contribution-Based Residency model outlines
        how work-for-living tiers can align with community needs.
      </p>
      <h2>Start here</h2>
      <ul>
        <li>
          <Link to="/docs/project/contribution-based-residency">Contribution-Based Residency</Link>
        </li>
        <li>
          <Link to="/docs/concepts/purpose-and-mission">Purpose &amp; Mission</Link>
        </li>
        <li>
          <Link to="/docs/project/governance">Governance</Link>
        </li>
      </ul>
      <h2>Contact</h2>
      <p>
        Use the <Link to="/contact">contact form</Link> and choose <strong>Future resident / community member</strong>.
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
