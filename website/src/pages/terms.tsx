import React from 'react';
import Link from '@docusaurus/Link';
import MarketingPageLayout from '../components/MarketingPageLayout';

export default function Terms(): JSX.Element {
  return (
    <MarketingPageLayout
      title="Terms of Use"
      subtitle="Using the Light City Project website and documentation."
    >
      <p>
        Content on this site is provided for information and community purposes. It does not constitute
        legal, financial, engineering, or investment advice. Any future offerings or projects will be
        described in separate legal documents when applicable.
      </p>
      <p>
        Documentation is offered under the terms of the repository licenses (see the{' '}
        <a
          href="https://github.com/szemkoff/light-city-project/blob/main/LICENSE"
          target="_blank"
          rel="noopener noreferrer"
        >
          LICENSE
        </a>{' '}
        and{' '}
        <a
          href="https://github.com/szemkoff/light-city-project/blob/main/LICENSE-DOCS"
          target="_blank"
          rel="noopener noreferrer"
        >
          LICENSE-DOCS
        </a>
        {' '}files in the repo).
      </p>
      <p>
        <Link to="/">Back to home</Link>
      </p>
    </MarketingPageLayout>
  );
}
