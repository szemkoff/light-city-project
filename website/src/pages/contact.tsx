import React from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import MarketingPageLayout from '../components/MarketingPageLayout';
import { CONTACT_EMAIL, FORMSUBMIT_ENDPOINT } from '../contactConfig';
import styles from './contact.module.css';
import pageStyles from '../components/MarketingPageLayout/styles.module.css';

function buildAbsoluteUrl(siteUrl: string, baseUrl: string, path: string): string {
  const u = siteUrl.replace(/\/$/, '');
  const b = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const p = path.startsWith('/') ? path.slice(1) : path;
  return `${u}${b}${p}`;
}

export default function Contact(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const location = useLocation();
  const sent = new URLSearchParams(location.search).get('sent') === '1';

  const nextContact = buildAbsoluteUrl(siteConfig.url, siteConfig.baseUrl, 'contact?sent=1');

  return (
    <MarketingPageLayout
      title="Contact"
      subtitle="Send a message about investment, collaboration, residency, research, or general questions. We read every note."
    >
      {sent ? (
        <p className={styles.success} role="status">
          Thank you. If you were redirected here after submitting, your message is on its way to{' '}
          {CONTACT_EMAIL}. You can also reach that address directly if needed.
        </p>
      ) : null}

      <p className={styles.hint}>
        Use the form below (preferred) or email{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <form className={styles.form} action={FORMSUBMIT_ENDPOINT} method="POST">
        <input type="hidden" name="_subject" value="Light City Project - Contact form" />
        <input type="hidden" name="_template" value="table" />
        <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
        <input type="hidden" name="_next" value={nextContact} />

        <div className={styles.row}>
          <label htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            className={styles.input}
            type="text"
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            className={styles.input}
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="Your email address"
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="contact-role">I am reaching out as</label>
          <select id="contact-role" className={styles.select} name="role" required defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            <option value="Investor">Investor</option>
            <option value="Collaborator">Collaborator (builder, partner, service)</option>
            <option value="Resident">Future resident / community member</option>
            <option value="Researcher">Researcher</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className={styles.row}>
          <label htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            className={styles.textarea}
            name="message"
            required
            placeholder="Briefly describe your interest, timing, and how we can help."
          />
        </div>

        <div className={styles.actions}>
          <button type="submit" className="button button--primary">
            Send message
          </button>
          <span className={styles.inlineNote}>Delivered via FormSubmit to {CONTACT_EMAIL}.</span>
        </div>
      </form>

      <h2>Documentation</h2>
      <p>
        For depth on vision, costs, and engineering, start with{' '}
        <Link to="/docs/START-HERE">Start Here</Link>, then{' '}
        <Link to="/docs/project/development-stages">Development Stages</Link>,{' '}
        <Link to="/docs/design/architecture">Architecture</Link>, and{' '}
        <Link to="/docs/concepts/energy-systems">Energy Systems</Link>.
      </p>
      <div className={pageStyles.ctaRow}>
        <Link className="button button--secondary" to="/">
          Home
        </Link>
        <Link className="button button--secondary" to="/about">
          About
        </Link>
      </div>
    </MarketingPageLayout>
  );
}
