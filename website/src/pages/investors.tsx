import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Site, {Section, Cards, DocLinks, Cta} from '../components/Site';

// Household model: 110 homes, ~200 residents. Home fees at mid prices + member fees ($300 per extra adult, $150 per child).
// Operating cost $2.5M a year. Columns: other income $850K (base), $600K (low retreats).
const SENS: [string, string, string][] = [
  ['80% · 88 homes', '−$355K', '−$605K'],
  ['90% · 99 homes (base)', '−$194K', '−$444K'],
  ['100% · 110 homes', '−$32K', '−$282K'],
];

const SENS_HIGH: [string, string, string][] = [
  ['80% · 88 homes', '−$195K', '−$445K'],
  ['90% · 99 homes', '−$13K', '−$263K'],
  ['100% · 110 homes', '+$169K', '−$81K'],
];

const MIX: [string, string, string, string, string][] = [
  ['Tiny home', '25', '1', '25', '$500–700'],
  ['Studio', '35', '1–2', '42', '$700–950'],
  ['1-bedroom', '25', '1–2', '43', '$950–1,300'],
  ['2-bedroom', '15', '2–4', '45', '$1,300–1,700'],
  ['3-bedroom (draft)', '10', '4–6', '45', '$1,700–2,200'],
];

type Stage = {n: string; name: string; when: string; status: string; budget: string; funding: string; rows: [string, string, string][]; total: string; note: string};

const STAGES: Stage[] = [
  {n: '1', name: 'Foundation', when: 'Oct 2025 – Dec 2026', status: 'Now · gate review Dec 2026', budget: '$5K–$15K', funding: 'Founder equity and personal investment',
    rows: [
      ['Tools and software', '$500–$1.5K', 'GitHub, design tools, domain, hosting'],
      ['Design assets', '$1K–$3K', 'Stock images, fonts, basic concept art'],
      ['Consulting', '$1K–$5K', 'Legal entity setup, first advisors'],
      ['Documentation', '$500–$2K', 'Writing, editing, formatting'],
      ['Research', '$500–$1.5K', 'Books, courses, site visits'],
      ['Contingency (20%)', '$700–$2K', 'Buffer for unknowns'],
    ], total: '$4.2K–$15K', note: 'About $2,500 spent so far, on tools, the domain and research.'},
  {n: '2', name: 'Design', when: 'Jan – Jun 2027', status: 'Next · raising now', budget: '$25K–$85K', funding: 'Arts and culture grants, patronage, crowdfunding',
    rows: [
      ['Architectural design', '$8K–$25K', 'Schematic design, concept plans, 3D models'],
      ['Concept art and visualization', '$5K–$20K', '10–20 professional renders and illustrations'],
      ['Sacred-geometry site mapping', '$2K–$8K', 'CAD and GIS work, overlays, technical drawings'],
      ['3D model and VR walk-through', '$3K–$12K', 'Interactive models, virtual walk-throughs'],
      ['Consultants', '$3K–$10K', 'Engineers, sustainability experts, advisors'],
      ['Storytelling and content', '$2K–$5K', 'Writers, editors, narrative'],
      ['Contingency (20%)', '$4.6K–$16K', 'Buffer for scope changes'],
    ], total: '$27.6K–$96K', note: 'The headline $25K–$85K excludes contingency. Target of $10K–$30K from crowdfunding and early supporters.'},
  {n: '3', name: 'Digital presence', when: 'Jul – Nov 2027', status: 'Future', budget: '$35K–$125K', funding: 'Digital products, memberships, donations, sponsorships',
    rows: [
      ['Website enhancement', '$5K–$20K', 'Interactive features, 3D and VR, UX'],
      ['Platform development', '$8K–$30K', 'Community platform, CRM'],
      ['Content creation', '$6K–$20K', 'Video, courses, guides'],
      ['Marketing and PR', '$8K–$25K', 'Ads, PR, outreach'],
      ['Community tools', '$3K–$10K', 'Forum, newsletter, analytics'],
      ['Digital products', '$3K–$12K', 'Courses, ebooks, templates'],
      ['Contingency (20%)', '$6.6K–$23.4K', 'Buffer for platform changes'],
    ], total: '$39.6K–$140.4K', note: 'Revenue target of $15K–$60K. Break-even goal 8–12 months after launch.'},
  {n: '4', name: 'Community', when: 'Dec 2027 – Nov 2028', status: 'Future', budget: '$85K–$280K', funding: 'Partnerships, sponsorships, events, memberships, foundation grants',
    rows: [
      ['Events and gatherings', '$20K–$60K', '4–12 retreats, workshops and conferences'],
      ['Contributor stipends', '$15K–$60K', 'Part-time roles, project grants, fellowships'],
      ['Platform and tools', '$8K–$25K', 'Governance and collaboration software'],
      ['Community operations', '$12K–$40K', 'Community manager, moderation, support'],
      ['Working groups', '$10K–$35K', 'Budgets for 5–10 groups'],
      ['Marketing and outreach', '$10K–$30K', 'Campaigns, partnerships, PR'],
      ['Contingency (20%)', '$15K–$50K', 'Buffer for fast growth'],
    ], total: '$90K–$300K', note: 'Revenue target of $40K–$150K. Burn of $7K–$25K a month, with 12–18 months of runway secured.'},
  {n: '5', name: 'Physical build', when: 'Dec 2028 – Nov 2031', status: 'Future', budget: '$35M–$55M target', funding: 'Impact investors, green bonds, pre-sales, EPC finance, grants',
    rows: [
      ['Land and pre-development', '$1.5M–$5.3M', 'Land, due diligence, master plan, design, permits, financing'],
      ['Site work and infrastructure', '$3M–$12M', 'Roads, utilities, grading, drainage'],
      ['Communospheres (3–6)', '$4M–$18M', 'Domes, CLT, solar glazing, interiors'],
      ['Homes', '$5M–$25M', 'Draft plan of about 110 homes, re-estimated in Stage 2'],
      ['Central spire prototype', '$1M–$4M', '50–100 ft observation and meditation tower'],
      ['Energy, water and food', '$1.5M–$5.7M', 'Solar, batteries, microgrid, wells, greenhouses'],
      ['Wellness facilities', '$500K–$2M', 'Float tanks, red light, acoustic spaces'],
      ['Soft costs', '$2.7M–$11.3M', 'Project management, inspections, insurance, sales, furniture, landscaping'],
      ['Contingency (15–20%)', '$2.5M–$11M', 'Construction risk buffer'],
    ], total: '$21.7M–$94.3M', note: 'Planned as 40% impact investors, 30% resident pre-sales, 20% EPC finance and 10% grants. The $35M–$55M target is the mid-range, 200-resident case.'},
];

