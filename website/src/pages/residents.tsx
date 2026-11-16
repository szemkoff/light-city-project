import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Site, {Section, Cards, DocLinks, Cta} from '../components/Site';

export default function Residents(): JSX.Element {
  const living = useBaseUrl('img/home/dome-interior.webp');
  return (
    <Site
      title="For Residents"
      description="Living philosophy, contribution-based residency and realistic timelines for community formation."
      eyebrow="For future residents"
      heading={<>A day that <em>follows the sun.</em></>}
      sub="Residency is organized around governance participation, shared infrastructure and clear expectations for both lifestyle and contribution."
      image="living">
      <Section>
        <div className="pg-split">
          <div>
            <p className="eyebrow">Life in a communosphere</p>
            <h2>Shared domes, private homes, one community.</h2>
            <p className="lead">Homes are all-inclusive: utilities, 10–15 communal meals a month, sauna, yoga and maintenance, plus a vote in governance. Gardens, workshops and gathering spaces sit under luminous timber domes.</p>
          </div>
          <img src={living} alt="Interior of a timber and glass dome with gardens and gathering spaces" loading="lazy" />
        </div>
      </Section>

      <Section alt eyebrow="Homes" title="Four sizes, one inclusive monthly fee." lead="Planned ranges for Phase 1. Final pricing follows the design and permitting stages.">
        <div className="pg-facts">
          <div className="pg-fact"><b>$500–700</b><span>Tiny home · 200–300 sf / month</span></div>
          <div className="pg-fact"><b>$700–950</b><span>Studio · 400–500 sf / month</span></div>
          <div className="pg-fact"><b>$950–1,300</b><span>1-bedroom · 600–800 sf / month</span></div>
          <div className="pg-fact"><b>$1,300–1,700</b><span>2-bedroom · 900–1,200 sf / month</span></div>
        </div>
      </Section>

      <Section eyebrow="Contribution-based residency" title="Contribute your skills, offset your living costs." lead="Work-for-living tiers align resident time and talent with what the community needs. A pilot is planned for 2027–2028.">
        <Cards items={[
          {title: 'Grow', img: 'tech-vertical-farm', text: 'Food systems, agroforestry and aquaponics that feed the community.'},
          {title: 'Build & maintain', img: 'tech-clt-construction', text: 'Construction, energy systems and day-to-day care of shared infrastructure.'},
          {title: 'Hold space', img: 'vision-2', text: 'Education, wellness, hospitality and the ceremonies that bind a community.'},
        ]} />
      </Section>

      <Section alt eyebrow="Start here" title="Read before you apply.">
        <DocLinks items={[
          {to: '/docs/project/contribution-based-residency', tag: 'Project', title: 'Contribution-based residency', text: 'Tiers, expectations and how the pilot will run.'},
          {to: '/docs/concepts/purpose-and-mission', tag: 'Concepts', title: 'Purpose & mission', text: 'What the community is for and how it measures success.'},
          {to: '/docs/project/governance', tag: 'Project', title: 'Governance', text: 'How residents take part in decisions.'},
          {to: '/docs/project/development-stages', tag: 'Project', title: 'Development stages', text: 'Realistic timelines for when residency opens.'},
        ]} />
      </Section>

      <Cta title="Be among the first residents." text="Join the founding circle for resident applications, or use the contact form and choose Future resident." primary={{to: '/#join', label: 'Join the founding circle'}} secondary={{to: '/contact', label: 'Contact us'}} />
    </Site>
  );
}
