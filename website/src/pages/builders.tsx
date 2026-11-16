import React from 'react';
import Site, {Section, Cards, DocLinks, Cta} from '../components/Site';

export default function Builders(): JSX.Element {
  return (
    <Site
      title="For Builders"
      description="Buildable specifications, technology readiness framing and energy systems that separate grid power from research programs."
      eyebrow="For builders"
      heading={<>Built from <em>what already works.</em></>}
      sub="Phased construction, geodesic and mass-timber options, acoustic targets and a two-track energy story: a physical microgrid plus optional subtle-environment research."
      image="dome-interior">
      <Section eyebrow="Systems" title="Every structure uses materials already standing elsewhere." lead="From Norway's 85.4 m Mjøstårnet timber tower to commercial geodesic domes, each system carries a technology readiness level (TRL).">
        <Cards items={[
          {kicker: 'Structure · TRL 7–9', title: 'Communosphere domes', img: 'tech-geodesic-dome', text: '30–90 m domes in cross-laminated timber and solar glass. Geometry that is both beautiful and proven.'},
          {kicker: 'Energy', title: 'Solar microgrid', img: 'tech-flow-battery', text: '2–5 MWp of solar in Phase 1, building-integrated photovoltaics and long-duration storage.'},
          {kicker: 'Water', title: 'Closed water loops', img: 'tech-living-machine', text: 'Rainwater harvesting, living-machine treatment and atmospheric water as backup.'},
          {kicker: 'Materials', title: 'Low-carbon envelope', img: 'tech-hempcrete', text: 'Hempcrete, mycelium insulation and mass timber chosen for embodied carbon and health.'},
        ]} />
      </Section>

      <Section night eyebrow="Two-track energy" title="Grid power and research never share a budget line." lead="The physical microgrid is specified and costed as engineering. Subtle-environment and resonance studies are optional programs with their own readiness levels.">
        <div className="pg-facts">
          <div className="pg-fact"><b>Track A</b><span>Physical microgrid: solar, storage and controls, proven at TRL 7–9</span></div>
          <div className="pg-fact"><b>Track B</b><span>Research environments: acoustics and resonance, exploratory</span></div>
        </div>
      </Section>

      <Section eyebrow="Key documents" title="Specifications and guides.">
        <DocLinks items={[
          {to: '/docs/design/architecture', tag: 'Design', title: 'Architecture', text: 'Domes, spire and site plan, from archetype to Earth implementation.'},
          {to: '/docs/technical/technology-catalog', tag: 'Technical', title: 'Technology catalog', text: 'Every system with images, readiness levels and references.'},
          {to: '/docs/concepts/energy-systems', tag: 'Concepts', title: 'Energy systems', text: 'The two-track model and measurement discipline.'},
          {to: '/docs/technical/urban-retrofit-guide', tag: 'Technical', title: 'Urban retrofit guide', text: 'Applying Light City systems to existing buildings and towns.'},
          {to: '/docs/project/contributing', tag: 'Project', title: 'Contributing', text: 'How to propose changes and work with us in the open.'},
        ]} />
      </Section>

      <Cta title="Build it with us." text="For technical or build collaboration, use the contact form and choose Collaborator." primary={{to: '/contact', label: 'Start a conversation'}} secondary={{to: '/docs/technical/technology-catalog', label: 'Browse the catalog'}} />
    </Site>
  );
}
