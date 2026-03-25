import React from 'react';
import Link from '@docusaurus/Link';
import MarketingPageLayout from '../components/MarketingPageLayout';
import styles from '../components/MarketingPageLayout/styles.module.css';

export default function Researchers(): JSX.Element {
  return (
    <MarketingPageLayout
      title="For Researchers"
      subtitle="Ethics, measurement protocols, and explicit scope for exploratory work alongside proven infrastructure."
    >
      <p>
        Research-oriented content is framed with TRLs, consent-based programs, and separation between
        engineering deliverables and experiential or consciousness-adjacent hypotheses.
      </p>
      <h2>Entry points</h2>
      <ul>
        <li>
          <Link to="/docs/concepts/energy-systems">Energy Systems</Link> — two-track model and
          measurement discipline
        </li>
        <li>
          <Link to="/docs/research/open-questions">Open Questions</Link>
        </li>
        <li>
          <Link to="/docs/research/bibliography">Bibliography</Link>
        </li>
      </ul>
      <h2>Contact</h2>
      <p>
        Use the <Link to="/contact">contact form</Link> and choose <strong>Researcher</strong>.
      </p>
      <div className={styles.ctaRow}>
        <Link className="button button--primary" to="/contact">
          Contact
        </Link>
        <Link className="button button--primary" to="/docs/START-HERE">
          Documentation
        </Link>
        <Link className="button button--secondary" to="/blog">
          Updates
        </Link>
      </div>
    </MarketingPageLayout>
  );
}
