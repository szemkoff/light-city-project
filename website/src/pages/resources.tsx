import React from 'react';
import Link from '@docusaurus/Link';
import MarketingPageLayout from '../components/MarketingPageLayout';
import { CONTACT_EMAIL } from '../contactConfig';
import styles from '../components/MarketingPageLayout/styles.module.css';

export default function Resources(): JSX.Element {
  return (
    <MarketingPageLayout
      title="Resources"
      subtitle="Hub for documentation, updates, and repository assets."
    >
      <h2>On this site</h2>
      <ul>
        <li>
          <Link to="/docs/START-HERE">Start Here</Link> — orientation
        </li>
        <li>
          <Link to="/docs/concepts/core-concepts">Core Concepts</Link> — vision and framing
        </li>
        <li>
          <Link to="/docs/">Documentation index</Link> — full map of all pages
        </li>
        <li>
          <Link to="/blog">Blog / updates</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link> — form (Investor, Collaborator, Resident, Researcher, Other)
        </li>
      </ul>
      <p>
        FAQ and glossary pages are not split out yet; use the documentation index and search, or email{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
      <h2>Repository</h2>
      <p>
        Source files, planning folders, and media live in the{' '}
        <a
          href="https://github.com/szemkoff/light-city-project"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub repository
        </a>
        .
      </p>
      <div className={styles.ctaRow}>
        <Link className="button button--primary" to="/contact">
          Contact
        </Link>
        <Link className="button button--primary" to="/docs/START-HERE">
          Open docs
        </Link>
        <a
          className="button button--secondary"
          href="https://github.com/szemkoff/light-city-project"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </MarketingPageLayout>
  );
}
