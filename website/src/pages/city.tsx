import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Site, {Section, Cards, DocLinks, Cta, Feature, Jump} from '../components/Site';

export default function City(): JSX.Element {
  const model = useBaseUrl('/model/index.html?phase=1');
  const modelImg = useBaseUrl('img/home/city-phase-3.webp');
  return (
    <Site
      title="The City"
      description="How Light City is laid out: concentric rings, the spire, communosphere domes, temple, studios, greenhouses and microgrid, with Phase 1 specifications."
      eyebrow="The city"
      heading={<>A city laid out <em>like a living system.</em></>}
      sub="Concentric rings from a central spire to a wild buffer: gathering at the heart, homes in the middle, food and energy at the edge. Everything is walkable."
      image="city-aerial"
      actions={<><a className="btn" href={model}>Explore the 3D model</a><a className="btn btn-ghost" href="#phases">See the three phases</a></>}>
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
          <div className="pg-fact"><b>90 m</b><span>crystal spire in Phase 1, 240 m at full build</span></div>
          <div className="pg-fact"><b>10 min</b><span>walk from any home to the plaza</span></div>
        </div>
      </Section>

      <Section id="model">
        <div className="pg-model">
          <img src={modelImg} alt="Rendering from the 3D model: the Phase 3 town with twelve domes around the central spire, timber terraces and a wide belt of solar and greenhouses" loading="lazy" width="1600" height="1000" />
          <div>
            <p className="eyebrow">Interactive 3D</p>
            <h2>Walk the whole plan in 3D.</h2>
            <p className="lead">One model of the city. Orbit, zoom and switch between Phase 1, 2 and 3 to see what each step adds, from the pilot hamlet to the town.</p>
            <a className="btn" href={model}>Explore the 3D model</a>
          </div>
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
        <Feature to="/docs/design/architecture#the-central-spire"
          img="spire"
          alt="The Crystal Point spire: a six-sided prism of milky solar glass with a faceted glass point, rising over domes and lawns at sunset"
          kicker="Central sanctum"
          title="The Crystal Point spire"
          tag="TRL 4–5 at full scale"
          specs={[['Height', '90 m → 150 m → 240 m'], ['Structure', 'Steel diagrid, solar glass, concrete core'], ['Energy', 'Solar glass + 6 helical wind turbines'], ['Role', 'Landmark, observatory, civic halls']]}>
          <p>Shaped like a natural quartz point: a six-sided prism of milky solar glass on a slender steel diagrid, a little wider at the foot, ending in a faceted glass point. It is the city's orientation point, seen from every path by day and glowing softly at night. Inside are a base hall, a gathering level, an enclosed observatory at 72 m, a water tank for the town, a learning level and a star room.</p>
          <p>In Phase 3 the top opens into a wind crown: six helical turbines, three per level, the upper row turned 60 degrees. Together with the solar glass they give very roughly 0.5–1 GWh a year, a supplement rather than the city's supply. The foundation is sized for 240 m from the start, so later phases add sections on top instead of rebuilding, as the Shukhov Tower in Moscow was built from stacked sections. <a href="pathname:///model/index.html?phase=3&amp;view=spire">See it in 3D</a>.</p>
        </Feature>
        <Feature to="/docs/concepts/communospheres"
          reverse
          img="city-dome-cutaway"
          alt="Inside a timber gridshell dome: terraced apartments, a garden atrium and a sunken lounge with sofas around a low table"
          kicker="Neighborhood"
          title="Communosphere"
          tag="TRL 7–9"
          specs={[['Diameter', '30–45 m'], ['Levels', '3–5 terraced floors'], ['Residents', '80–120 per dome'], ['Build', 'CLT frame, solar glass']]}>
          <p>Each communosphere is a neighborhood under one dome: apartments terraced around a planted atrium, a shared kitchen and dining hall, and wellness spaces. The shell creates a mild indoor climate, cutting heating and cooling needs.</p>
          <p>Geodesic domes and cross-laminated timber are both proven. The new part is combining them at this size with homes inside, which is a design challenge rather than a research one.</p>
        </Feature>
        <Feature to="/docs/design/architecture#2-temples-and-meditation-spaces"
          img="city-temple"
          alt="Circular timber temple with an oculus lighting a single quartz point on a stone pedestal and a shallow water basin, people seated on cushions"
          kicker="Inner ring"
          title="Temple & plaza"
          tag="TRL 9"
          specs={[['Use', 'Meditation, ceremony, gatherings'], ['Access', 'Open to all, no doctrine'], ['Build', 'Timber, rammed earth, stone'], ['Plaza', 'Markets, festivals, daily life']]}>
          <p>A non-denominational temple for silence, meditation and community ceremonies, proportioned with sacred geometry, with a single upright quartz point on a stone pedestal under the oculus and a shallow water basin at the center. Participation in any practice is always voluntary.</p>
          <p>The plaza beside it is the city's living room: morning markets, performances, seasonal festivals and the everyday crossing point of the whole community.</p>
        </Feature>
        <Feature to="/docs/design/architecture#5-creative-studios"
          reverse
          img="city-studios"
          alt="Modern maker studio with a CNC router, 3D printer, woodworking benches and a pottery corner"
          kicker="Middle ring"
          title="Studios & workshops"
          tag="TRL 9"
          specs={[['Spaces', 'Wood, ceramics, textiles, digital'], ['Access', 'All residents, with training'], ['Also', 'Co-working, music, classrooms'], ['Economy', 'Craft sales and workshops']]}>
          <p>Shared studios make it possible to live in a small home and still have access to a full woodshop, ceramics, textiles, digital fabrication and quiet co-working.</p>
          <p>They also support the local economy: residents can teach workshops, sell what they make and repair what the city needs.</p>
        </Feature>
        <Feature to="/docs/technical/technology-catalog#food-production"
          img="city-greenhouse"
          alt="Curved timber-and-glass greenhouse beside a food forest with residents harvesting"
          kicker="Outer ring"
          title="Greenhouses & food forest"
          tag="TRL 8–9"
          specs={[['Phase 1', '1–2 ha agroforestry + greenhouses'], ['Systems', 'Greenhouse, aquaponics, agroforestry'], ['Water', 'Rainwater and recycled greywater'], ['Waste', 'Compost back to soil']]}>
          <p>Year-round solar greenhouses, aquaponics and a layered food forest supply a meaningful share of fresh produce in Phase 1, growing to 5–10 ha and near self-sufficiency in Phase 2. Compost from kitchens returns to the soil, closing the loop.</p>
          <p>Phase 1 is deliberately modest: staple grains and some goods will still come from regional farms, which also builds ties with neighbors.</p>
        </Feature>
        <Feature to="/docs/concepts/energy-systems#track-1-physical-microgrid-conventional-power"
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

      <Section alt id="phases" eyebrow="Growth by phase" title="Built in steps, each one proven before the next." lead="One radial plan grows outward from the same spire and plaza, and nothing built in one phase is torn down in the next. One 3D model shows all three: open it at any phase and switch phases to turn on what each step adds.">
        <Cards items={[
          {to: 'pathname:///model/index.html?phase=1', more: 'Open the model at Phase 1', img: 'city-phase-1', alt: 'Aerial view of the Phase 1 pilot hamlet: a crystal spire on a round plaza, three glazed domes, a ring of earth homes and solar arrays in meadow, a creek winding south to a small lake, surrounded by woodland', kicker: 'Phase 1 · 200 residents', title: 'Pilot hamlet', text: 'A 90 m spire, one temple and two learning pavilions, three 40 m domes and about 30 earth homes on a 20–30 acre core. Reserved dome plots hold meadow and a tree nursery. The Spire Park, a care farm, a swimming pond and the first woods are there from the start.'},
          {to: 'pathname:///model/index.html?phase=2', more: 'Open the model at Phase 2', img: 'city-phase-2', alt: 'Aerial view of the Phase 2 village: eight domes around the spire, rings of earth-home courtyard clusters and an outer belt of solar rows and greenhouses, ringed by a curving canal with a lake to the south-west', kicker: 'Phase 2 · 1,500 residents', title: 'Village', text: 'Everything from Phase 1 stays. The spire gains two sections (150 m), five domes fill reserved plots, courtyard clusters of earth homes form a new ring and a food and energy belt is added. The Council House, a festival meadow, stables, a boathouse, a primary school and a health centre arrive. About 160 acres.'},
          {to: 'pathname:///model/index.html?phase=3', more: 'Open the model at Phase 3', img: 'city-phase-3', alt: 'Aerial view of the Phase 3 town: twelve domes around the spire, six large district domes, crescents of green-roofed timber terraces and a wide belt of solar and greenhouses, with a river winding past and woods to the north', kicker: 'Phase 3 · 8,000+ residents', title: 'Town', text: 'The village and its belt stay as built. The crystal spire reaches 240 m with its wind crown, and the last ring domes are filled; outside the green belt come flowing terraces of glass, timber and thin-shell concrete with green roofs, six 80 m district domes and a new outer belt, with an event hall, a sports park, a secondary school and a town health centre. About 1.2 square miles.'},
        ]} />
        <div className="pg-table-wrap">
          <table className="pg-table">
            <thead><tr><th></th><th>Phase 1 · Pilot Hamlet</th><th>Phase 2 · Village</th><th>Phase 3 · Town</th></tr></thead>
            <tbody>
              <tr><th>Residents</th><td>200 (150–300)</td><td>1,500 (1,500–3,000)</td><td>8,000+</td></tr>
              <tr><th>Domes</th><td>3 domes, 30–45 m</td><td>6–12 domes, 45–60 m</td><td>Up to 90 m, 400 residents each</td></tr>
              <tr><th>Spire</th><td>90 m</td><td>150 m</td><td>240 m</td></tr>
              <tr><th>Daily life</th><td>Spire Park, amphitheatre, care farm, swimming pond, small school, health room</td><td>Council House, festival meadow, stables, boathouse, primary school, health centre</td><td>Event hall, sports park, secondary school, town health centre, staffed fire station</td></tr>
              <tr><th>Timing</th><td>Move-in 2031</td><td>Mid-2030s</td><td>2040s+</td></tr>
              <tr><th>Gate to next phase</th><td>Operating break-even with about 110 homes full</td><td>Proven operations and demand</td><td>Regional partnerships</td></tr>
            </tbody>
          </table>
        </div>
        <p style={{marginTop: 'var(--space-8)'}}><a className="btn" href={model}>Explore the 3D model</a></p>
      </Section>

      <Section id="life" eyebrow="Life in the city" title="Parks, gathering, animals and civic life." lead="Every phase is a complete place to live. Each one adds its own parks, places to gather, care, learning and sport, sized for the people who live there. Every place below is in the 3D model; the pictures are concept renderings.">
        <Cards items={[
          {to: 'pathname:///model/index.html?phase=1&view=spirepark', more: 'See it in the model', img: 'structures/spirePark', alt: 'People on lawns and among trees around the foot of the spire, with a boulder waterfall', kicker: 'Phase 1', title: 'Spire Park and waterfalls', text: 'Lawns and groves around the spire, a boulder waterfall fed by the heart rill, and natural falls where the creek leaves the lake.'},
          {to: 'pathname:///model/index.html?phase=2&view=council', more: 'See it in the model', img: 'structures/councilHouse', alt: 'Residents seated in a circle inside a round timber and glass council hall with an oculus', kicker: 'Phase 2', title: 'Council House', text: 'The city hall: a round glass hall facing the spire. The council sits in a circle with no raised seat; open meetings every month, decisions by 80% consent.'},
          {to: 'pathname:///model/index.html?phase=2&view=festival', more: 'See it in the model', img: 'structures/festivalMeadow', alt: 'A large crowd on a meadow in front of a curved timber stage shell at dusk', kicker: 'Phase 2 and 3', title: 'Festival meadow and event hall', text: 'An open-air meadow and stage for about 3,000 people in Phase 2, and a covered hall for about 1,000 in Phase 3.'},
          {to: 'pathname:///model/index.html?phase=2&view=stables', more: 'See it in the model', img: 'structures/careFarm', alt: 'Children and adults feeding goats and sheep at a small timber care farm', kicker: 'Phase 1 and 2', title: 'Care farm, stables and dog parks', text: 'Goats, sheep, hens, ducks and bees from the start; stables for about ten horses in Phase 2; a fenced dog park in every phase.'},
          {to: 'pathname:///model/index.html?phase=2&view=boathouse', more: 'See it in the model', img: 'structures/boathouse', alt: 'Kayaks and paddle boards at a timber boathouse jetty on a lake, with sailing dinghies beyond', kicker: 'Phase 1 to 3', title: 'Swimming and boating', text: 'A natural swimming pond in Phase 1, a lake boathouse with kayaks and sailing dinghies in Phase 2, paddling on the canals and river in Phase 3.'},
          {to: 'pathname:///model/index.html?phase=3&view=woods', more: 'See it in the model', img: 'structures/woodland', alt: 'A family on a trail between woodland and an open hay meadow with the city beyond', kicker: 'Every phase', title: 'Woods and open meadows', text: 'Woods shelter the city on the north and the flanks; open hay meadows keep the views to the water in the south.'},
          {to: '/docs/design/growth-plan#learning-health-and-care', more: 'Read more', img: 'structures/school', alt: 'Children and teachers outside a curved timber primary school with a green roof', kicker: 'Phase 1 to 3', title: 'Learning and health', text: 'A small school in the learning pavilion, a primary school and health centre in Phase 2, a secondary school and town health centre in Phase 3.'},
          {to: '/docs/design/growth-plan#emergency-services', more: 'Read more', img: 'structures/fireStation', alt: 'Volunteer firefighters training in front of a timber fire station with a curved green roof and red doors', kicker: 'Phase 1 to 3', title: 'Fire and rescue', text: 'A fire shed with volunteers in Phase 1, a volunteer station on the ring road in Phase 2 and a staffed station with an ambulance base in Phase 3.'},
        ]} />
        <p style={{marginTop: 'var(--space-8)'}}><Link className="btn" to="/docs/design/structures">See every structure in photos</Link> <Link className="btn btn-ghost" to="/docs/design/growth-plan">How the city grows</Link></p>
      </Section>

      <Section id="beyond-the-box" eyebrow="Beyond the box" title="Curved, healthy and affordable." lead="High-tech design, low-tech materials: computers find efficient curved shapes, then we build them from earth, stone, timber, bamboo and lime that residents can handle, chosen from what each site provides. Curves use less material, hold heat better and are rated more beautiful in brain-imaging studies.">
        <Feature to="/docs/design/organic-forms-and-materials#notes-on-the-strongest-options"
          img="form-printed-earth"
          alt="A cluster of 3D-printed earth dwellings with green roofs and a printer finishing a fourth dome"
          kicker="Tiny homes"
          title="Earth homes from local soil"
          tag="Proven to Emerging"
          specs={[['Earthbag materials', '$5–15 per sq ft'], ['Printed earth', 'Local soil and rice husk'], ['Printer', '~€132–160k, reusable'], ['Best climate', 'Dry to mild first']]}>
          <p>Tiny-home clusters can be built from superadobe (earth-filled bags coiled into domes) or printed from raw earth, as in the TECLA prototype in Italy. Residents can help build, and that work can count toward contribution-based residency.</p>
          <p>Earth walls breathe, store heat and contain no synthetic finishes. Durability in wet or freezing climates still needs proof, so we test before we commit.</p>
        </Feature>
        <Feature to="/docs/design/organic-forms-and-materials#the-toolbox"
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
          {to: '/docs/design/organic-forms-and-materials#notes-on-the-strongest-options', title: 'Clay plaster everywhere', kicker: 'Healthy interiors', img: 'form-earth-dome', text: 'Holds indoor humidity steady and removes ozone. The cheapest health upgrade, and it works on curves and in existing homes.'},
          {to: '/docs/design/organic-forms-and-materials#stone-and-materials-that-follow-the-place', title: 'Local stone', kicker: 'Materials follow the place', text: 'Plinths, terrace walls, benches and paths in the stone of each region: granite and schist in Portugal, sandstone in New Mexico, basalt on volcanic land. Lowest carbon when quarried nearby.'},
          {to: '/docs/design/organic-forms-and-materials#the-toolbox', title: 'Thin shells', kicker: 'Canopies & floors', img: 'form-thin-shell', text: 'Arched shells carry load in compression, using over 70% less concrete and allowing earth or recycled mixes.'},
          {to: '/docs/design/organic-forms-and-materials#honest-trade-offs', title: 'Curved shell, efficient core', kicker: 'Practical', text: 'Kitchens, baths and storage stay straight inside curved rooms, so standard fittings still work and costs stay down.'},
          {to: '/docs/design/organic-forms-and-materials#bio-resonance-and-subtle-energy-a-research-track', title: 'Bio-resonance as research', kicker: 'Frontier', text: 'We will compare matched curved and boxy rooms for sleep, stress and acoustics with university partners, and publish results either way.'},
          {title: 'Light on the land', kicker: 'Nature first', to: '/docs/design/light-on-the-land', text: 'Compact building, more habitat after than before, our own sun and rain, and dark, bird-safe nights.'},
        ]} />
        <p style={{marginTop: '1.5rem'}}><Link to="/docs/design/organic-forms-and-materials">Read Beyond the Box in the library: methods, costs, evidence and trade-offs →</Link></p>
      </Section>

      <Section id="light-on-the-land" alt eyebrow="Light on the land" title="Mostly wild land, measured every year." lead="Zero impact is not possible, but half a normal footprint is: ecovillages like Findhorn and Sieben Linden already live at about half their national averages. We build a compact core, run on our own sun and rain, protect the night and leave more nature than we found.">
        <Cards items={[
          {to: '/docs/design/light-on-the-land#where-a-light-city-has-real-impact-and-what-to-do-about-it', title: 'Build small', kicker: 'Land', text: 'A 20–30 acre core on a 100–500 acre site. At least half the land stays permanent habitat, with wildlife corridors kept open.'},
          {to: '/docs/design/light-on-the-land#ten-commitments-we-will-measure-and-publish', title: 'More life after', kicker: 'Biodiversity', text: 'A baseline survey before design and at least 20% biodiversity net gain, monitored for 30 years.'},
          {to: '/docs/design/light-on-the-land#is-it-really-possible-what-has-already-been-done', title: 'Own sun and rain', kicker: 'Energy & water', text: 'No fossil fuels, 105% of energy from on-site solar, and no net draw on groundwater. Greywater is cleaned in planted wetlands.'},
          {to: '/docs/design/color-and-light#lighting-principles', title: 'Protect the night', kicker: 'Light & birds', text: 'Shielded, warm outdoor lights that never shine upward, and bird-safe patterned glass on every dome.'},
        ]} />
        <p style={{marginTop: '1.5rem'}}><Link to="/docs/design/light-on-the-land">Read Light on the Land: what is possible today, honest limits and ten commitments →</Link></p>
      </Section>

      <Section id="language" eyebrow="Design language" title="Four rules shape every building.">
        <Cards items={[
          {to: '/docs/concepts/sacred-geometry#application-in-light-city', title: 'Sacred geometry', kicker: 'Proportion', text: 'Circles, spirals and the golden ratio set the plan, room proportions and facade rhythms, giving the city a coherent, calming order.'},
          {to: '/docs/design/organic-forms-and-materials#why-curves-the-evidence', title: 'Biophilic design', kicker: 'Nature', text: 'Daylight, planting, natural materials and views to green in every space. Proven to lower stress and improve wellbeing.'},
          {to: '/docs/design/color-and-light', title: 'Light & color', kicker: 'Atmosphere', text: 'Warm whites, pearl and gold, with lighting tuned to the time of day to support natural sleep and focus rhythms.'},
          {to: '/docs/design/organic-forms-and-materials#the-toolbox', title: 'Low-carbon materials', kicker: 'Materials', text: 'Cross-laminated timber, hempcrete, rammed earth and mycelium insulation store carbon instead of emitting it.'},
        ]} />
      </Section>

      <Section alt eyebrow="Go deeper" title="The city in the library.">
        <DocLinks items={[
          {to: '/docs/design/architecture', tag: 'City', title: 'Architecture', text: 'Ring layout, building types and construction approach.'},
          {to: '/docs/concepts/communospheres', tag: 'City', title: 'Communospheres', text: 'Dome neighborhoods in detail.'},
          {to: '/docs/design/organic-forms-and-materials', tag: 'Design', title: 'Beyond the box', text: 'Curved forms and healthy, low-cost materials.'},
          {to: '/locations', tag: 'Land', title: 'Locations', text: 'Five regions in four countries, scored and mapped.'},
          {to: '/docs/design/growth-plan', tag: 'Plan', title: 'How the city grows', text: 'Water, care, learning, parks and services, phase by phase.'},
          {to: '/docs/design/structures', tag: 'Photos', title: 'Photo guide', text: 'A picture of every structure type in the model.'},
          {to: '/docs/at-a-glance', tag: 'Facts', title: 'At a glance', text: 'Every key number for each phase.'},
          {to: '/docs/concepts/sacred-geometry', tag: 'Design', title: 'Sacred geometry', text: 'The proportions behind the plan.'},
        ]} />
      </Section>

      <Cta title="Help design the first hamlet." text="Architects, engineers and builders can join Stage 2 design work in 2027." primary={{to: '/builders', label: 'For builders'}} secondary={{to: '/homes', label: 'See the homes'}} />
    </Site>
  );
}
