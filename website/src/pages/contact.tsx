import React, {useState} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Site, {Section} from '../components/Site';
import {submitToSheet} from '../contactConfig';

export default function Contact(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const endpoint = (siteConfig.customFields as {formsEndpoint?: string} | undefined)?.formsEndpoint ?? '';
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    try {
      if (await submitToSheet(endpoint, form)) { setStatus('sent'); form.reset(); } else setStatus('error');
    } catch { setStatus('error'); }
  }

  return (
    <Site
      title="Contact"
      description="Send a message about investment, collaboration, residency, research or general questions."
      eyebrow="Contact"
      heading={<>Let's build it <em>together.</em></>}
      sub="Send a message about investment, collaboration, residency, research or general questions. We read every note."
      image="vision-2">
      <Section>
        <div className="pg-form-wrap">
          <div>
            {status === 'sent' ? <p className="pg-success" role="status">Thank you. Your message was submitted.</p> : null}
            {status === 'error' ? <p className="pg-success" role="alert">Something went wrong. Please try again in a moment.</p> : null}
            {endpoint ? (
              <form className="pg-form" method="POST" onSubmit={onSubmit}>
                <input type="hidden" name="form" value="Contact" />
                <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" style={{display: 'none'}} />
                <div className="pg-field">
                  <label htmlFor="contact-name">Name</label>
                  <input id="contact-name" type="text" name="name" required autoComplete="name" placeholder="Your name" />
                </div>
                <div className="pg-field">
                  <label htmlFor="contact-email">Email (for replies)</label>
                  <input id="contact-email" type="email" name="email" required autoComplete="email" placeholder="you@example.com" />
                </div>
                <div className="pg-field">
                  <label htmlFor="contact-role">I am reaching out as</label>
                  <select id="contact-role" name="role" required defaultValue="">
                    <option value="" disabled>Select one</option>
                    <option value="Investor">Investor</option>
                    <option value="Collaborator">Collaborator (builder, partner, service)</option>
                    <option value="Resident">Future resident / community member</option>
                    <option value="Researcher">Researcher</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="pg-field">
                  <label htmlFor="contact-message">Message</label>
                  <textarea id="contact-message" name="message" required placeholder="Briefly describe your interest, timing and how we can help." />
                </div>
                <button type="submit" className="btn" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send message'}</button>
              </form>
            ) : (
              <div className="pg-form" role="status">
                <p><strong>The form is not active in this build.</strong> To enable it, add the <code>FORMS_ENDPOINT_URL</code> secret under Repository → Settings → Secrets and variables → Actions, then re-run the deploy workflow.</p>
              </div>
            )}
          </div>
          <aside className="pg-aside">
            <h3>Who should write</h3>
            <ul>
              <li><b>Investors</b>Materials, the financial model and a call.</li>
              <li><b>Collaborators</b>Builders, partners and service providers.</li>
              <li><b>Future residents</b>Residency, the pilot and timelines.</li>
              <li><b>Researchers</b>Study proposals, critique and replication.</li>
            </ul>
            <p className="pg-small pg-inline" style={{marginTop: 'var(--space-6)'}}>
              For depth first, see <Link to="/docs/START-HERE">Start here</Link>, <Link to="/docs/project/development-stages">Development stages</Link> and <Link to="/docs/design/architecture">Architecture</Link>.
            </p>
          </aside>
        </div>
      </Section>
    </Site>
  );
}
