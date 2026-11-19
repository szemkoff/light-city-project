import React from 'react';
import Site, {Section, Cards, Topic, Cta, Jump} from '../components/Site';

const PARTS = [
  {id: 'orientation', part: 'Orientation', items: [
    {to: '/docs/START-HERE', title: 'Start here', summary: 'How the library tells one story in nine parts, with reading paths for residents, investors, builders and researchers.', points: ['Nine-part reading order', 'Paths by audience', 'How vision and reality are held together']},
    {to: '/docs/at-a-glance', title: 'Light City at a glance', summary: 'The single source of truth for every number: residents, budgets, timeline, homes and systems for each phase.', points: ['Phase 1: 200 residents, ~$45M', 'Six stages, move-in 2031', 'Phase 2 and 3 targets']},
    {to: '/docs/glossary', title: 'Glossary', summary: 'Plain-language definitions of 72 terms, from agrivoltaics to TRL, each tagged with its readiness horizon.', points: ['Technical and visionary terms', 'Horizon tag on every term', 'Linkable anchors']},
  ]},
  {id: 'why', part: '1 · Why', items: [
    {to: '/docs/concepts/core-concepts', title: 'Core concepts', summary: 'What Light City is: a regenerative community of timber-and-glass domes around a solar spire, designed so consciousness and daily life support each other.', points: ['Core principles', 'The architecture of light', 'Visionary archetype as inspiration']},
    {to: '/docs/concepts/philosophy', title: 'Philosophy', summary: 'The worldview behind the project: consciousness as primary, unity within diversity, evolutionary purpose and sacred pragmatism.', points: ['Perennial, integral and process philosophy', 'Ethical framework', 'From philosophy to a lived path']},
    {to: '/docs/concepts/purpose-and-mission', title: 'Purpose & mission', summary: 'Why the project exists, who it serves and how success is measured, from documentation to a built, thriving community.', points: ['Mission and specific goals', 'Success metrics', 'Principles of operation']},
  ]},
  {id: 'transition', part: '2 · The transition', items: [
    {to: '/docs/concepts/the-transition', title: 'The transition', summary: 'Five movements from today to the Light City future, each pairing an inner shift with an outer form, a stage, and what we measure.', points: ['Awakening → Radiating', 'Evidence for each step', 'Six humane principles']},
  ]},
  {id: 'city', part: '3 · The city', items: [
    {to: '/docs/design/architecture', title: 'Architecture', summary: 'The concentric plan, spire, domes and housing, from visionary archetype to an Earth build, with the phase-by-phase budget.', points: ['Rings and radial paths', 'Crystal spire 90–240 m, domes 30–45 m', 'Subsystems with TRL']},
    {to: '/docs/design/organic-forms-and-materials', title: 'Beyond the box', summary: 'Curved forms and healthy, low-cost materials: earthbag, printed earth, timber gridshells, thin shells and clay plaster, with costs, evidence and a bio-resonance research track.', points: ['What energy flow means, measurably', 'Methods by cost and readiness', 'Accessibility ladder']},
    {to: '/docs/concepts/communospheres', title: 'Communospheres', summary: 'Dome neighborhoods of 80–120 residents with terraced homes, shared kitchens and gardens under one shell.', points: ['Technical specifications', 'Construction approach', 'Living experience and challenges']},
    {to: '/docs/concepts/sacred-geometry', title: 'Sacred geometry', summary: 'The proportion systems behind the plan: circle, spiral, vesica piscis, flower of life, Platonic solids and the golden ratio.', points: ['Applied to layout and rooms', 'Historic precedents', 'Wellbeing effects as research questions']},
    {to: '/docs/design/visual-language', title: 'Visual language', summary: 'The design system for documents, diagrams, signage and the web: principles, tokens, imagery and accessibility.', points: ['Design tokens', 'Imagery system', 'Diagram conventions']},
    {to: '/docs/design/color-and-light', title: 'Color & light', summary: 'The palette and lighting principles that make light a structural element of the city.', points: ['Core and extended palette', 'Gradients', 'Lighting guidance']},
    {to: '/docs/design/layout-diagrams', title: 'Layout & diagrams', summary: 'City plan, energy flow and sacred-geometry diagrams, plus the required diagram set for Stage 1.', points: ['Completed diagrams', 'Required set', 'File and style conventions']},
  ]},
  {id: 'technology', part: '4 · Technology', items: [
    {to: '/docs/technical/technology-horizon', title: 'Technology horizon', summary: 'Every technology sorted into Proven, Scaling, Emerging and Frontier, with sourced 2026 status and the rule for each.', points: ['Tandem solar, sodium-ion, geothermal', 'Realism notes', 'Adoption timeline']},
    {to: '/docs/concepts/energy-systems', title: 'Energy systems', summary: 'A two-track model: a proven physical microgrid (TRL 6–9) and a clearly separated subtle-energy research track (TRL 1–3).', points: ['2–5 MWp solar, 8–20 MWh storage', 'Claim discipline', 'Safety and ethics']},
    {to: '/docs/technical/technology-catalog', title: 'Technology catalog', summary: 'Detailed entries for structure, energy, water, food, smart buildings, wellness, mobility and materials.', points: ['Readiness and cost per item', 'Light City application', 'Technology roadmap']},
    {to: '/docs/technical/urban-retrofit-guide', title: 'Urban retrofit guide', summary: 'How existing cities can adopt Light City patterns across five scales: policy, district, block, building and unit.', points: ['Five intervention scales', 'Miami case study', 'Measurement and evaluation']},
  ]},
  {id: 'living', part: '5 · Living together', items: [
    {to: '/docs/project/governance', title: 'Governance', summary: 'From founder-led to community council: sociocracy-style circles, 80% consent, one representative per 50 residents.', points: ['Legal structure (Delaware LLC)', 'Five protected core principles', 'Four-step conflict resolution']},
    {to: '/docs/project/contribution-based-residency', title: 'Contribution-based residency', summary: 'Three work-for-living tiers that open 20–30% of homes to people who contribute time instead of full fees.', points: ['Tiers from $0 to $700/month', 'Contribution areas', 'Pilot in 2027–2028']},
  ]},
  {id: 'economy', part: '6 · Economy', items: [
    {to: '/docs/project/economy-and-migration', title: 'Economy and migration', summary: 'How Light City moves from monthly fees to Light hours, a time credit, and optionally to no money inside the community, with a measured gate and a resident vote before every step.', points: ['Light hours: one hour of work, one credit', 'Four-phase dial', 'Phase 3 is a yearly-reviewed option']},
  ]},
  {id: 'roadmap', part: '7 · Roadmap', items: [
    {to: '/docs/project/development-stages', title: 'Development stages', summary: 'Six stages from foundation to operation, each with costs, deliverables, KPIs, risks and a gate that must be met.', points: ['Stage 1 gate review Dec 2026', 'Financial model and IRR', 'Stage-gate checklist']},
    {to: '/docs/project/site-locations', title: 'Site locations', summary: 'Five candidate regions for the first city, all above 350 ft, scored on sun, water, geothermal, hydro, earth-building codes, land and community.', points: ['New Mexico, Oregon, Portugal, Spain, Costa Rica', 'Scorecard and map', 'Steps to choose the site']},
  ]},
  {id: 'research', part: '8 · Research', items: [
    {to: '/docs/research/open-questions', title: 'Open questions', summary: 'The research agenda: practical, community, wellbeing and frontier questions, with when each answer is needed.', points: ['Preregistration and publishing', 'Independent partners', 'Research timeline']},
    {to: '/docs/research/bibliography', title: 'Bibliography', summary: 'Every source behind the library, graded from A (peer-reviewed) to E (visionary, non-empirical).', points: ['Source grades', 'Technology status sources', 'Community and wellbeing research']},
  ]},
  {id: 'origin', part: '9 · Where the idea came from', items: [
    {to: '/docs/concepts/the-archetype', title: 'The archetype', summary: 'The visionary source behind Light City, described in its own terms and kept separate from what we plan to build.', points: ['What the source describes', 'How the archetype is translated', 'Claims we test, not assume']},
  ]},
  {id: 'contribute', part: 'Contribute', items: [
    {to: '/docs/project/contributing', title: 'Contributing', summary: 'Ways to help with writing, design, technology, research and community, and how contributions are reviewed.', points: ['Contribution process', 'Licensing', 'What not to contribute']},
    {to: '/docs/project/quick-start-guide', title: 'Quick-start guide', summary: 'A short orientation for new contributors: what to read first and good first tasks.', points: ['First steps', 'Suggested tasks', 'Getting help']},
    {to: '/docs/project/project-structure', title: 'Project structure', summary: 'How the repository and library are organized, with naming and documentation standards.', points: ['Directory overview', 'File conventions', 'Documentation standards']},
    {to: '/docs/project/tools-and-workflows', title: 'Tools & workflows', summary: 'Recommended tools for writing, design, development and community at each stage.', points: ['Minimal toolset', 'Workflow by stage', 'Selection principles']},
  ]},
];

