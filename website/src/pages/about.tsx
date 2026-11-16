import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Site, {Section, Cards, DocLinks, Cta} from '../components/Site';

export default function About(): JSX.Element {
  const delphin = useBaseUrl('img/home/delphin.webp');
  const archetype = useBaseUrl('/docs/concepts/the-archetype');
  return (
    <Site
      title="Vision & Philosophy"
      description="Light City began as a visionary image and is now a practical, open plan for a regenerative community."
      eyebrow="Vision & philosophy"
      heading={<>Spirit before structure. <em>Engineering that keeps the promise.</em></>}
      sub="Light City is three things: a visionary image, a set of shared values and a practical plan anyone can read, question and help build."
      image="vision-1">
      <Section eyebrow="Core principles" title="Three ideas hold the whole project together." lead="Everything we design, finance and build is checked against these principles first.">
        <Cards items={[
          {to: '/docs/concepts/core-concepts#1-spirit-before-structure', kicker: 'I', title: 'Spirit before structure', img: 'vision-1', text: 'Values and community come first. A founding circle lives by the principles together before anything is built, and spiritual practice is always optional.'},
          {to: '/docs/concepts/core-concepts#2-listen-to-the-land', kicker: 'II', title: 'Listen to the land', img: 'about-land', text: 'The plan adapts to the place: its water, soil, climate and wildlife, and the people and cultures already there.'},
          {to: '/docs/concepts/core-concepts#3-collective-co-creation', kicker: 'III', title: 'Collective co-creation', img: 'journey-founding', text: "Light City is not one person's project. It grows through open collaboration and moves from founder-led to community-led governance."},
        ]} />
      </Section>

      <Section alt>
        <div className="pg-split">
          <img src={delphin} alt="Visionary archetype art of a crystal city with a tall central spire of light, not a real place or a design" loading="lazy" />
          <div>
            <p className="eyebrow">What is Light City?</p>
            <h2>An archetype, translated for Earth.</h2>
            <div className="pg-prose" style={{marginTop: 'var(--space-6)'}}>
              <p><strong>A visionary image.</strong> The project's source describes an "etheric blueprint" and Delphin, a crystal city on another world. We share that account openly on <a className="link" href={archetype}>The Archetype</a> and use it as a design brief, not a claim of fact.</p>
              <p><strong>Shared values.</strong> A shared aspiration toward regenerative living, care for one another and beautiful, meaningful places. No one needs to hold any belief to take part.</p>
              <p><strong>A practical plan.</strong> Stan's role is to turn the vision into something buildable, bringing decades of technology experience, systems thinking and a commitment to rigorous, open implementation.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section night>
        <p className="eyebrow">Purpose &amp; mission</p>
        <p className="pg-quote">To demonstrate that regenerative communities, with room for inner life, are <em>buildable, scalable and financially viable</em> using proven technologies and transparent governance.</p>
      </Section>

      <Section eyebrow="Horizons" title="From blueprint to living city." lead="Stage 1 (Foundation) is finishing now. Later stages follow in sequence.">
        <ol className="pg-steps">
          <li className="now">
            <p className="when">Now – Q2 2027</p>
            <h3>Short term <span className="pg-badge">Current</span></h3>
            <ul>
              <li>Complete Stage 1: Foundation (documentation, financial model, governance)</li>
              <li>Complete Stage 2: Design (architecture, engineering, permit prep)</li>
              <li>Build awareness and community</li>
            </ul>
          </li>
          <li>
            <p className="when">Q3 2027 – Q4 2028</p>
            <h3>Medium term</h3>
            <ul>
              <li>Stage 3: Digital platform (website, CRM, applications)</li>
              <li>Stage 4: Community building (retreats, pilot programs)</li>
              <li>Secure land and permits</li>
            </ul>
          </li>
          <li>
            <p className="when">2029 – 2032+</p>
            <h3>Long term</h3>
            <ul>
              <li>Stage 5: Physical construction (200–300 residents, Phase 1)</li>
              <li>Stage 6: Operational community (break-even, scaling)</li>
              <li>Phase 2 and 3 expansion (1,500+, then 8,000+ residents)</li>
            </ul>
          </li>
        </ol>
        <div style={{marginTop: 'var(--space-12)'}}>
          <DocLinks items={[
            {to: '/docs/concepts/purpose-and-mission', tag: 'Concepts', title: 'Purpose & mission', text: 'The full mission statement and what success looks like.'},
            {to: '/docs/concepts/core-concepts', tag: 'Concepts', title: 'Core concepts', text: 'The vision in plain words: three layers and five principles.'},
            {to: '/docs/project/development-stages', tag: 'Project', title: 'Development stages', text: 'The six-stage roadmap with dates, costs and status.'},
          ]} />
        </div>
      </Section>

      <Cta title="Help light the first dome." text="Join the founding circle for early updates, resident applications and investor materials." primary={{to: '/#join', label: 'Join the founding circle'}} secondary={{to: '/contact', label: 'Contact us'}} />
    </Site>
  );
}
