import React, { FormEvent, useState } from 'react';
import Link from '@docusaurus/Link';
import MarketingPageLayout from '../components/MarketingPageLayout';
import { CONTACT_EMAIL, buildContactMailto } from '../contactConfig';
import styles from './contact.module.css';
import pageStyles from '../components/MarketingPageLayout/styles.module.css';

export default function Contact(): JSX.Element {
  const [mailtoOpened, setMailtoOpened] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get('name') ?? '').trim();
    const userEmail = String(fd.get('email') ?? '').trim();
    const role = String(fd.get('role') ?? '').trim();
    const message = String(fd.get('message') ?? '').trim();
    const href = buildContactMailto({ name, userEmail, role, message });
    setMailtoOpened(true);
    window.location.assign(href);
  };

  return (
    <MarketingPageLayout
      title="Contact"
      subtitle="Send a message about investment, collaboration, residency, research, or general questions. We read every note."
    >
      <p className={styles.hint}>
        Fill out the form and choose <strong>Open in email app</strong> — your mail program opens with a pre-filled
        message to{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. No data is sent through this website; it only builds a
        mailto link (works on public Wi‑Fi and locked-down networks).
      </p>

      {mailtoOpened ? (
        <p className={styles.success} role="status">
          If your email app did not open, copy the address{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or try again from another device.
        </p>
      ) : null}

      <form className={styles.form} onSubmit={handleSubmit}>
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
            Open in email app
          </button>
          <span className={styles.inlineNote}>
            Or email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> directly.
          </span>
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
