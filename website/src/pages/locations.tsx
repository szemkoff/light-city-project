import React from 'react';
import Site, {Section, DocLinks, Cta, Jump} from '../components/Site';
import LocationsMap from '../components/LocationsMap';

export default function Locations(): JSX.Element {
  return (
    <Site
      title="Locations"
      description="Five candidate regions for the first Light City, all above 350 ft: northern New Mexico and Oregon's Klamath Basin in the US, plus central Portugal, the Granada highlands in Spain and northern Costa Rica, scored and mapped."
      eyebrow="Where it could grow"
      heading={<>Five places, four countries, <em>one first city.</em></>}
      sub="No land has been bought. This desk study narrows the search to two US regions and three abroad, all above 350 ft, worth visiting in 2027. Each is strong in a different way."
      image="loc-hero">
      <Section>
        <Jump items={[
          {href: '#map', label: 'The map'},
          {href: '#criteria', label: 'What we look for'},
          {href: '#energy', label: 'Energy by region'},
          {href: '#next', label: 'How we choose'},
        ]} />
        <div className="pg-facts">
          <div className="pg-fact"><b>5</b><span>candidate regions in the US, Portugal, Spain and Costa Rica</span></div>
          <div className="pg-fact"><b>350 ft+</b><span>minimum elevation (107 m); every option sits far higher</span></div>
          <div className="pg-fact"><b>100–500</b><span>acres needed for Phase 1 and room to grow</span></div>
          <div className="pg-fact"><b>2027</b><span>site visits and final choice in Stage 2</span></div>
        </div>
      </Section>

      <Section alt id="map" eyebrow="The map" title="Two in the US, three abroad." lead="Tap a numbered pin or a tab. Each region shows its elevation and climate, its benefits, the risks to plan for, and first-pass scores out of 5 on nine criteria.">
        <LocationsMap />
        <p className="pg-note" style={{marginTop: 'var(--space-5)', fontSize: 'var(--text-xs)', color: 'var(--muted)'}}>
          Sun, rain and temperature: 30-year climatology from <a href="https://power.larc.nasa.gov/" target="_blank" rel="noopener noreferrer">NASA POWER</a>. Elevation: Copernicus terrain model via <a href="https://open-meteo.com/en/docs/elevation-api" target="_blank" rel="noopener noreferrer">Open-Meteo</a>. Codes, geothermal, land-law and hydro sources are listed in the full study.
        </p>
      </Section>

      <Section id="criteria" eyebrow="What we look for" title="Land that can carry the whole idea." lead="The criteria come straight from the design brief: enough sun for the microgrid, water we have the right to use, codes that allow earth and timber, neighbors who welcome the project, and higher ground.">
        <div className="pg-cards">
          <article className="pg-card"><div className="pg-card-body"><p className="pg-kicker">Energy</p><h3>Sun first</h3><p>At least 4.5 kWh/m²/day of sun for a 2–5 MWp solar microgrid. Hot water underground or a year-round stream is a bonus.</p></div></article>
          <article className="pg-card"><div className="pg-card-body"><p className="pg-kicker">Water</p><h3>Secure and legal</h3><p>Rain, springs or wells, plus the rights to use them. In the dry Southwest, water rights decide everything.</p></div></article>
          <article className="pg-card"><div className="pg-card-body"><p className="pg-kicker">Building</p><h3>Earth and timber allowed</h3><p>Codes that permit rammed earth, adobe, cob, compressed earth block and mass timber without years of variances.</p></div></article>
          <article className="pg-card"><div className="pg-card-body"><p className="pg-kicker">Ground</p><h3>Above 350 ft</h3><p>Every site sits at least 350 ft (107 m) above sea level: clear of storm surge and coastal flooding, with cooler nights.</p></div></article>
          <article className="pg-card"><div className="pg-card-body"><p className="pg-kicker">People</p><h3>Welcome and reachable</h3><p>A supportive local community, a legal path to own land, a hospital within an hour and an airport within about two hours.</p></div></article>
        </div>
      </Section>

      <Section alt id="energy" eyebrow="Energy by region" title="Solar everywhere. No diesel anywhere." lead="Every option runs on solar and batteries first, with a regional grid tie. Backup comes from renewable gensets running on biogas from our own food waste or on bio-ethanol. Hydro and geothermal join only where the land offers them.">
        <div className="pg-table-wrap">
          <table className="pg-table">
            <thead><tr><th>Region</th><th>Solar</th><th>Geothermal heat</th><th>Micro-hydro</th></tr></thead>
            <tbody>
              <tr><th>1 · Northern New Mexico</th><td>Excellent</td><td>Warm springs, direct use</td><td>Unlikely</td></tr>
              <tr><th>2 · Klamath Basin, OR</th><td>Good</td><td>City district heat since 1981</td><td>Possible</td></tr>
              <tr><th>3 · Central Portugal</th><td>Good</td><td>67°C spa district heat</td><td>Upland rivers</td></tr>
              <tr><th>4 · Granada highlands</th><td>Excellent</td><td>34–44°C springs</td><td>Snowmelt channels only</td></tr>
              <tr><th>5 · Northern Costa Rica</th><td>Excellent</td><td>National geothermal plants nearby</td><td>Strong</td></tr>
              <tr><th>Backup, everywhere</th><td colSpan={3}>Biogas from on-site digesters or bio-ethanol gensets; renewable natural gas only as a transition</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="next" eyebrow="How we choose" title="From five regions to one piece of land.">
        <ol className="pg-steps">
          <li className="now"><span className="when">2026</span><h3>Rank the criteria</h3><p>The founding circle decides what matters most: earth-building freedom, geothermal heat, water or community.</p></li>
          <li><span className="when">Early 2027</span><h3>Shortlist two</h3><p>Talk with planners, water offices, land lawyers and local and Indigenous leaders before any land search.</p></li>
          <li><span className="when">2027</span><h3>Walk the land</h3><p>Visit 3–5 parcels per region and check sun, slope, soils, wells, streams and road access.</p></li>
          <li><span className="when">2027</span><h3>Test before buying</h3><p>Water-rights review, geotechnical survey and, where promising, a geothermal test well.</p></li>
          <li><span className="when">End of Stage 2</span><h3>Choose the site</h3><p>The decision gate in the development stages. Only then does land change hands.</p></li>
        </ol>
      </Section>

      <Section alt eyebrow="Go deeper" title="The full study and related reading.">
        <DocLinks items={[
          {to: '/docs/project/site-locations', title: 'Site locations', text: 'Scorecard, elevation, land law, sources and risks for each region.', tag: 'Project'},
          {to: '/docs/concepts/energy-systems', title: 'Energy systems', text: 'The microgrid and the layered, diesel-free backup plan.', tag: 'Concept'},
          {to: '/docs/design/organic-forms-and-materials', title: 'Beyond the box', text: 'The earth and timber building methods each region must permit.', tag: 'Design'},
          {to: '/docs/project/development-stages', title: 'Development stages', text: 'When the site is chosen and what has to be true first.', tag: 'Roadmap'},
        ]} />
      </Section>

      <Cta title="Know a piece of land that fits?" text="If you own or know land above 350 ft in one of these regions, or somewhere that scores even better, we would like to hear about it." primary={{to: '/contact', label: 'Suggest a site'}} secondary={{to: '/#join', label: 'Join the founding circle'}} />
    </Site>
  );
}
