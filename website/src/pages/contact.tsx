import React from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import MarketingPageLayout from '../components/MarketingPageLayout';
import { WEB3FORMS_SUBMIT_URL, buildSiteAbsoluteUrl } from '../contactConfig';
import styles from './contact.module.css';
import pageStyles from '../components/MarketingPageLayout/styles.module.css';

export default function Contact(): JSX.Element {
  const location = useLocation();
  const sent = new URLSearchParams(location.search).get('sent') === '1';
  const { siteConfig } = useDocusaurusContext();
  const accessKey =
    (siteConfig.customFields as { web3formsAccessKey?: string } | undefined)?.web3formsAccessKey ?? '';

  const nextContact = buildSiteAbsoluteUrl(siteConfig.url, siteConfig.baseUrl, 'contact?sent=1');

  return (
    <MarketingPageLayout
      title="Contact"
      subtitle="Send a message about investment, collaboration, residency, research, or general questions. We read every note."
    >
      <p className={styles.hint}>
        Submit the form below. Your message is sent through Web3Forms; after submission you will be redirected back here
        for confirmation.
      </p>

      {sent ? (
        <p className={styles.success} role="status">
          Thank you — your message was submitted.
        </p>
      ) : null}

      {accessKey ? (
        <form className={styles.form} action={WEB3FORMS_SUBMIT_URL} method="POST">
          <input type="hidden" name="access_key" value={accessKey} />
          <input type="hidden" name="subject" value="Light City Project - Contact form" />
          <input type="hidden" name="redirect" value={nextContact} />
          <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} />

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
            <label htmlFor="contact-email">Email (for replies)</label>
            <input
              id="contact-email"
              className={styles.input}
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="So we can reach you"
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
            <span className={styles.inlineNote}>
              Delivered through Web3Forms. Notification destination is set in your Web3Forms account (not on this site).
            </span>
          </div>
        </form>
      ) : (
        <div className={styles.hint} role="status">
          <p>
            <strong>Form not active in this build.</strong> To enable it, the site maintainer must:
          </p>
          <ol style={{ margin: '0.5rem 0 0', paddingLeft: '1.25rem', lineHeight: 1.6 }}>
            <li>
              Create a free access key at{' '}
              <a href="https://web3forms.com" target="_blank" rel="noopener noreferrer">
                web3forms.com
              </a>{' '}
              (use the inbox where you want submissions).
            </li>
            <li>
              In GitHub: <strong>Repository → Settings → Secrets and variables → Actions</strong>, add secret{' '}
              <code>WEB3FORMS_ACCESS_KEY</code> with that key.
            </li>
            <li>Push a commit or re-run the Actions workflow so the site rebuilds with the secret.</li>
          </ol>
        </div>
      )}

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
