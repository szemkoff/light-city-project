import React from 'react';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Site, {Section} from '../components/Site';
import {WEB3FORMS_SUBMIT_URL, buildSiteAbsoluteUrl} from '../contactConfig';

export default function Contact(): JSX.Element {
  const location = useLocation();
  const sent = new URLSearchParams(location.search).get('sent') === '1';
  const {siteConfig} = useDocusaurusContext();
  const accessKey = (siteConfig.customFields as {web3formsAccessKey?: string} | undefined)?.web3formsAccessKey ?? '';
  const nextContact = buildSiteAbsoluteUrl(siteConfig.url, siteConfig.baseUrl, 'contact?sent=1');

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
            {sent ? <p className="pg-success" role="status">Thank you. Your message was submitted.</p> : null}
            {accessKey ? (
              <form className="pg-form" action={WEB3FORMS_SUBMIT_URL} method="POST">
                <input type="hidden" name="access_key" value={accessKey} />
                <input type="hidden" name="subject" value="Light City Project - Contact form" />
                <input type="hidden" name="redirect" value={nextContact} />
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
                <button type="submit" className="btn">Send message</button>
                <p className="pg-small">Delivered through Web3Forms. You will be brought back here to confirm.</p>
              </form>
            ) : (
              <div className="pg-form" role="status">
                <p><strong>The form is not active in this build.</strong> To enable it, add the <code>WEB3FORMS_ACCESS_KEY</code> secret under Repository → Settings → Secrets and variables → Actions, then re-run the deploy workflow.</p>
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
