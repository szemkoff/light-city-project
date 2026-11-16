import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Site, {Section, DocLinks, Cta} from '../components/Site';

const PROMISES: [string, string][] = [
  ['Practice is always optional', 'No one has to meditate, attend a ceremony or hold any belief to live, work or invest here. Shared values are an aspiration, not a test.'],
  ['You can leave', 'Anyone can leave at any time, with a clear notice period and a written refund schedule. Leaving is never treated as failure.'],
  ['No authority over your inner life', 'There is no guru and no spiritual hierarchy. The founder\u2019s veto covers five written principles only, never anyone\u2019s personal choices.'],
  ['Research is opt-in', 'Every study needs informed, written consent, and saying no never affects your place in the community.'],
];

export default function Trust(): JSX.Element {
  const u = (p: string) => useBaseUrl(p);
  return (
    <Site
      title="Living Here, Honestly"
      description="Light City's promises to residents, visitors and neighbors: optional practice, freedom to leave, data rights, affordability, measured ecology, respect for traditions and governance safeguards."
      eyebrow="Trust and safeguards"
      heading={<>Living here, <em>honestly.</em></>}
      sub="Intentional communities succeed or fail on trust. These are the promises we make in writing, the terms still being drafted and how you can hold us to them.">

      <Section id="promises" eyebrow="1 · Our promises" title="Four things that will not change.">
        <div className="pg-cards">
          {PROMISES.map(([t, d]) => (
            <article className="pg-card" key={t}><div className="pg-card-body"><h3>{t}</h3><p>{d}</p></div></article>
          ))}
        </div>
      </Section>

      <Section alt id="freedom" eyebrow="2 · Freedom and exit" title="How leaving works." lead="Draft terms from our governance and residency documents. They will be finalized in the membership agreement before anyone moves in.">
        <div className="pg-table-wrap">
          <table className="pg-table">
            <thead><tr><th>Situation</th><th>Draft terms</th></tr></thead>
            <tbody>
              <tr><th>Residents leaving by choice</th><td>90 days' notice. Prorated refund of deposits, minus any damage. Exit interview and help with moving and finding housing.</td></tr>
              <tr><th>Work-for-living participants</th><td>30 days' notice, no penalties.</td></tr>
              <tr><th>Founding deposits</th><td>No deposit will be taken until its refund schedule is published on this page.</td></tr>
              <tr><th>Being asked to leave (rare)</th><td>Only for breaking community agreements, 90 days of unpaid fees or a conflict that arbitration could not resolve. 30 days' notice, the right to appeal to the community council and a 60-day transition.</td></tr>
              <tr><th>Equity holders</th><td>Appraised value minus obligations, paid over 12–24 months, with the community offered first refusal.</td></tr>
            </tbody>
          </table>
        </div>
        <div className="pg-prose" style={{marginTop: 'var(--space-8)'}}>
          <p><strong>If something goes wrong.</strong> Conflicts move through four steps: direct conversation, voluntary and confidential mediation, a hearing by the conflict committee with a written decision and right of appeal, and only then an exit process. We also plan to appoint an independent ombudsperson from outside the community, so residents can raise concerns with someone who does not report to the founder or the council.</p>
          <p><a href={u('/docs/project/governance#exit-process')}>Exit process</a> · <a href={u('/docs/project/governance#conflict-resolution')}>Conflict resolution</a> · <a href={u('/docs/project/contribution-based-residency')}>Contribution-based residency</a></p>
        </div>
      </Section>

      <Section id="data" eyebrow="3 · Your data" title="Your body, your data.">
        <div className="pg-prose">
          <ul>
            <li><strong>Opt-in only.</strong> No heart-rate, brain or other biometric data is collected without written consent, and sensor-free (opt-out) zones are always available.</li>
            <li><strong>Owned by you.</strong> Data belongs to the person who produced it. You can see it, download it and have it deleted.</li>
            <li><strong>Protected.</strong> Stored encrypted, shared with researchers only under the study's approved protocol.</li>
            <li><strong>Published only anonymized.</strong> Results are open, including null results, but never in a form that identifies anyone.</li>
            <li><strong>Independent review.</strong> Studies go through an ethics board (IRB) and are pre-registered before data collection begins.</li>
          </ul>
          <p>A full data charter will be drafted with the first residents. <a href={u('/docs/research/open-questions#research-principles')}>Research principles</a></p>
        </div>
      </Section>

      <Section alt id="access" eyebrow="4 · Access and affordability" title="Not only for the wealthy.">
        <div className="pg-facts">
          <div className="pg-fact"><b>25%</b><span>Of homes are tiny homes priced below cost ($500–700 a month), carried by larger homes and retreat income</span></div>
          <div className="pg-fact"><b>3 tiers</b><span>Work-for-living residency: 25–30, 15–20 or 8–12 hours a week offset living costs</span></div>
          <div className="pg-fact"><b>Planned</b><span>Sliding-scale prices for retreats and visits</span></div>
        </div>
        <p className="pg-inline" style={{marginTop: 'var(--space-6)'}}><a href={u('/homes')}>Homes and prices</a> · <a href={u('/docs/project/contribution-based-residency#program-structure')}>Residency tiers</a></p>
      </Section>

      <Section id="ecology" eyebrow="5 · Ecology we measure" title="Targets we can be checked against." lead="Measured against a baseline taken before construction and reported every year.">
        <div className="pg-table-wrap">
          <table className="pg-table">
            <thead><tr><th>Measure</th><th>Target</th></tr></thead>
            <tbody>
              <tr><th>Energy</th><td>105% or more from on-site renewables, shown on an open real-time dashboard</td></tr>
              <tr><th>Water</th><td>No net groundwater drawdown; water reused at least once</td></tr>
              <tr><th>Biodiversity</th><td>At least 20% net gain, monitored for 30 years</td></tr>
              <tr><th>Land</th><td>At most 15% of the site developed; at least 50% kept as habitat</td></tr>
              <tr><th>Waste and carbon</th><td>Zero-waste loops; embodied carbon of every building reported</td></tr>
            </tbody>
          </table>
        </div>
        <p className="pg-inline" style={{marginTop: 'var(--space-6)'}}><a href={u('/docs/design/light-on-the-land')}>Light on the Land</a> · <a href={u('/docs/at-a-glance')}>At a glance</a></p>
      </Section>

      <Section alt id="traditions" eyebrow="6 · Respect for traditions" title="Borrow with credit, or not at all.">
        <div className="pg-prose">
          <p>Light City draws on sacred geometry and temple design from many cultures. We name our sources, credit the traditions they come from and consult living practitioners before using a sacred form, such as the Sri Yantra, in a building. We do not invent "ancient" claims, and where a symbol's meaning is traditional rather than proven, we say so.</p>
          <p>On any site, we start by listening to the people already there, including Indigenous nations, before making plans. <a href={u('/docs/concepts/sacred-geometry')}>Sacred geometry</a> · <a href={u('/docs/concepts/the-archetype')}>The Archetype</a></p>
        </div>
      </Section>

      <Section id="governance" eyebrow="7 · Governance safeguards" title="Power that is limited and shared.">
        <div className="pg-prose">
          <ul>
            <li><strong>Elected council</strong> from Stage 5: one representative per 50 residents, 2-year staggered terms, a maximum of 3 consecutive terms.</li>
            <li><strong>Recall:</strong> any council member can be removed by a 66% resident vote.</li>
            <li><strong>Consent:</strong> major decisions need 80% approval; monthly council meetings are open to all residents.</li>
            <li><strong>The founder's role narrows:</strong> founder-led in Stages 1–4, advisory from Stage 5, with a veto limited to five written core principles.</li>
          </ul>
          <p><a href={u('/docs/project/governance')}>Governance</a></p>
        </div>
      </Section>

      <Section alt id="path" eyebrow="8 · From curious to resident" title="Every step is optional." lead="Take as long as you like at each step, and stop at any point.">
        <ol className="pg-steps">
          <li className="now"><span className="when">Now</span><h3>Founding circle newsletter</h3><p>Updates, open questions and early invitations.</p></li>
          <li><span className="when">2027–2028</span><h3>Visit or retreat</h3><p>Open days once a site is shortlisted, and retreats to experience the rhythms, food and people.</p></li>
          <li><span className="when">2027–2028</span><h3>Residency pilot</h3><p>Try contribution-based living and help shape the model.</p></li>
          <li><span className="when">Stage 5</span><h3>Founding resident</h3><p>Apply, do a trial stay and decide, with no pressure either way.</p></li>
        </ol>
      </Section>

      <Section eyebrow="Read more" title="The documents behind these promises.">
        <DocLinks items={[
          {to: '/docs/project/governance', tag: 'Project', title: 'Governance', text: 'Council, consent, conflict resolution and exit.'},
          {to: '/docs/project/contribution-based-residency', tag: 'Project', title: 'Contribution-based residency', text: 'Work-for-living tiers and how the pilot will run.'},
          {to: '/docs/research/open-questions', tag: 'Research', title: 'Open questions', text: 'Research principles, consent and open data.'},
          {to: '/docs/design/light-on-the-land', tag: 'Design', title: 'Light on the Land', text: 'Ecological commitments and how we measure them.'},
        ]} />
      </Section>

      <Cta title="Ask us anything." text="If a promise here is unclear or missing, tell us. We will answer and update this page." primary={{to: '/contact', label: 'Contact us'}} secondary={{to: '/#join', label: 'Join the founding circle'}} />
    </Site>
  );
}
