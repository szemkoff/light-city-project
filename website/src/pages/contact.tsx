import React from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import MarketingPageLayout from '../components/MarketingPageLayout';
import ContactEmailImage from '../components/ContactEmailImage';
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
        Submit the form below — your message is delivered by a secure form service (no project email is shown as
        text on this page). After sending, you will be redirected back here with a confirmation.
      </p>

      {sent ? (
        <p className={styles.success} role="status">
          Thank you — your message was submitted. If you do not hear back within a few days, try the image below.
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
            <label htmlFor="contact-email">Your email</label>
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
            <span className={styles.inlineNote}>Delivered via Web3Forms to the inbox you set in their dashboard.</span>
          </div>
        </form>
      ) : (
        <p className={styles.hint} role="status">
          The contact form is not enabled in this build. Add repository secret{' '}
          <code>WEB3FORMS_ACCESS_KEY</code> and redeploy (see project README or maintainer notes). You can still use
          the manual address below.
        </p>
      )}

      <ContactEmailImage />

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