function StageTabs(): JSX.Element {
  const [cur, setCur] = React.useState(1);
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const map: Record<string, number> = {ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: STAGES.length - 1};
    if (!(e.key in map)) return;
    e.preventDefault();
    const n = (map[e.key] + STAGES.length) % STAGES.length;
    setCur(n); refs.current[n]?.focus();
  };
  return (
    <div className="pg-stages">
      <div className="pg-stage-tabs" role="tablist" aria-label="Development stages">
        {STAGES.map((st, i) => (
          <button key={st.n} type="button" role="tab" id={`stage-tab-${st.n}`} aria-controls={`stage-panel-${st.n}`} aria-selected={cur === i} tabIndex={cur === i ? 0 : -1}
            ref={(el) => { refs.current[i] = el; }} onClick={() => setCur(i)} onKeyDown={(e) => onKey(e, i)}>
            <b>Stage {st.n}</b><span>{st.name}</span>
          </button>
        ))}
      </div>
      {STAGES.map((st, i) => (
        <div key={st.n} role="tabpanel" id={`stage-panel-${st.n}`} aria-labelledby={`stage-tab-${st.n}`} hidden={cur !== i} className="pg-stage-panel">
          <div className="pg-facts">
            <div className="pg-fact"><b>{st.budget}</b><span>Budget</span></div>
            <div className="pg-fact"><b>{st.when}</b><span>{st.status}</span></div>
            <div className="pg-fact"><b className="pg-fact-sm">{st.funding}</b><span>Funding sources</span></div>
          </div>
          <h3 style={{margin: 'var(--space-8) 0 var(--space-4)'}}>Use of funds, Stage {st.n}</h3>
          <div className="pg-table-wrap">
            <table className="pg-table">
              <thead><tr><th>Category</th><th>Budget</th><th>What it pays for</th></tr></thead>
              <tbody>
                {st.rows.map(([c, b, w]) => <tr key={c}><th>{c}</th><td className="pg-nowrap">{b}</td><td>{w}</td></tr>)}
                <tr className="pg-total"><th>Total</th><td className="pg-nowrap">{st.total}</td><td></td></tr>
              </tbody>
            </table>
          </div>
          <p className="pg-inline" style={{marginTop: 'var(--space-4)'}}>{st.note}</p>
        </div>
      ))}
    </div>
  );
}