export default function Explore(): JSX.Element {
  return (
    <Site
      title="Explore"
      description="Explore Light City: visual guides to the homes, the city, technology and the transition, plus a summary of every topic in the library."
      eyebrow="Explore"
      heading={<>Everything about Light City, <em>in one place.</em></>}
      sub="Start with the visual guides, then go as deep as you like. Every topic in the open library is summarized here with a link to the full page."
      image="city-aerial">
      <Section eyebrow="Visual guides" title="Four ways into the vision.">
        <Cards items={[
          {title: 'Homes & daily life', img: 'home-2br', kicker: 'Homes', text: 'Five home types, who fits where, what is included, contribution-based residency and the path to moving in.'},
          {title: 'The city', img: 'city-dome-cutaway', kicker: 'City', text: 'The rings, the spire, domes, temple, studios, greenhouses and microgrid, with Phase 1 specifications.'},
          {title: 'Technology', img: 'city-microgrid', kicker: 'Technology', text: 'Proven, scaling, emerging and frontier technologies, and how each is used or studied.'},
          {title: 'The transition', img: 'journey-gathering', kicker: 'Journey', text: 'Five movements from today to the Light City future, and how to take part at each one.'},
        ].map((c, i) => ({...c, to: ['/homes', '/city', '/technology', '/journey'][i]}))} />
      </Section>

      <Section alt eyebrow="The library" title="Every topic, summarized." lead="The library is open and free. It is organized as one story in nine parts, from why to how to get involved.">
        <Jump items={PARTS.map((p) => ({href: `#${p.id}`, label: p.part}))} />
        {PARTS.map((p) => (
          <div key={p.id} id={p.id} style={{scrollMarginTop: 110}}>
            <Topic part={p.part} items={p.items} />
          </div>
        ))}
      </Section>

      <Cta title="Ready to go deeper?" text="Read the full library, or join the founding circle for updates." primary={{to: '/docs/START-HERE', label: 'Open the library'}} secondary={{to: '/#join', label: 'Join the founding circle'}} />
    </Site>
  );
}
