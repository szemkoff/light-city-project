import React from 'react';
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
        <Feature
          img="home-tiny"
          alt="Four small timber tiny homes with porches and green roofs around a shared courtyard garden, a glass dome in the background"
          kicker="Tiny home · 200–300 sf"
          title="Tiny home"
          tag="$500–700 / month">
          <p>A self-contained timber cottage with a sleeping loft, a compact kitchen and bath, and a covered porch. Tiny homes are grouped in fours around a shared courtyard with raised beds and a fire circle, so neighbors share outdoor space naturally.</p>
          <ul>
            <li><strong>Best for:</strong> singles, artists, newcomers and contribution-based residents</li>
            <li><strong>Where:</strong> garden clusters on the outer ring, a short walk from a communosphere</li>
            <li><strong>Built with:</strong> prefabricated CLT panels, a planted roof and a heat pump</li>
          </ul>
        </Feature>
        <Feature
          reverse
          img="home-studio"
          alt="Compact timber studio apartment with a bed alcove, kitchenette and a window over a dome garden atrium"
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
        <Feature
          img="home-1br"
          alt="Open timber living room and kitchen with a balcony over a sunlit dome garden"
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
        <Feature
          reverse
          img="home-2br"
          alt="Row of two-story timber family homes with green roofs, gardens and a car-free lane, a spire and dome in the distance"
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

      <Section id="included" eyebrow="One fee" title="What is included, and what is not.">
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

      <Section alt id="shared" eyebrow="Shared spaces" title="Your home is the smallest room in the city." lead="Private homes stay modest because the shared spaces are generous. Everything here is within a ten-minute walk.">
        <Cards items={[
          {title: 'Dome kitchens & long tables', img: 'journey-flourishing', kicker: 'Every communosphere', text: 'A shared kitchen and dining hall on each dome floor, for communal meals several times a week and private dinners whenever you like.'},
          {title: 'Greenhouses & food forest', img: 'city-greenhouse', kicker: 'Outer ring', text: 'Year-round solar greenhouses, orchards and layered food forests. Residents can garden as much or as little as they like.'},
          {title: 'Maker studios', img: 'city-studios', kicker: 'Middle ring', text: 'Woodshop, ceramics, textiles and digital fabrication, open to every resident with training and booking.'},
          {title: 'Temple & plaza', img: 'city-temple', kicker: 'Inner ring', text: 'A non-denominational temple, quiet rooms and the central plaza for festivals, markets and morning practice.'},
        ]} />
      </Section>

      <Section id="contribute" eyebrow="Contribution-based residency" title="Contribute your time, lower your costs." lead="About 20–30% of homes are offered to residents who contribute regular work in exchange for reduced fees. A pilot runs in 2027–2028.">
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

      <Section alt id="path" eyebrow="Path to moving in" title="From interest to keys, in five steps.">
        <ol className="pg-steps">
          <li className="now"><span className="when">Now</span><h3>Join the interest list</h3><p>Get updates, early invitations and a say in how homes are designed.</p></li>
          <li><span className="when">2027–2028</span><h3>Visit a retreat</h3><p>Seasonal retreats let you experience the rhythms, food and people before committing.</p></li>
          <li><span className="when">2027–2028</span><h3>Residency pilot</h3><p>Try contribution-based living at a rented site and help shape the final model.</p></li>
          <li><span className="when">2028</span><h3>Join the founding circle</h3><p>150+ committed future residents form the founding circle, the gate to construction.</p></li>
          <li><span className="when">2031</span><h3>Move in</h3><p>Homes open in waves as the domes and ring housing are completed.</p></li>
        </ol>
      </Section>

      <Section eyebrow="Go deeper" title="Read before you reserve.">
        <DocLinks items={[
          {to: '/docs/project/contribution-based-residency', tag: 'Living', title: 'Contribution-based residency', text: 'Tiers, contribution areas, selection and how the pilot runs.'},
          {to: '/docs/concepts/communospheres', tag: 'City', title: 'Communospheres', text: 'How the dome neighborhoods are organized, inside and out.'},
          {to: '/docs/project/governance', tag: 'Living', title: 'Governance', text: 'How residents take part in decisions and resolve conflicts.'},
          {to: '/docs/at-a-glance', tag: 'Facts', title: 'Light City at a glance', text: 'Every key number: homes, costs, timeline.'},
        ]} />
      </Section>

      <Cta title="Find your place in the first dome." text="Join the founding circle to hear first about retreats, the residency pilot and home reservations." primary={{to: '/#join', label: 'Join the founding circle'}} secondary={{to: '/residents', label: 'For residents'}} />
    </Site>
  );
}