const COMPS: {name: string; facts: string; lesson: string; links: [string, string][]}[] = [
  {name: 'Findhorn (Scotland)', facts: 'Spiritual community since 1962, roughly 300–500 people in the wider community. The Findhorn Foundation closed its educational programmes in September 2023.', lesson: 'Retreat and education income can stop. We model a low-retreat case and keep it off the critical path.', links: [['Wikipedia', 'https://en.wikipedia.org/wiki/Findhorn_Foundation'], ['Moray Council report', 'https://www.moray.gov.uk/media/ef3nfyaf/file163230.pdf']]},
  {name: 'Sieben Linden (Germany)', facts: 'Ecovillage founded in 1997, around 140 residents, growing slowly toward a planned 300. About 20 years in, 11 houses stood on site.', lesson: 'Community-built growth is slow. Phase 1 is professionally built; self-build is optional.', links: [['Transit Social Innovation', 'http://www.transitsocialinnovation.eu/sii/ctp/successful-completion-of-first-two-straw-bale-houses'], ['Global Ecovillage Network', 'https://ecovillage.org/map/community/sieben-linden-ecovillage/']]},
  {name: 'Serenbe (Georgia, US)', facts: 'Wellness-focused community of about 1,500 residents and 800 homes, with 70% of its land preserved. Its 2002 zoning overlay took years of work with the county.', lesson: 'Zoning is a multi-year task. Permitting is a Stage 2 workstream, not an afterthought.', links: [['Serenbe', 'https://www.serenbe.com/press-awards/farm-to-front-porch-community-redefines-modern-neighborhood-living']]},
  {name: 'Babcock Ranch (Florida, US)', facts: 'First residents in 2018. More than 15,000 residents and 5,516 homes sold by December 31, 2025. A 150 MW solar plant on 870 acres is owned by the utility, FPL.', lesson: 'A utility partnership can carry the energy capex. We will test that route at each shortlisted site.', links: [['SWFL Business Today', 'https://swfloridabusinesstoday.com/babcock-ranch-becomes-nations-4th-top-selling-master-planned-community/'], ['Babcock Ranch media kit', 'https://babcockranch.com/wp-content/uploads/2025/07/Babcock-Ranch-Media-Kit-July_2025_web.pdf']]},
];

