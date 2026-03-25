import React from 'react';
import Link from '@docusaurus/Link';
import MarketingPageLayout from '../components/MarketingPageLayout';

export default function Privacy(): JSX.Element {
  return (
    <MarketingPageLayout
      title="Privacy Policy"
      subtitle="How we handle information on this public documentation site."
    >
      <p>
        This site is hosted on GitHub Pages and built with Docusaurus. Like most static sites, hosting
        providers may process standard server logs (such as IP address and user agent) when you load
        pages.
      </p>
      <p>
        If you use the <Link to="/contact">contact form</Link>, your message is sent through a third-party form
        provider (Web3Forms). The project does not publish a team email address on this website. There are no account systems
        or payment flows on this documentation site at this time.
      </p>
      <p>
        For the open-source repository and issue tracker, see{' '}
        <a
          href="https://github.com/szemkoff/light-city-project"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub&apos;s privacy policy
        </a>{' '}
        as it applies to your use of GitHub.
      </p>
      <p>
        <Link to="/">Back to home</Link>
      </p>
    </MarketingPageLayout>
  );
}
