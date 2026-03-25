import React from 'react';
import Link from '@docusaurus/Link';
import MarketingPageLayout from '../components/MarketingPageLayout';
import { CONTACT_EMAIL } from '../contactConfig';

export default function Conduct(): JSX.Element {
  return (
    <MarketingPageLayout
      title="Code of Conduct"
      subtitle="Respectful collaboration in Light City community spaces."
    >
      <p>
        We aim for constructive, inclusive participation. The project follows the Contributor Covenant
        expectations described in the repository.
      </p>
      <p>
        Full text:{' '}
        <a
          href="https://github.com/szemkoff/light-city-project/blob/main/CODE_OF_CONDUCT.md"
          target="_blank"
          rel="noopener noreferrer"
        >
          CODE_OF_CONDUCT.md on GitHub
        </a>
        .
      </p>
      <p>
        Concerns may be reported via the <Link to="/contact">contact form</Link> (choose <strong>Other</strong>) or by email to{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
      <p>
        <Link to="/">Back to home</Link>
      </p>
    </MarketingPageLayout>
  );
}
