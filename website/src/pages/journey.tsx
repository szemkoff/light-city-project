import React from 'react';
import Site, {Section, Cards, DocLinks, Cta, Feature, Jump} from '../components/Site';

export default function Journey(): JSX.Element {
  return (
    <Site
      title="The Transition"
      description="Five movements from today's life to the Light City future: Awakening, Gathering, Founding, Flourishing and Radiating, with how to take part at each step."
      eyebrow="The transition"
      heading={<>From one person's attention <em>to a city of light.</em></>}
      sub="The transition happens in five movements. Each one is worthwhile on its own, each is voluntary, and each has a clear way to take part today."
      image="journey-path">
      <Section>
        <Jump items={[
          {href: '#awakening', label: '1 · Awakening'},
          {href: '#gathering', label: '2 · Gathering'},
          {href: '#founding', label: '3 · Founding'},
          {href: '#flourishing', label: '4 · Flourishing'},
          {href: '#radiating', label: '5 · Radiating'},
          {href: '#principles', label: 'Principles'},
        ]} />
        <div className="pg-quote"><p>The first technology of Light City is not a building. It is the daily habit of attention.</p></div>
      </Section>

      <Section alt eyebrow="Five movements" title="Inner shift and outer form, together.">
        <Feature to="/docs/concepts/the-transition#1-awakening--attention-as-the-first-technology"
          id="awakening"
          img="journey-awakening"
          alt="A person in a cotton knit reflecting by a city apartment window at dawn, a cup of tea and a notebook beside her"
          kicker="Movement 1 · Now – 2027 · Stages 1–3"
          title="Awakening"
          tag="From distraction to attention"
          specs={[['Outer form', 'Practice, the library, online circles'], ['Evidence', 'Small-to-moderate stress reduction'], ['Measure', 'WHO-5, Perceived Stress Scale'], ['Take part', 'Read, practice, join the list']]}>
          <p>Every transition begins with a person who notices their own mind: meditation, breathwork, time in nature and honest reflection. Research on mindfulness programs shows solid, modest benefits. That is enough to justify a practice culture, and we never present it as a miracle cure.</p>
          <p><strong>Take part now:</strong> explore the open library, try a simple daily practice and join the founding circle mailing list.</p>
        </Feature>
        <Feature to="/docs/concepts/the-transition#2-gathering--practicing-together"
          reverse
          id="gathering"
          img="journey-gathering"
          alt="A diverse circle of people in varied natural clothing around an outdoor stone fire pit beside a modern retreat pavilion at dusk"
          kicker="Movement 2 · 2027 – 2028 · Stage 4"
          title="Gathering"
          tag="From me to we"
          specs={[['Outer form', 'Retreats, residency pilots'], ['Gate', 'Founding circle of 150+'], ['Governance', 'Circles, 80% consent'], ['Measure', 'Retention, trust, conflict time']]}>
          <p>About half of intentional communities collapse within two years. The survivors share a common vision and a working way to resolve conflict. So Light City rehearses governance before pouring concrete: seasonal retreats, contribution-based residency pilots and real decisions made together.</p>
          <p><strong>Take part:</strong> attend a retreat, join the residency pilot or help facilitate circles.</p>
        </Feature>
        <Feature to="/docs/concepts/the-transition#3-founding--from-ideals-to-daily-life"
          id="founding"
          img="journey-founding"
          alt="Construction of a timber gridshell dome with a crane, a robotic arm and residents planting trees"
          kicker="Movement 3 · 2028 – 2031 · Stage 5"
          title="Founding"
          tag="From ideals to daily life"
          specs={[['Build', '3 domes, spire, temple, microgrid'], ['Residents', 'Join in waves, 200 by 2031'], ['Land', 'Trust or community land structure'], ['Measure', 'Performance and cost vs. budget']]}>
          <p>The Pilot Hamlet is built and the first residents move in as buildings open. This is where many communities lose their founding spirit, so organization grows carefully and residents help shape interiors, gardens and rituals.</p>
          <p><strong>Take part:</strong> invest, build, reserve a home or join a volunteer build season.</p>
        </Feature>
        <Feature to="/docs/concepts/the-transition#4-flourishing--a-regenerative-culture"
          reverse
          id="flourishing"
          img="journey-flourishing"
          alt="A shared dinner at long timber tables inside a glass dome under warm pendant lamps"
          kicker="Movement 4 · 2032+ · Stage 6"
          title="Flourishing"
          tag="From survival to contribution"
          specs={[['Rhythms', 'Morning practice, shared meals, festivals'], ['Learning', 'School, apprenticeships, open courses'], ['Research', 'Preregistered, published'], ['Revenue', 'Retreats, licensing, consulting']]}>
          <p>With housing, food and energy shared, people spend more of their life energy on creativity, care, learning and service. This is the heart of the vision: a culture where consciousness and contribution grow together.</p>
          <p><strong>Take part:</strong> live here, teach, study or visit as a researcher.</p>
        </Feature>
        <Feature to="/docs/concepts/the-transition#5-radiating--from-one-place-to-a-pattern"
          id="radiating"
          img="journey-radiating"
          alt="A mature modern organic town of domes and green roofs with a slender spire at sunset"
          kicker="Movement 5 · 2035+ · Phases 2–3"
          title="Radiating"
          tag="From one place to a pattern"
          specs={[['Village', '1,500–3,000 residents'], ['Town', '8,000+ residents'], ['Replication', 'Open-source design kits'], ['Retrofit', 'Patterns for existing towns']]}>
          <p>From "our city" to a way of living anyone can adopt. The Village and Town grow from what Phase 1 proves, while open design kits and the Urban Retrofit Guide bring Light City patterns into existing neighborhoods.</p>
          <p><strong>Take part:</strong> start a practice center, green-roof project or microgrid where you live.</p>
        </Feature>
      </Section>

      <Section id="principles" eyebrow="Principles" title="What keeps the transition humane.">
        <Cards items={[
          {to: '/docs/project/contribution-based-residency#1-voluntary-participation', title: 'Voluntary at every step', kicker: '1', text: 'No one is pressured to move to the next movement. Leaving is always respected.'},
          {to: '/docs/concepts/the-transition#principles-that-keep-the-transition-humane', title: 'Each step stands alone', kicker: '2', text: 'The library, a practice circle and a retreat are worthwhile even if a city is never built.'},
          {to: '/docs/research/open-questions#research-principles', title: 'Evidence before promises', kicker: '3', text: 'Claims about health or consciousness follow the research, never the reverse.'},
          {to: '/docs/project/governance#governance-principles', title: 'No single guru', kicker: '4', text: 'Inspiration comes from many sources; authority sits with transparent governance.'},
          {to: '/docs/concepts/the-transition#principles-that-keep-the-transition-humane', title: 'Reversible and adaptive', kicker: '5', text: 'Every stage has a gate. If it is not met, we pause, learn and adjust.'},
          {to: '/docs/design/visual-language', title: 'Beauty and care', kicker: '6', text: 'Sacred geometry, light and nature make daily life better, whether or not deeper hypotheses are confirmed.'},
        ]} />
      </Section>

      <Section alt eyebrow="Go deeper" title="The transition in the library.">
        <DocLinks items={[
          {to: '/docs/concepts/the-transition', tag: 'Transition', title: 'The transition', text: 'All five movements with sources and measures.'},
          {to: '/docs/project/development-stages', tag: 'Roadmap', title: 'Development stages', text: 'Stage gates, budgets and timeline.'},
          {to: '/docs/concepts/philosophy', tag: 'Why', title: 'Philosophy', text: 'The worldview behind the project.'},
          {to: '/docs/research/open-questions', tag: 'Research', title: 'Open questions', text: 'What we will test along the way.'},
        ]} />
      </Section>

      <Cta title="Begin with the first movement." text="Join the founding circle for practice resources, retreat invitations and project updates." primary={{to: '/#join', label: 'Join the founding circle'}} secondary={{to: '/explore', label: 'Explore the library'}} />
    </Site>
  );
}
