import React from 'react';
import Site, {Section, DocLinks, Cta} from '../components/Site';

export default function Resources(): JSX.Element {
  return (
    <Site
      title="Resources"
      description="Hub for documentation, updates and repository assets."
      eyebrow="Resources"
      heading={<>Everything we've written, <em>in one place.</em></>}
      sub="Documentation, updates and the open repository. Use search in the docs, or start with the orientation guide."
      image="borobudur">
      <Section eyebrow="Start" title="Orientation.">
        <DocLinks items={[
          {to: '/docs/START-HERE', tag: 'Guide', title: 'Start here', text: 'A short orientation to the project and the documentation.'},
          {to: '/docs/', tag: 'Index', title: 'Documentation index', text: 'The full map of every page.'},
          {to: '/docs/concepts/core-concepts', tag: 'Concepts', title: 'Core concepts', text: 'Vision and framing in one read.'},
        ]} />
      </Section>
      <Section eyebrow="Go deeper" title="By topic.">
        <DocLinks items={[
          {to: '/docs/design/architecture', tag: 'Design', title: 'Architecture', text: 'Domes, spire and site plan.'},
          {to: '/docs/technical/technology-catalog', tag: 'Technical', title: 'Technology catalog', text: 'Systems, images and readiness levels.'},
          {to: '/docs/concepts/energy-systems', tag: 'Concepts', title: 'Energy systems', text: 'The two-track energy model.'},
          {to: '/docs/project/development-stages', tag: 'Project', title: 'Development stages', text: 'Roadmap, costs and status.'},
          {to: '/docs/project/governance', tag: 'Project', title: 'Governance', text: 'Decision rights and structure.'},
          {to: '/docs/research/open-questions', tag: 'Research', title: 'Open questions', text: 'What we still need to learn.'},
        ]} />
      </Section>
      <Section alt eyebrow="Elsewhere" title="Updates and source.">
        <DocLinks items={[
          {to: '/blog', tag: 'Updates', title: 'Blog', text: 'Progress notes and announcements.'},
          {to: 'https://github.com/szemkoff/light-city-project', tag: 'GitHub', title: 'Repository', text: 'Source files, planning folders and media.'},
          {to: '/contact', tag: 'Contact', title: 'Contact form', text: 'Investor, collaborator, resident, researcher or other.'},
        ]} />
        <p className="pg-note">FAQ and glossary pages are not split out yet. Use the documentation index and search, or reach out through the contact form.</p>
      </Section>
      <Cta title="Can't find what you need?" text="Send us a note and we will point you to the right document." primary={{to: '/contact', label: 'Contact us'}} secondary={{to: '/docs/START-HERE', label: 'Open the docs'}} />
    </Site>
  );
}