export default function Investors(): JSX.Element {
  const u = (p: string) => useBaseUrl(p);
  const stages = u('/docs/project/development-stages');
  return (
    <Site
      title="For Investors"
      description="The Light City diligence room: the raise now, team, site status, financial model and sensitivity, comparables, legal path, exit and governance."
      eyebrow="For investors · diligence room"
      heading={<>Patient capital. <em>Honest numbers.</em></>}
      sub="Everything a serious investor needs to judge Light City, in one place: what we are raising now, what is not yet decided and where the model is weakest."
      image="investors-site">

      <Section eyebrow="Phase 1 at a glance" title="The numbers behind the first 200 residents." lead="Mid-case figures from the financial model. Ranges and assumptions are in the development stages documentation.">
        <div className="pg-facts">
          <div className="pg-fact"><b>$44M</b><span>Construction capex, Phase 1 (range $22M–$95M for all stages)</span></div>
          <div className="pg-fact"><b>$45M</b><span>All stages, 1 to 5 (mid case)</span></div>
          <div className="pg-fact"><b>$2.5M</b><span>Annual operating cost</span></div>
          <div className="pg-fact"><b>110</b><span>Homes for about 200 residents (draft household plan)</span></div>
          <div className="pg-fact"><b>+13%</b><span>Fee lift above mid prices needed to cover operating cost at 90% occupancy</span></div>
          <div className="pg-fact"><b>8–12%</b><span>Target impact IRR (mid case, not yet modeled by scenario)</span></div>
        </div>
        <div className="pg-prose" style={{marginTop: 'var(--space-8)'}}>
          <p><strong>What this page is not.</strong> It is not an offer to sell securities. Any offering will be made only through formal documents prepared with securities counsel. The visionary archetype behind the project (<a href={u('/docs/concepts/the-archetype')}>The Archetype</a>) is inspiration, and the research track never carries the business case.</p>
        </div>
      </Section>

      <Section alt id="raise" eyebrow="1 · The raise now" title="Small, staged and tied to milestones." lead="We are not raising $45M today. Capital is raised stage by stage, and each stage must pass a written gate before the next begins.">
        <StageTabs />
        <p className="pg-inline" style={{marginTop: 'var(--space-6)'}}>Each stage opens only after the one before passes its gate. Gate milestones: <a href={stages + '#stage-gate-checklist'}>stage-gate checklist</a>.</p>
      </Section>

      <Section id="team" eyebrow="2 · Team and advisors" title="Founder-led today, with open seats.">
        <div className="pg-cards">
          <article className="pg-card"><div className="pg-card-body"><p className="pg-kicker">Founder</p><h3>Stan Zemskoff</h3><p>Managing Member. Decades in technology and systems work; leads documentation, the financial model and governance in Stages 1–4.</p></div></article>
          <article className="pg-card"><div className="pg-card-body"><p className="pg-kicker">Advisors</p><h3>Being confirmed</h3><p>Advisors will be named here once they agree to be listed. We do not list people who have not confirmed.</p></div></article>
          <article className="pg-card"><div className="pg-card-body"><p className="pg-kicker">Open roles</p><h3>Looking for</h3><p>Lead architect, finance lead, legal and securities counsel, and a community lead.</p><p className="pg-inline"><a href={u("/contact")}>Get in touch</a></p></div></article>
        </div>
      </Section>

      <Section alt id="site" eyebrow="3 · Site status" title="Desk study only. No land bought.">
        <div className="pg-prose">
          <p>Five candidate regions in the US, Portugal, Spain and Costa Rica are scored on energy, water, building codes, land law and natural risk. We plan to shortlist two in early 2027 and visit both before any purchase. Water rights and zoning are checked first, because they decide whether a site works at all.</p>
          <p><a href={u('/docs/project/site-locations')}>Site locations and scoring</a></p>
        </div>
      </Section>

      <Section id="model" eyebrow="4 · Financial model and sensitivity" title="Where the model holds, and where it does not." lead="Rebuilt around households. Earlier versions counted every resident as paying a full home fee ($925 a month each). Fees are charged per home, so the model now counts homes: about 110 homes for 200 residents, plus a member fee for each extra person.">
        <h3 style={{margin: '0 0 var(--space-4)'}}>Phase 1 home mix (draft)</h3>
        <div className="pg-table-wrap">
          <table className="pg-table">
            <thead><tr><th>Home</th><th>Homes</th><th>People per home</th><th>Residents</th><th>Home fee / month</th></tr></thead>
            <tbody>
              {MIX.map(([h, n, p, r, f]) => <tr key={h}><th>{h}</th><td>{n}</td><td>{p}</td><td>{r}</td><td>{f}</td></tr>)}
              <tr><th>Total</th><td>110</td><td>1.8 average</td><td>200</td><td>Member fees: $300 per extra adult, $150 per child</td></tr>
            </tbody>
          </table>
        </div>
        <p className="pg-inline" style={{marginTop: 'var(--space-4)'}}>At full occupancy and mid prices, home fees bring in about $1.37M a year and member fees about $250K (about 50 extra adults and 40 children), so $1.62M in all. The earlier per-resident method gave $2.0M at 90% occupancy. Who lives in which home: <a href={u('/homes#fit')}>who fits where</a>.</p>
        <h3 style={{margin: 'var(--space-10) 0 var(--space-4)'}}>Annual operating margin, mid prices</h3>
        <div className="pg-table-wrap">
          <table className="pg-table">
            <thead><tr><th>Occupancy</th><th>Other income $850K (base)</th><th>Other income $600K (low retreats)</th></tr></thead>
            <tbody>{SENS.map(([o, a, b]) => <tr key={o}><th>{o}</th><td>{a}</td><td>{b}</td></tr>)}</tbody>
          </table>
        </div>
        <h3 style={{margin: 'var(--space-10) 0 var(--space-4)'}}>Annual operating margin, top of each price range</h3>
        <div className="pg-table-wrap">
          <table className="pg-table">
            <thead><tr><th>Occupancy</th><th>Other income $850K (base)</th><th>Other income $600K (low retreats)</th></tr></thead>
            <tbody>{SENS_HIGH.map(([o, a, b]) => <tr key={o}><th>{o}</th><td>{a}</td><td>{b}</td></tr>)}</tbody>
          </table>
        </div>
        <div className="pg-prose" style={{marginTop: 'var(--space-8)'}}>
          <ul>
            <li><strong>Break-even:</strong> at mid prices, the operating budget falls short even when every home is full. Fees about 13% above mid prices (close to the top of each range) are needed to break even at 90% occupancy with base other income, and about 30% above mid with low retreat income.</li>
            <li><strong>Not yet included:</strong> discounts for contribution-based residency (20–30% of homes) and founding-member discounts. Both lower income further.</li>
            <li><strong>Ways to close the gap, to test in Stage 2:</strong> more homes on the same infrastructure, a higher share of 1-, 2- and 3-bedroom homes, a higher member fee, a lower operating cost per home, or retreat income secured by pre-sales.</li>
            <li><strong>Capex:</strong> the cost plan assumed 50–100 homes. About 110 homes, including 10 three-bedroom homes, may add about 10% to the housing line; this will be re-estimated in Stage 2. A +20% overrun on all construction takes it to about $54M and adds about $9M to the raise.</li>
            <li><strong>Economy plan:</strong> the inside economy moves step by step from dollar fees to Light hours, a time credit. The dial never goes below the edge bill (loan payments, taxes, insurance, outside costs and reserves), and it steps back automatically if that bill is not covered. See <a href={u('/docs/project/economy-and-migration')}>Economy and Migration</a>.</li>
            <li><strong>Open item, debt service:</strong> the operating model does not yet include interest. If the EPC share (about $9M) costs 6–8%, interest is $540K–$720K a year. Stage 2 will rebuild the model with debt terms, reserves and scenario IRRs.</li>
          </ul>
          <p>Full assumptions: <a href={stages + '#financial-model-notes--assumptions'}>financial model notes</a>.</p>
        </div>
      </Section>

      <Section alt id="comparables" eyebrow="5 · Comparables" title="What other communities teach us." lead="Real projects, good and hard, and the lesson we take from each.">
        <div className="pg-cards">
          {COMPS.map((c) => (
            <article className="pg-card" key={c.name}><div className="pg-card-body">
              <h3>{c.name}</h3>
              <p>{c.facts}</p>
              <p><strong>Lesson:</strong> {c.lesson}</p>
              <p className="pg-inline">{c.links.map(([t, h], i) => <React.Fragment key={h}>{i ? ' · ' : ''}<a href={h} target="_blank" rel="noopener noreferrer">{t}</a></React.Fragment>)}</p>
            </div></article>
          ))}
        </div>
      </Section>

      <Section id="legal" eyebrow="6 · Legal path" title="Intended structure, to be confirmed with counsel.">
        <div className="pg-prose">
          <ul>
            <li><strong>Entity:</strong> Light City Development, LLC, a Delaware limited liability company (formation status to be confirmed).</li>
            <li><strong>Now:</strong> accredited investors only, under Rule 506(c) of Regulation D.</li>
            <li><strong>Later:</strong> a community round under Regulation Crowdfunding (up to $5M in 12 months) or Regulation A, if counsel advises it.</li>
            <li>Background from the SEC: <a href="https://www.sec.gov/resources-small-businesses/capital-raising-building-blocks/offering-pathways" target="_blank" rel="noopener noreferrer">offering pathways</a> and <a href="https://www.sec.gov/resources-small-businesses/exempt-offerings/regulation-crowdfunding" target="_blank" rel="noopener noreferrer">Regulation Crowdfunding</a>.</li>
          </ul>
        </div>
      </Section>

      <Section alt id="exit" eyebrow="7 · Exit and liquidity" title="A 7–12 year horizon." lead="Proposed mechanisms from the development stages documentation. Terms will be set in the offering documents.">
        <ol className="pg-steps">
          <li className="now"><span className="when">Years 1–3</span><h3>Preferred return</h3><p>A target 4–6% preferred return once operations begin.</p></li>
          <li><span className="when">Years 5–7</span><h3>Refinance</h3><p>Refinancing with permanent debt aims to return investor capital in full.</p></li>
          <li><span className="when">Year 10+</span><h3>Sale to residents</h3><p>Sale to a community land trust or co-op, targeting 1.5–2.5x invested capital.</p></li>
        </ol>
        <p className="pg-inline" style={{marginTop: 'var(--space-6)'}}><a href={stages + '#investment-returns--exit-strategies'}>Investment returns and exit strategies</a></p>
      </Section>

      <Section id="governance" eyebrow="8 · Governance and control" title="Who decides, and how that changes.">
        <div className="pg-prose">
          <ul>
            <li><strong>Stages 1–4:</strong> founder-led, with the Managing Member making decisions and reporting openly.</li>
            <li><strong>From Stage 5:</strong> an elected community council (one seat per 50 residents) runs operations; major decisions need 80% consent.</li>
            <li><strong>Founder veto:</strong> limited to five written core principles, not budgets or operations.</li>
            <li><strong>Key person risk:</strong> a succession and key-person plan will be written in Stage 2.</li>
          </ul>
          <p><a href={u('/docs/project/governance')}>Governance</a> · <a href={u('/trust')}>Living Here, Honestly</a> (resident safeguards)</p>
        </div>
      </Section>

      <Section night eyebrow="Risk register" title="Risks already priced in." lead="Each major risk has a named mitigation and a line in the budget, including a 20% contingency.">
        <div className="pg-cards">
          {[
            ['Wildfire', 'Fire-resistant materials, defensible space and insurance.'],
            ['Wind loads', 'Wind-tunnel testing and dome reinforcement.'],
            ['Water rights', 'Legal review, well permits and backup sources.'],
            ['Budget creep', '20% contingency and phased value engineering.'],
            ['Neighbors', 'Early engagement and benefit sharing.'],
            ['Retreat income', 'Low-retreat case modeled; homes must carry operations without it.'],
          ].map(([t, d]) => (
            <article className="pg-card" key={t}><div className="pg-card-body"><h3>{t}</h3><p>{d}</p></div></article>
          ))}
        </div>
      </Section>

      <Section id="documents" eyebrow="9 · Diligence documents" title="What to review first.">
        <DocLinks items={[
          {to: '/docs/project/development-stages', tag: 'Project', title: 'Development stages', text: 'Timeline, costs, financial model notes and stage gates.'},
          {to: '/docs/at-a-glance', tag: 'Facts', title: 'At a glance', text: 'The one set of numbers every page uses.'},
          {to: '/docs/project/site-locations', tag: 'Land', title: 'Site locations', text: 'Five regions scored on energy, water, codes, land law and risk.'},
          {to: '/docs/project/governance', tag: 'Project', title: 'Governance', text: 'Decision rights, council, veto and transparency.'},
          {to: '/docs/technical/technology-catalog', tag: 'Technical', title: 'Technology catalog', text: 'Every system we plan to use, with its readiness level.'},
          {to: '/docs/technical/technology-horizon', tag: 'Technical', title: 'Technology horizon', text: 'What is proven, scaling, emerging or frontier.'},
        ]} />
      </Section>

      <Cta title="Talk to us about the raise." text="Use the contact form and choose Investor. We will send the current materials and set up a call." primary={{to: '/contact', label: 'Contact as an investor'}} secondary={{to: '/docs/START-HERE', label: 'Read the documentation'}} />
    </Site>
  );
}
