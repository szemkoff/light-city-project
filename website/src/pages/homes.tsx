import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Site, {Section, Cards, DocLinks, Cta, Feature, Jump} from '../components/Site';

export default function Homes(): JSX.Element {
  return (
    <Site
      title="Homes"
      description="The four Light City home types, what is included, shared spaces, contribution-based residency and the path to moving in."
      eyebrow="Homes & daily life"
      heading={<>Private homes, <em>shared abundance.</em></>}
      sub="Four home types, one all-inclusive monthly fee. Every home sits within walking distance of shared gardens, kitchens, studios and the plaza."
      image="homes-overview">
      <Section>
        <Jump items={[
          {href: '#types', label: 'Home types'},
          {href: '#earth', label: 'Earth tiny homes'},
          {href: '#included', label: 'What is included'},
          {href: '#shared', label: 'Shared spaces'},
          {href: '#contribute', label: 'Contribution-based residency'},
          {href: '#path', label: 'Path to moving in'},
        ]} />
        <div className="pg-facts">
          <div className="pg-fact"><b>4</b><span>home types, from 200 to 1,200 sf</span></div>
          <div className="pg-fact"><b>$500–1,700</b><span>per month, all-inclusive</span></div>
          <div className="pg-fact"><b>10–15</b><span>communal meals included each month</span></div>
          <div className="pg-fact"><b>20–30%</b><span>of homes reserved for contribution-based residency</span></div>
        </div>
        <p className="pg-note">Phase 1 figures for the 200-resident Pilot Hamlet. Sizes, mix and prices are planning ranges and will be finalized during Stage 2 (Design, 2027) once a site is chosen. First residents are targeted for 2031.</p>
      </Section>

      <Section alt id="types" eyebrow="Home types" title="Choose the scale of private life you need.">
        <Feature to="/docs/at-a-glance#homes-monthly-all-inclusive" id="tiny"
          img="home-tiny"
          alt="Four curved-timber tiny homes with green roofs and large windows around a courtyard garden with stone seating and planted beds, a glass dome behind"
          kicker="Tiny home · 200–300 sf"
          title="Tiny home"
          tag="$500–700 / month">
          <p>A self-contained curved-timber home with a sleeping niche, a compact kitchen and bath, big windows and a deck. Tiny homes are grouped in fours around a shared courtyard with planted beds and stone seating, so neighbors share outdoor space naturally.</p>
          <ul>
            <li><strong>Best for:</strong> singles, artists, newcomers and contribution-based residents</li>
            <li><strong>Where:</strong> garden clusters on the outer ring, a short walk from a communosphere</li>
            <li><strong>Built with:</strong> prefabricated CLT panels, a planted roof and a heat pump, or as an <a href="#earth">earth tiny home</a></li>
          </ul>
        </Feature>
        <Feature to="/docs/at-a-glance#homes-monthly-all-inclusive" id="studio"
          reverse
          img="home-studio"
          alt="Modern studio with curved timber walls, a bed niche, a glass pendant light and a window over the dome atrium"
          kicker="Studio · 400–500 sf"
          title="Studio"
          tag="$700–950 / month">
          <p>A bright, efficient apartment terraced into the inner levels of a communosphere. A bed alcove, kitchenette and private bath, with windows over the dome's indoor garden. Climate is gentle all year because the dome shell buffers wind and cold.</p>
          <ul>
            <li><strong>Best for:</strong> individuals who want privacy with community a few steps away</li>
            <li><strong>Where:</strong> inside the domes, on levels 1–4 around the central atrium</li>
            <li><strong>Includes:</strong> private bath, kitchenette and access to the dome's shared kitchen</li>
          </ul>
        </Feature>
        <Feature to="/docs/at-a-glance#homes-monthly-all-inclusive" id="one-bedroom"
          img="home-1br"
          alt="Modern one-bedroom with a stone counter, built-in shelves and glass walls onto a dome garden"
          kicker="1-bedroom · 600–800 sf"
          title="One-bedroom"
          tag="$950–1,300 / month">
          <p>A full apartment with a separate bedroom, a full kitchen, room to work from home and a planted balcony over the dome atrium. It suits couples or anyone who cooks, hosts or needs a quiet workspace.</p>
          <ul>
            <li><strong>Best for:</strong> couples, remote workers and long-term residents</li>
            <li><strong>Where:</strong> inside the domes, on upper terraces with the best daylight</li>
            <li><strong>Includes:</strong> full kitchen, private balcony and a workspace nook</li>
          </ul>
        </Feature>
        <Feature to="/docs/at-a-glance#homes-monthly-all-inclusive" id="two-bedroom"
          reverse
          img="home-2br"
          alt="Curved timber family homes with green roofs along a car-free lane with e-bikes, cyclists and neighbors on benches, a spire and dome beyond"
          kicker="2-bedroom · 900–1,200 sf"
          title="Two-bedroom family home"
          tag="$1,300–1,700 / month">
          <p>A two-story timber home with its own front garden on a car-free lane. Children can roam safely between homes, gardens and the learning spaces. Rooftop solar, a green roof and a heat pump keep running costs, which are already included, low.</p>
          <ul>
            <li><strong>Best for:</strong> families, multi-generational households and shared living</li>
            <li><strong>Where:</strong> ring housing between the domes and the food-growing edge</li>
            <li><strong>Includes:</strong> private garden, storage and room for a home office</li>
          </ul>
        </Feature>
      </Section>


      <Section id="earth" eyebrow="Beyond the box" title="Earth tiny homes: built from the ground they stand on." lead="An option for the tiny-home clusters: small curved homes of earthbag (superadobe) or 3D-printed local soil, finished in clay plaster. Lower cost, healthier air and a quiet, rounded shape.">
        <Feature to="/docs/design/organic-forms-and-materials#notes-on-the-strongest-options"
          img="form-superadobe"
          alt="A cluster of small superadobe earth domes with sand-colored clay plaster, round windows and planted roofs around a courtyard garden with a small outdoor fire pit"
          kicker="Earth option · tiny home"
          title="Superadobe and printed-earth clusters"
          tag="Dry and mild climates first">
          <p>Three to six rounded earth homes share a courtyard with planted beds and a fire circle. Each home keeps the tiny-home layout: a sleeping niche, a compact kitchen and bath, and big windows. The curved walls carry load in compression, so they need little steel or concrete.</p>
          <ul>
            <li><strong>Earthbag (superadobe):</strong> long bags filled with moistened local soil, coiled into domes and vaults. Materials can run about $5–15 per square foot and owner-built homes about $10–50 per square foot (<a href="https://earth.dev/building-methods/earthbag">earth.dev</a>).</li>
            <li><strong>3D-printed earth:</strong> TECLA in Italy was printed from local soil by two coordinated printers (<a href="https://www.3dwasp.com/en/3d-printed-house-tecla/">WASP</a>), a model for a printed cluster.</li>
          </ul>
        </Feature>
        <Feature to="/docs/design/organic-forms-and-materials#an-accessibility-ladder"
          reverse
          img="form-earth-dome"
          alt="Inside an earth dome: smooth clay-plastered walls, a skylight oculus, a built-in bench and a low wooden tea table where people sit together"
          kicker="Inside · build together"
          title="Clay interiors, built with residents"
          tag="Pilot in Stage 4">
          <p>Inside, curved clay walls, an oculus for daylight and built-in benches make a small home feel calm and generous. Earth homes can be built partly by the people who will live in them, with trained leads. Hours on the build can count toward <Link to="/docs/project/contribution-based-residency">contribution-based residency</Link>, lowering monthly costs further.</p>
          <ul>
            <li><strong>Clay plaster:</strong> clay buffers humidity and avoids synthetic finishes, which supports healthier indoor air and soft acoustics.</li>
            <li><strong>Climate:</strong> earth walls suit dry and mild climates best; wet or very cold sites need extra roof overhang and insulation.</li>
            <li><strong>Permits:</strong> earth building codes vary by place, so the site choice in Stage 2 decides which method we use.</li>
            <li><strong>Learn more:</strong> <Link to="/docs/design/organic-forms-and-materials">Beyond the Box</Link> and the <a href={useBaseUrl('/city') + '#beyond-the-box'}>organic forms on the City page</a>.</li>
          </ul>
        </Feature>
      </Section>

      <Section alt id="included" eyebrow="One fee" title="What is included, and what is not.">
        <div className="pg-split" style={{alignItems: 'start'}}>
          <div className="pg-prose">
            <h2 style={{marginTop: 0}}>Included in every home</h2>
            <ul>
              <li>Electricity, water, heating, cooling and fast internet</li>
              <li>10–15 communal meals a month, cooked from community gardens where possible</li>
              <li>Sauna, yoga, meditation spaces and wellness programs</li>
              <li>Building maintenance and shared tools, workshops and vehicles</li>
              <li>Community events, festivals and learning programs</li>
              <li>A voice and a vote in community governance</li>
            </ul>
          </div>
          <div className="pg-prose">
            <h2 style={{marginTop: 0}}>Paid separately</h2>
            <ul>
              <li>Additional meals beyond the included allowance</li>
              <li>Specialist workshops, retreats and personal services</li>
              <li>Personal purchases and travel</li>
            </ul>
            <p>Because utilities, part of your food, wellness and shared tools are bundled, the fee should be compared with rent plus those costs, not with rent alone. A full cost comparison will be published during Stage 2.</p>
          </div>
        </div>
      </Section>

      <Section id="shared" eyebrow="Shared spaces" title="Your home is the smallest room in the city." lead="Private homes stay modest because the shared spaces are generous. Everything here is within a ten-minute walk.">
        <Cards items={[
          {to: '/docs/concepts/communospheres#daily-life-in-a-communosphere', title: 'Dome kitchens & long tables', img: 'journey-flourishing', kicker: 'Every communosphere', text: 'A shared kitchen and dining hall on each dome floor, for communal meals several times a week and private dinners whenever you like.'},
          {to: '/docs/design/architecture#6-gardens-and-nature-spaces', title: 'Greenhouses & food forest', img: 'city-greenhouse', kicker: 'Outer ring', text: 'Year-round solar greenhouses, orchards and layered food forests. Residents can garden as much or as little as they like.'},
          {to: '/docs/design/architecture#5-creative-studios', title: 'Maker studios', img: 'city-studios', kicker: 'Middle ring', text: 'Woodshop, ceramics, textiles and digital fabrication, open to every resident with training and booking.'},
          {to: '/docs/design/architecture#1-the-central-plaza', title: 'Temple & plaza', img: 'city-temple', kicker: 'Inner ring', text: 'A non-denominational temple, quiet rooms and the central plaza for festivals, markets and morning practice.'},
        ]} />
      </Section>

      <Section alt id="contribute" eyebrow="Contribution-based residency" title="Contribute your time, lower your costs." lead="About 20–30% of homes are offered to residents who contribute regular work in exchange for reduced fees. A pilot runs in 2027–2028.">
        <div className="pg-table-wrap">
          <table className="pg-table">
            <thead><tr><th>Tier</th><th>Contribution</th><th>Monthly cost</th><th>Includes</th><th>Best for</th></tr></thead>
            <tbody>
              <tr><th>Tier 1 · Full</th><td>25–30 hrs / week</td><td>$0</td><td>Studio or tiny home, all meals, basic healthcare, full vote</td><td>People ready to make community their main work</td></tr>
              <tr><th>Tier 2 · Partial</th><td>15–20 hrs / week</td><td>$250–400</td><td>Studio or tiny home, 10 meals / week, basic healthcare, full vote</td><td>Part-time remote workers, artists, students</td></tr>
              <tr><th>Tier 3 · Skill-share</th><td>8–12 hrs / week</td><td>$500–700</td><td>Private studio, 5 meals / week, full vote</td><td>Architects, engineers, therapists, teachers</td></tr>
            </tbody>
          </table>
        </div>
        <p className="pg-note">Contribution areas include food systems, facilities and maintenance, education and facilitation, care and support, creative work, and administration. Contribution-based residents have the same rights as paying residents.</p>
      </Section>

      <Section id="path" eyebrow="Path to moving in" title="From interest to keys, in five steps.">
        <ol className="pg-steps">
          <li className="now"><span className="when">Now</span><h3>Join the interest list</h3><p>Get updates, early invitations and a say in how homes are designed.</p></li>
          <li><span className="when">2027–2028</span><h3>Visit a retreat</h3><p>Seasonal retreats let you experience the rhythms, food and people before committing.</p></li>
          <li><span className="when">2027–2028</span><h3>Residency pilot</h3><p>Try contribution-based living at a rented site and help shape the final model.</p></li>
          <li><span className="when">2028</span><h3>Join the founding circle</h3><p>150+ committed future residents form the founding circle, the gate to construction.</p></li>
          <li><span className="when">2031</span><h3>Move in</h3><p>Homes open in waves as the domes and ring housing are completed.</p></li>
        </ol>
      </Section>

      <Section alt eyebrow="Go deeper" title="Read before you reserve.">
        <DocLinks items={[
          {to: '/docs/project/contribution-based-residency', tag: 'Living', title: 'Contribution-based residency', text: 'Tiers, contribution areas, selection and how the pilot runs.'},
          {to: '/docs/concepts/communospheres', tag: 'City', title: 'Communospheres', text: 'How the dome neighborhoods are organized, inside and out.'},
          {to: '/docs/design/organic-forms-and-materials', tag: 'Build', title: 'Beyond the Box', text: 'Curved, low-cost forms and healthy materials, including earth tiny homes.'},
          {to: '/locations', tag: 'Land', title: 'Where it could be', text: 'Five regions in four countries and what each means for daily life.'},
          {to: '/docs/project/governance', tag: 'Living', title: 'Governance', text: 'How residents take part in decisions and resolve conflicts.'},
          {to: '/docs/at-a-glance', tag: 'Facts', title: 'Light City at a glance', text: 'Every key number: homes, costs, timeline.'},
        ]} />
      </Section>

      <Cta title="Find your place in the first dome." text="Join the founding circle to hear first about retreats, the residency pilot and home reservations." primary={{to: '/#join', label: 'Join the founding circle'}} secondary={{to: '/residents', label: 'For residents'}} />
    </Site>
  );
}
