import React from 'react';
import Site, {Section, Cards, DocLinks, Cta} from '../components/Site';

export default function Investors(): JSX.Element {
  return (
    <Site
      title="For Investors"
      description="Impact-aligned capital, transparent governance and a phased path from documentation to physical site."
      eyebrow="For investors"
      heading={<>Patient capital. <em>Measurable returns.</em></>}
      sub="Light City is structured for serious diligence: phased capital expenditure, documented assumptions, governance milestones and a clear line between proven infrastructure and exploratory research."
      image="investors-site">
      <Section eyebrow="Phase 1 at a glance" title="The numbers behind the first 200 residents." lead="Mid-case figures from the financial model. Full assumptions and ranges are in the development stages documentation.">
        <div className="pg-facts">
          <div className="pg-fact"><b>$45M</b><span>Capital expenditure, Phase 1</span></div>
          <div className="pg-fact"><b>$2.5M</b><span>Annual operating cost</span></div>
          <div className="pg-fact"><b>200</b><span>Resident capacity</span></div>
          <div className="pg-fact"><b>180</b><span>Residents to break even</span></div>
          <div className="pg-fact"><b>8–12%</b><span>Target impact IRR</span></div>
        </div>
      </Section>

      <Section alt eyebrow="Why it is investable" title="Ambitious in form. Conservative in engineering.">
        <Cards items={[
          {title: 'Proven infrastructure', img: 'tech-bipv-solar-facade', text: 'Microgrid, mass timber and geodesic structures already stand elsewhere. 2–5 MWp of solar in Phase 1 is carried as engineering, not research.'},
          {title: 'Phased commitments', img: 'tech-clt-construction', text: 'Capital is staged with each development stage, so every tranche is tied to a documented milestone and decision point.'},
          {title: 'Separated research track', img: 'journey-awakening', text: 'Consciousness and experiential programs run on their own track with honest readiness levels, so they never carry the core business case.'},
        ]} />
      </Section>

      <Section night eyebrow="Risk register" title="Risks already priced in." lead="Each major risk has a named mitigation and a line in the budget, including a 20% contingency.">
        <div className="pg-cards">
          {[
            ['Wildfire', 'Fire-resistant materials, defensible space and insurance.'],
            ['Wind loads', 'Wind-tunnel testing and dome reinforcement.'],
            ['Water rights', 'Legal review, well permits and backup sources.'],
            ['Budget creep', '20% contingency and phased value engineering.'],
            ['Neighbors', 'Early engagement and benefit sharing.'],
          ].map(([t, d]) => (
            <article className="pg-card" key={t}><div className="pg-card-body"><h3>{t}</h3><p>{d}</p></div></article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Diligence" title="What to review first.">
        <DocLinks items={[
          {to: '/docs/project/development-stages', tag: 'Project', title: 'Development stages', text: 'Timeline, costs and financial model notes for all six stages.'},
          {to: '/docs/project/site-locations', tag: 'Land', title: 'Site locations', text: 'Five regions in the US, Portugal, Spain and Costa Rica, scored on energy, water, codes, land law and risk. No land bought yet.'},
          {to: '/docs/project/governance', tag: 'Project', title: 'Governance', text: 'Decision rights, community structure and transparency commitments.'},
          {to: '/docs/design/architecture', tag: 'Design', title: 'Architecture', text: 'Earth-scale implementation compared with the inspirational reference.'},
          {to: '/docs/technical/technology-catalog', tag: 'Technical', title: 'Technology catalog', text: 'Every system we plan to use, with its readiness level.'},
        ]} />
      </Section>

      <Cta title="Talk to us about the raise." text="Use the contact form and choose Investor. We will send the current materials and set up a call." primary={{to: '/contact', label: 'Contact as an investor'}} secondary={{to: '/docs/START-HERE', label: 'Read the documentation'}} />
    </Site>
  );
}
