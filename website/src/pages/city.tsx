import React from 'react';
import Link from '@docusaurus/Link';
import Site, {Section, Cards, DocLinks, Cta, Feature, Jump} from '../components/Site';

export default function City(): JSX.Element {
  return (
    <Site
      title="The City"
      description="How Light City is laid out: concentric rings, the spire, communosphere domes, temple, studios, greenhouses and microgrid, with Phase 1 specifications."
      eyebrow="The city"
      heading={<>A city laid out <em>like a living system.</em></>}
      sub="Concentric rings from a central spire to a wild buffer: gathering at the heart, homes in the middle, food and energy at the edge. Everything is walkable."
      image="city-aerial">
      <Section>
        <Jump items={[
          {href: '#rings', label: 'The rings'},
          {href: '#structures', label: 'Key structures'},
          {href: '#phases', label: 'Growth by phase'},
          {href: '#beyond-the-box', label: 'Beyond the box'},
          {href: '#language', label: 'Design language'},
        ]} />
        <div className="pg-facts">
          <div className="pg-fact"><b>20–30</b><span>acre Phase 1 core within a 100–500 acre site</span></div>
          <div className="pg-fact"><b>3</b><span>communosphere domes, 30–45 m across</span></div>
          <div className="pg-fact"><b>60–120 m</b><span>central spire in Phase 1</span></div>
          <div className="pg-fact"><b>10 min</b><span>walk from any home to the plaza</span></div>
        </div>
      </Section>

      <Section alt id="rings" eyebrow="The rings" title="From the center outward." lead="The plan follows concentric circles joined by radial paths, like spokes. Quiet and shared life sits at the center; production and wild land sit at the edge.">
        <ol className="pg-steps">
          <li className="now"><span className="when">Center</span><h3>Spire & plaza</h3><p>The landmark tower, the main plaza, markets and festivals.</p></li>
          <li><span className="when">Inner ring</span><h3>Temple & learning</h3><p>Temple, quiet rooms, library, learning center and clinic.</p></li>
          <li><span className="when">Middle ring</span><h3>Studios & domes</h3><p>Maker studios, co-working and the communosphere domes with their apartments.</p></li>
          <li><span className="when">Outer ring</span><h3>Homes & gardens</h3><p>Family ring housing, tiny-home clusters, greenhouses and food forest.</p></li>
          <li><span className="when">Edge</span><h3>Energy & wild buffer</h3><p>Solar microgrid, water treatment, fields and a protected woodland margin.</p></li>
        </ol>
      </Section>

      <Section id="structures" eyebrow="Key structures" title="What gets built, and how ready it is." lead="Each structure shows its Technology Readiness Level (TRL): 9 means proven at scale, 1 means early research.">
        <Feature
          img="spire"
          alt="Slender lattice spire rising above the central plaza"
          kicker="Central sanctum"
          title="The spire"
          tag="TRL 4–5 at full scale"
          specs={[['Height', '60–120 m (Phase 1)'], ['Structure', 'Steel and CLT lattice'], ['Solar', '200–500 kWp integrated'], ['Role', 'Landmark, observation, energy']]}>
          <p>The spire is the city's orientation point: visible from every path, lit at night, and carrying building-integrated solar. Its first purpose is practical: a landmark, an observation deck, a communications mast and a solar collector.</p>
          <p>Tall timber-hybrid towers exist today, but a lattice spire of this height with integrated solar has not been built, so it will be engineered and reviewed in Stage 2. Phase 2 could extend it to 120–300 m.</p>
        </Feature>
        <Feature
          reverse
          img="city-dome-cutaway"
          alt="Inside a timber gridshell dome: terraced apartments, a garden atrium, tall quartz points on stone pedestals and a sunken fire lounge"
          kicker="Neighborhood"
          title="Communosphere"
          tag="TRL 7–9"
          specs={[['Diameter', '30–45 m'], ['Levels', '3–5 terraced floors'], ['Residents', '80–120 per dome'], ['Build', 'CLT frame, solar glass']]}>
          <p>Each communosphere is a neighborhood under one dome: apartments terraced around a planted atrium, a shared kitchen and dining hall, and wellness spaces. The shell creates a mild indoor climate, cutting heating and cooling needs.</p>
          <p>Geodesic domes and cross-laminated timber are both proven. The new part is combining them at this size with homes inside, which is a design challenge rather than a research one.</p>
        </Feature>
        <Feature
          img="city-temple"
          alt="Circular timber temple with an oculus lighting a single tall quartz point on a round stone pedestal and a fire bowl"
          kicker="Inner ring"
          title="Temple & plaza"
          tag="TRL 9"
          specs={[['Use', 'Meditation, ceremony, gatherings'], ['Access', 'Open to all, no doctrine'], ['Build', 'Timber, rammed earth, stone'], ['Plaza', 'Markets, festivals, daily life']]}>
          <p>A non-denominational temple for silence, meditation and community ceremonies, proportioned with sacred geometry, with a single upright quartz point on a stone pedestal under the oculus and a fire bowl for evening gatherings. Participation in any practice is always voluntary.</p>
          <p>The plaza beside it is the city's living room: morning markets, performances, seasonal festivals and the everyday crossing point of the whole community.</p>
        </Feature>
        <Feature
          reverse
          img="city-studios"
          alt="Modern maker studio with a CNC router, 3D printer, woodworking benches and a quartz point on a timber stand"
          kicker="Middle ring"
          title="Studios & workshops"
          tag="TRL 9"
          specs={[['Spaces', 'Wood, ceramics, textiles, digital'], ['Access', 'All residents, with training'], ['Also', 'Co-working, music, classrooms'], ['Economy', 'Craft sales and workshops']]}>
          <p>Shared studios make it possible to live in a small home and still have access to a full woodshop, ceramics, textiles, digital fabrication and quiet co-working.</p>
          <p>They also support the local economy: residents can teach workshops, sell what they make and repair what the city needs.</p>
        </Feature>
        <Feature
          img="city-greenhouse"
          alt="Curved timber-and-glass greenhouse beside a food forest with residents harvesting"
          kicker="Outer ring"
          title="Greenhouses & food forest"
          tag="TRL 8–9"
          specs={[['Phase 1', '1–2 ha agroforestry + greenhouses'], ['Systems', 'Greenhouse, aquaponics, agroforestry'], ['Water', 'Rainwater and recycled greywater'], ['Waste', 'Compost back to soil']]}>
          <p>Year-round solar greenhouses, aquaponics and a layered food forest supply a meaningful share of fresh produce in Phase 1, growing to 5–10 ha and near self-sufficiency in Phase 2. Compost from kitchens returns to the soil, closing the loop.</p>
          <p>Phase 1 is deliberately modest: staple grains and some goods will still come from regional farms, which also builds ties with neighbors.</p>
        </Feature>
        <Feature
          reverse
          img="city-microgrid"
          alt="Curved solar canopies over a sheep meadow with timber battery pavilions"
          kicker="Edge"
          title="Microgrid"
          tag="TRL 8–9"
          specs={[['Solar', '2–5 MWp'], ['Storage', '8–20 MWh batteries'], ['Backup', 'Grid tie, biogas or bio-ethanol (no diesel)'], ['Monitoring', 'Open, real-time dashboard']]}>
          <p>A community-owned solar microgrid with battery storage powers homes, workshops and greenhouses. It stays connected to the regional grid for resilience and can island during outages.</p>
          <p>All of this is proven, off-the-shelf technology. The design work is in sizing, siting and making the energy flows visible to residents.</p>
        </Feature>
      </Section>

      <Section alt id="phases" eyebrow="Growth by phase" title="Built in steps, each one proven before the next.">
        <div className="pg-table-wrap">
          <table className="pg-table">
            <thead><tr><th></th><th>Phase 1 · Pilot Hamlet</th><th>Phase 2 · Village</th><th>Phase 3 · Town</th></tr></thead>
            <tbody>
              <tr><th>Residents</th><td>200 (150–300)</td><td>1,500 (1,500–3,000)</td><td>8,000+</td></tr>
              <tr><th>Domes</th><td>3 domes, 30–45 m</td><td>6–12 domes, 45–60 m</td><td>Up to 90 m, 400 residents each</td></tr>
              <tr><th>Spire</th><td>60–120 m</td><td>120–300 m</td><td>Up to 300 m</td></tr>
              <tr><th>Timing</th><td>Move-in 2031</td><td>Mid-2030s</td><td>2040s+</td></tr>
              <tr><th>Gate to next phase</th><td>Break-even at 180 residents</td><td>Proven operations and demand</td><td>Regional partnerships</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="beyond-the-box" eyebrow="Beyond the box" title="Curved, healthy and affordable." lead="High-tech design, low-tech materials: computers find efficient curved shapes, then we build them from earth, stone, timber, bamboo and lime that residents can handle, chosen from what each site provides. Curves use less material, hold heat better and are rated more beautiful in brain-imaging studies.">
        <Feature
          img="form-printed-earth"
          alt="A cluster of 3D-printed earth dwellings with green roofs and a printer finishing a fourth dome"
          kicker="Tiny homes"
          title="Earth homes from local soil"
          tag="Proven to Emerging"
          specs={[['Earthbag materials', '$5–15 per sq ft'], ['Printed earth', 'Local soil and rice husk'], ['Printer', '~€132–160k, reusable'], ['Best climate', 'Dry to mild first']]}>
          <p>Tiny-home clusters can be built from superadobe (earth-filled bags coiled into domes) or printed from raw earth, as in the TECLA prototype in Italy. Residents can help build, and that work can count toward contribution-based residency.</p>
          <p>Earth walls breathe, store heat and contain no synthetic finishes. Durability in wet or freezing climates still needs proof, so we test before we commit.</p>
        </Feature>
        <Feature
          reverse
          img="form-gridshell"
          alt="Community studio under a sweeping timber gridshell roof"
          kicker="Studios, domes, greenhouses"
          title="Timber gridshells"
          tag="Proven"
          specs={[['Structure', 'Thin bent wood laths'], ['Material', 'Optimized designs ~26% less'], ['Weight', '~40% of a comparable glass-steel roof'], ['Cost driver', 'Skilled erection labor']]}>
          <p>Thin wooden laths are laid flat, bent into a double curve and locked in place. They span large rooms with little wood, which suits studios, market halls, greenhouses and the communosphere roofs.</p>
        </Feature>
        <div style={{marginTop: '3rem'}} />
        <Cards items={[
          {title: 'Clay plaster everywhere', kicker: 'Healthy interiors', img: 'form-earth-dome', text: 'Holds indoor humidity steady and removes ozone. The cheapest health upgrade, and it works on curves and in existing homes.'},
          {title: 'Local stone', kicker: 'Materials follow the place', text: 'Plinths, terrace walls, hearths and paths in the stone of each region: granite and schist in Portugal, sandstone in New Mexico, basalt on volcanic land. Lowest carbon when quarried nearby.'},
          {title: 'Thin shells', kicker: 'Canopies & floors', img: 'form-thin-shell', text: 'Arched shells carry load in compression, using over 70% less concrete and allowing earth or recycled mixes.'},
          {title: 'Curved shell, efficient core', kicker: 'Practical', text: 'Kitchens, baths and storage stay straight inside curved rooms, so standard fittings still work and costs stay down.'},
          {title: 'Bio-resonance as research', kicker: 'Frontier', text: 'We will compare matched curved and boxy rooms for sleep, stress and acoustics with university partners, and publish results either way.'},
        ]} />
        <p style={{marginTop: '1.5rem'}}><Link to="/docs/design/organic-forms-and-materials">Read Beyond the Box in the library: methods, costs, evidence and trade-offs →</Link></p>
      </Section>

      <Section alt id="language" eyebrow="Design language" title="Four rules shape every building.">
        <Cards items={[
          {title: 'Sacred geometry', kicker: 'Proportion', text: 'Circles, spirals and the golden ratio set the plan, room proportions and facade rhythms, giving the city a coherent, calming order.'},
          {title: 'Biophilic design', kicker: 'Nature', text: 'Daylight, planting, natural materials and views to green in every space. Proven to lower stress and improve wellbeing.'},
          {title: 'Light & color', kicker: 'Atmosphere', text: 'Warm whites, pearl and gold, with lighting tuned to the time of day to support natural sleep and focus rhythms.'},
          {title: 'Low-carbon materials', kicker: 'Materials', text: 'Cross-laminated timber, hempcrete, rammed earth and mycelium insulation store carbon instead of emitting it.'},
        ]} />
      </Section>

      <Section eyebrow="Go deeper" title="The city in the library.">
        <DocLinks items={[
          {to: '/docs/design/architecture', tag: 'City', title: 'Architecture', text: 'Ring layout, building types and construction approach.'},
          {to: '/docs/concepts/communospheres', tag: 'City', title: 'Communospheres', text: 'Dome neighborhoods in detail.'},
          {to: '/docs/design/organic-forms-and-materials', tag: 'Design', title: 'Beyond the box', text: 'Curved forms and healthy, low-cost materials.'},
          {to: '/locations', tag: 'Land', title: 'Locations', text: 'Five regions in four countries, scored and mapped.'},
          {to: '/docs/at-a-glance', tag: 'Facts', title: 'At a glance', text: 'Every key number for each phase.'},
          {to: '/docs/concepts/sacred-geometry', tag: 'Design', title: 'Sacred geometry', text: 'The proportions behind the plan.'},
        ]} />
      </Section>

      <Cta title="Help design the first hamlet." text="Architects, engineers and builders can join Stage 2 design work in 2027." primary={{to: '/builders', label: 'For builders'}} secondary={{to: '/homes', label: 'See the homes'}} />
    </Site>
  );
}
