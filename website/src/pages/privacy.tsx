import React from 'react';
import Link from '@docusaurus/Link';
import Site, {Section} from '../components/Site';

export default function Privacy(): JSX.Element {
  return (
    <Site title="Privacy Policy" description="How we handle information on this public documentation site." eyebrow="Legal" heading="Privacy policy" sub="How we handle information on this public documentation site.">
      <Section>
        <div className="pg-prose">
          <p>This site is hosted on GitHub Pages and built with Docusaurus. Like most static sites, hosting providers may process standard server logs (such as IP address and user agent) when you load pages.</p>
          <p>If you use the <Link to="/contact">contact form</Link> or the founding circle signup, your message is sent through a third-party form provider (Web3Forms). The project does not publish a team email address on this website. There are no account systems or payment flows on this site at this time.</p>
          <p>For the open-source repository and issue tracker, see <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">GitHub's privacy statement</a> as it applies to your use of GitHub.</p>
        </div>
      </Section>
    </Site>
  );
}
