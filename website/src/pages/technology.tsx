import React from 'react';
import Site, {Section, Cards, DocLinks, Cta, Feature, Jump} from '../components/Site';

export default function Technology(): JSX.Element {
  return (
    <Site
      title="Technology"
      description="The technology behind Light City: proven systems built from day one, scaling technologies procured in Stage 5, emerging options for Phase 2 and frontier research."
      eyebrow="Technology"
      heading={<>Built on what works, <em>ready for what comes next.</em></>}
      sub="Light City builds with proven technology from day one, designs room for what is scaling now, and studies frontier ideas openly without ever depending on them."
      image="city-microgrid">
      <Section>
        <Jump items={[
          {href: '#horizons', label: 'Four horizons'},
          {href: '#systems', label: 'City systems'},
          {href: '#scaling', label: 'Scaling in 2026'},
          {href: '#realism', label: 'Realism notes'},
        ]} />
        <div className="pg-facts">
          <div className="pg-fact"><b>2–5 MWp</b><span>solar microgrid in Phase 1</span></div>
          <div className="pg-fact"><b>8–20 MWh</b><span>battery storage</span></div>
          <div className="pg-fact"><b>TRL 7–9</b><span>for everything residents depend on</span></div>
          <div className="pg-fact"><b>0</b><span>health claims without published evidence</span></div>
        </div>
      </Section>

      <Section alt id="horizons" eyebrow="Four horizons" title="Every technology carries a readiness label." lead="TRL is the Technology Readiness Level, from 1 (idea) to 9 (proven at scale). The rule for each horizon decides when, or whether, we use it.">
        <ol className="pg-steps">
          <li className="now"><span className="when">TRL 8–9</span><h3>Proven</h3><p>Build with it from day one: mass timber, silicon solar, LFP batteries, heat pumps, greenhouses.</p></li>
          <li><span className="when">TRL 6–8</span><h3>Scaling</h3><p>Design for it, buy it in Stage 5 (2028–2031) if bankable: tandem solar, sodium-ion, AI controls.</p></li>
          <li><span className="when">TRL 4–6</span><h3>Emerging</h3><p>Leave space and interfaces, adopt in Phase 2: transparent wood, bio-materials, self-healing concrete.</p></li>
          <li><span className="when">TRL 1–3</span><h3>Frontier</h3><p>Study openly with independent partners, never depend on it: coherence, resonance, subtle energy.</p></li>
        </ol>
      </Section>

      <Section id="systems" eyebrow="City systems" title="Five systems keep the city alive.">
        <Feature
          img="tech-bipv-solar-facade"
          alt="Building-integrated solar glass facade"
          kicker="Energy"
          title="Solar microgrid & storage"
          tag="Proven · TRL 8–9"
          specs={[['Generation', '2–5 MWp solar, incl. spire and domes'], ['Storage', '8–20 MWh, sodium-ion or LFP'], ['Resilience', 'Grid-tied, can island'], ['Later', 'Iron-air, geothermal in Phase 2']]}>
          <p>Ground-mounted arrays, solar glass on the domes and panels on the spire feed a community-owned microgrid. Batteries cover the night; the regional grid and biogas cover long cloudy spells.</p>
          <p>Sodium-ion is the preferred storage chemistry if 2026–2027 pricing holds. Multi-day iron-air storage becomes relevant when Phase 2 loads justify it.</p>
        </Feature>
        <Feature
          reverse
          img="tech-living-machine"
          alt="Living machine water treatment with plants in tanks"
          kicker="Water"
          title="Closed-loop water"
          tag="Proven · TRL 8–9"
          specs={[['Supply', 'Rainwater harvesting + well/municipal'], ['Treatment', 'Living machines, constructed wetlands'], ['Reuse', 'Greywater to irrigation'], ['Monitoring', 'Real-time quality sensors']]}>
          <p>Rain is captured from dome and roof surfaces, stored and filtered. Wastewater passes through planted treatment systems and wetlands, then returns as irrigation for the food forest.</p>
          <p>Each step is proven. Sizing depends on the site's rainfall, which is why site selection in Stage 1 matters.</p>
        </Feature>
        <Feature
          img="tech-agroforestry"
          alt="Layered agroforestry with fruit trees and crops"
          kicker="Food"
          title="Greenhouses, food forest & aquaponics"
          tag="Proven · TRL 8–9"
          specs={[['Phase 1', '1–2 ha agroforestry + greenhouses'], ['Phase 2', '5–10 ha, near self-sufficiency'], ['Indoor', 'Herbs, microgreens, mushrooms'], ['Loop', 'Kitchen compost back to soil']]}>
          <p>Solar greenhouses and layered agroforestry use a fraction of the energy of indoor farms. Aquaponics adds fish and greens in one loop. Fully indoor growing is kept for niche crops only.</p>
        </Feature>
        <Feature
          reverse
          img="tech-clt-construction"
          alt="Cross-laminated timber panels being assembled"
          kicker="Buildings"
          title="Mass timber & bio-based materials"
          tag="Proven to Emerging"
          specs={[['Structure', 'CLT and glulam, prefabricated'], ['Envelope', 'Hempcrete, mycelium insulation'], ['Glazing', 'Solar glass; tandem PV if durable'], ['Site work', '3D-printed walls and foundations']]}>
          <p>Factory-made timber panels go up fast and store carbon. The tallest timber building today is 86.6 m, so a 60–120 m timber-steel spire sits within the demonstrated range, though its exact form is new.</p>
          <p>3D-printed construction handles foundations, garden walls and studios; prefabricated CLT remains the main method for the domes.</p>
        </Feature>
        <Feature
          img="research"
          alt="Researcher with environmental sensors in a calm interior"
          kicker="Wellbeing"
          title="Healthy interiors & open research"
          tag="Proven + Frontier"
          specs={[['Lighting', 'Circadian, tuned by time of day'], ['Air', 'CO₂, humidity, VOC sensors'], ['Tools', 'Optional EEG/fNIRS for practice'], ['Research', 'Preregistered, published, incl. nulls']]}>
          <p>Daylight, clean air, quiet and greenery are designed in from the start. Optional neurotech tools support meditation practice and research, and are never required.</p>
          <p>Questions such as group coherence or the effect of sacred proportions are studied openly with independent partners. Results are published, including null results.</p>
        </Feature>
      </Section>

      <Section alt night id="scaling" eyebrow="Scaling in 2026" title="What changed this year." lead="These technologies moved from labs into factories in 2026. Light City will decide between them with field data from 2027–2028.">
        <Cards items={[
          {title: 'Perovskite-silicon tandem solar', kicker: 'Energy', text: 'Commercial production began in the US with modules above 27% efficiency, delivering in 2027. Candidate for the spire canopy and dome glazing.'},
          {title: 'Sodium-ion batteries', kicker: 'Storage', text: 'Mass production by end of 2026, safe and cold-tolerant, with costs approaching LFP. Preferred Phase 1 storage if pricing holds.'},
          {title: 'Enhanced geothermal', kicker: 'Firm power', text: 'First commercial plant at 33 MW in Utah in 2026. Site-dependent option for always-on heat and power from Phase 2.'},
          {title: 'AI building digital twins', kicker: 'Operations', text: 'Studies report 15–40% HVAC savings. The Stage 3 design model becomes the operating twin of the real city.'},
        ]} />
      </Section>

      <Section id="realism" eyebrow="Realism notes" title="Lessons already learned.">
        <div className="pg-prose">
          <ul>
            <li><strong>Vertical farming is not the default.</strong> Several well-funded vertical farms closed between 2023 and 2026, and fully indoor farms can use several times the energy of greenhouses.</li>
            <li><strong>Timelines slip.</strong> Solid-state batteries are years behind early promises. We plan with what ships today and treat new technology as an upgrade path.</li>
            <li><strong>The spire is the boldest structure.</strong> At TRL 4–5 it is a novel assembly of proven parts, so it gets the most engineering review in Stage 2.</li>
            <li><strong>No dependence on the frontier.</strong> Nothing residents rely on for safety, comfort or cost depends on unproven technology.</li>
          </ul>
        </div>
      </Section>

      <Section alt eyebrow="Go deeper" title="Technology in the library.">
        <DocLinks items={[
          {to: '/docs/technical/technology-horizon', tag: 'Technology', title: 'Technology horizon', text: 'Sourced status of every technology, updated each stage.'},
          {to: '/docs/technical/technology-catalog', tag: 'Technology', title: 'Technology catalog', text: 'Detailed entries with costs, TRL and suppliers.'},
          {to: '/docs/concepts/energy-systems', tag: 'Technology', title: 'Energy systems', text: 'The physical microgrid and the research track.'},
          {to: '/docs/research/open-questions', tag: 'Research', title: 'Open questions', text: 'What we study, and how we test it.'},
        ]} />
      </Section>

      <Cta title="Bring your expertise." text="Engineers, researchers and suppliers can help choose and validate Light City's systems." primary={{to: '/researchers', label: 'For researchers'}} secondary={{to: '/builders', label: 'For builders'}} />
    </Site>
  );
}
