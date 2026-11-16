import React from 'react';
import Site, {Section, Cards, DocLinks, Cta} from '../components/Site';

export default function Researchers(): JSX.Element {
  return (
    <Site
      title="For Researchers"
      description="Ethics, measurement protocols and explicit scope for exploratory work alongside proven infrastructure."
      eyebrow="For researchers"
      heading={<>A living laboratory, <em>held to open-science standards.</em></>}
      sub="Engineering deliverables and consciousness hypotheses stay on separate tracks, each with an honest readiness level."
      image="tech-aquaponics-system">
      <Section eyebrow="Research programs" title="Four programs, one standard of evidence.">
        <Cards items={[
          {kicker: 'TRL 1–3', title: 'Consciousness field studies', img: 'research', text: 'HRV, EEG and heart-brain coherence across groups, with pre-registered protocols.'},
          {kicker: 'TRL 2–4', title: 'Acoustic resonance', img: 'city-temple', text: 'RT60, SPL and listener studies inside the spire and domes.'},
          {kicker: 'TRL 5–7', title: 'Biophilic health', img: 'home-studio', text: 'Stress markers, sleep quality and cognitive performance in biophilic spaces.'},
          {kicker: 'TRL 7–9', title: 'Regenerative agriculture', img: 'tech-agroforestry', text: 'Soil carbon, biomass and lifecycle analysis across food systems.'},
        ]} />
      </Section>

      <Section night eyebrow="Ethics first" title="How every study is run.">
        <div className="pg-facts">
          <div className="pg-fact"><b>OSF</b><span>Studies pre-registered before data collection</span></div>
          <div className="pg-fact"><b>IRB</b><span>Independent ethics approval and informed consent</span></div>
          <div className="pg-fact"><b>Opt-out</b><span>Zones where no measurement takes place</span></div>
          <div className="pg-fact"><b>Open data</b><span>Anonymized datasets public, null results published</span></div>
        </div>
      </Section>

      <Section eyebrow="Entry points" title="Where to start reading.">
        <DocLinks items={[
          {to: '/docs/concepts/energy-systems', tag: 'Concepts', title: 'Energy systems', text: 'The two-track model and measurement discipline.'},
          {to: '/docs/research/open-questions', tag: 'Research', title: 'Open questions', text: 'Hypotheses we want tested, and how we would know.'},
          {to: '/docs/research/bibliography', tag: 'Research', title: 'Bibliography', text: 'The literature behind each program.'},
          {to: '/blog', tag: 'Updates', title: 'Project updates', text: 'Progress notes and announcements.'},
        ]} />
      </Section>

      <Cta title="Propose a study." text="Use the contact form and choose Researcher. We welcome collaborators, critics and replication partners." primary={{to: '/contact', label: 'Contact as a researcher'}} secondary={{to: '/docs/research/open-questions', label: 'See open questions'}} />
    </Site>
  );
}
