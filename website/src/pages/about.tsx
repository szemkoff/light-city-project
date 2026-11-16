import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Site, {Section, Cards, DocLinks, Cta} from '../components/Site';

export default function About(): JSX.Element {
  const delphin = useBaseUrl('img/home/delphin.webp');
  return (
    <Site
      title="Vision & Philosophy"
      description="Light City is an etheric blueprint, a collective vision and a practical implementation plan for regenerative, consciousness-integrated community."
      eyebrow="Vision & philosophy"
      heading={<>Spirit before structure. <em>Engineering that keeps the promise.</em></>}
      sub="Light City is a multidimensional project: an etheric blueprint, a collective vision and a practical implementation plan."
      image="vision-1">
      <Section eyebrow="Core principles" title="Three ideas hold the whole project together." lead="Everything we design, finance and build is checked against these principles first.">
        <Cards items={[
          {to: '/docs/concepts/core-concepts#1-spirit-before-structure', kicker: 'I', title: 'Spirit before structure', img: 'vision-1', text: 'Light City begins as an etheric template, a higher-dimensional pattern. Physical implementation follows spiritual alignment.'},
          {to: '/docs/concepts/core-concepts#2-gaias-memory', kicker: 'II', title: "Gaia's memory", img: 'about-land', text: 'Earth holds the memory of what Light City can be. We co-create with planetary consciousness rather than impose on it.'},
          {to: '/docs/concepts/core-concepts#3-collective-co-creation', kicker: 'III', title: 'Collective co-creation', img: 'journey-founding', text: "Light City is not a single person's vision but an emergent pattern drawing from many consciousness streams."},
        ]} />
      </Section>

      <Section alt>
        <div className="pg-split">
          <img src={delphin} alt="Concept image of a crystal city with a tall central spire of light" loading="lazy" />
          <div>
            <p className="eyebrow">What is Light City?</p>
            <h2>An archetype, translated for Earth.</h2>
            <div className="pg-prose" style={{marginTop: 'var(--space-6)'}}>
              <p><strong>Etheric blueprint.</strong> A higher-dimensional pattern that exists in non-physical realms. Inspired by Delphin, described in channeled information as a crystal city on another world, Light City adapts those archetypal principles to Earth's constraints.</p>
              <p><strong>Collective vision.</strong> A shared aspiration across consciousness streams drawn to regenerative living, unity consciousness and sacred geometry. It is an emergent pattern, not one person's project.</p>
              <p><strong>Personal mission.</strong> Stan's role is to anchor the vision in the physical, bringing decades of technology experience, systems thinking and a commitment to rigorous implementation. It is both spiritual service and practical engineering.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section night>
        <p className="eyebrow">Purpose &amp; mission</p>
        <p className="pg-quote">To demonstrate that regenerative, consciousness-integrated communities are <em>buildable, scalable and financially viable</em> using proven technologies and transparent governance.</p>
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
            {to: '/docs/concepts/core-concepts', tag: 'Concepts', title: 'Core concepts', text: 'Sacred architecture, regenerative living and unity consciousness.'},
            {to: '/docs/project/development-stages', tag: 'Project', title: 'Development stages', text: 'The six-stage roadmap with dates, costs and status.'},
          ]} />
        </div>
      </Section>

      <Cta title="Help light the first dome." text="Join the founding circle for early updates, resident applications and investor materials." primary={{to: '/#join', label: 'Join the founding circle'}} secondary={{to: '/contact', label: 'Contact us'}} />
    </Site>
  );
}
