import React from 'react';
import Site, {Section} from '../components/Site';

export default function Terms(): JSX.Element {
  return (
    <Site title="Terms of Use" description="Using the Light City Project website and documentation." eyebrow="Legal" heading="Terms of use" sub="Using the Light City Project website and documentation.">
      <Section>
        <div className="pg-prose">
          <p>Content on this site is provided for information and community purposes. It does not constitute legal, financial, engineering or investment advice. Any future offerings or projects will be described in separate legal documents when applicable.</p>
          <p>Documentation is offered under the terms of the repository licenses: see the <a href="https://github.com/szemkoff/light-city-project/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">LICENSE</a> and <a href="https://github.com/szemkoff/light-city-project/blob/main/LICENSE-DOCS" target="_blank" rel="noopener noreferrer">LICENSE-DOCS</a> files in the repository.</p>
        </div>
      </Section>
    </Site>
  );
}
