import React from 'react';
import Link from '@docusaurus/Link';
import Site, {Section} from '../components/Site';

export default function Conduct(): JSX.Element {
  return (
    <Site title="Code of Conduct" description="Respectful collaboration in Light City community spaces." eyebrow="Community" heading="Code of conduct" sub="Respectful collaboration in Light City community spaces.">
      <Section>
        <div className="pg-prose">
          <p>We aim for constructive, inclusive participation. The project follows the Contributor Covenant expectations described in the repository.</p>
          <p>Full text: <a href="https://github.com/szemkoff/light-city-project/blob/main/CODE_OF_CONDUCT.md" target="_blank" rel="noopener noreferrer">CODE_OF_CONDUCT.md on GitHub</a>.</p>
          <p>Concerns may be reported through the <Link to="/contact">contact form</Link> (choose Other).</p>
        </div>
      </Section>
    </Site>
  );
}
