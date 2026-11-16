import React, {useEffect, useRef} from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useHistory} from '@docusaurus/router';
import initHome from '../components/Home/initHome';
import '../components/Home/home.css';

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const base = useBaseUrl('/');
  const history = useHistory();
  const rootRef = useRef<HTMLDivElement>(null);
  const key = (siteConfig.customFields as {web3formsAccessKey?: string} | undefined)?.web3formsAccessKey ?? '';
  const u = (p: string) => base + p;
  const img = (n: string) => base + 'img/home/' + n + '.webp';

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    root.classList.add('js');
    return initHome(root, {base, img, key, navigate: (p) => history.push(p)});
  }, []);

  return (
    <Layout
      title="A city designed to hold light"
      description="Light City is a buildable blueprint for regenerative community: timber communosphere domes, a solar light spire and an open-science home for consciousness research."
      noFooter>
      <Head>
        <link rel="preload" as="image" href={img('hero')} />
        <meta property="og:image" content={siteConfig.url + img('hero')} />
      </Head>
      <div className="lc-home" ref={rootRef}>
      <header className="nav" id="nav">
        <div className="nav-in">
          <a href="#top" className="brand" aria-label="Light City home">
            <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true"><path d="M4 26a12 12 0 0 1 24 0" fill="none" stroke="currentColor" strokeWidth="1.6"/><path d="M16 26V4" stroke="currentColor" strokeWidth="1.6"/><circle cx="16" cy="4" r="2.2" fill="currentColor"/></svg>
            <span>Light City</span>
          </a>
          <nav aria-label="Primary">
            <ul className="nav-links" id="navLinks">
              <li><a href="#vision">Vision</a></li>
              <li><a href="#city">The City</a></li>
              <li><a href="#living">Living</a></li>
              <li><a href="#invest">Invest</a></li>
              <li><a href="#research">Research</a></li>
              <li><a href="#roadmap">Roadmap</a></li>
              <li><a href={u('explore')}>Explore</a></li>
              <li><a href={u('docs/START-HERE')} className="nav-docs">Docs</a></li>
            </ul>
          </nav>
          <a href="#join" className="btn btn-sm nav-cta">Join the founding circle</a>
          <button className="menu" id="menu" aria-label="Open menu" aria-expanded="false" aria-controls="navLinks"><span></span><span></span></button>
        </div>
      </header>

      <main id="main">

      {/* HERO */}
      <section className="hero" id="top">
        <img className="hero-img" src={img('hero')} alt="Aerial view at sunset of a modern organic city: a slender lattice spire ringed by timber-and-glass domes, green-roofed buildings, gardens and water channels beside a lake" width="1672" height="941" />
        <div className="hero-veil"></div>
        <div className="hero-in wrap">
          <p className="eyebrow light">Stage 1 · Foundation — finishing now</p>
          <h1>A city designed<br />to <em>hold light.</em></h1>
          <p className="hero-sub">A living blueprint for regenerative community: luminous timber domes, a solar light spire and open, consent-based research on wellbeing and connection. Built only with technology that already stands somewhere on Earth.</p>
          <div className="hero-ctas">
            <a href="#city" className="btn">Explore the city</a>
            <a href="#vision" className="btn btn-ghost">Read the vision</a>
          </div>
        </div>

        <div className="persona wrap" id="persona">
          <div className="persona-card">
            <p className="persona-q">I'm here as…</p>
            <div className="persona-tabs" role="tablist" aria-label="Choose your interest">
              <button role="tab" aria-selected="true" data-p="resident">A future resident</button>
              <button role="tab" aria-selected="false" data-p="investor">An investor</button>
              <button role="tab" aria-selected="false" data-p="builder">A builder</button>
              <button role="tab" aria-selected="false" data-p="researcher">A researcher</button>
              <button role="tab" aria-selected="false" data-p="curious">Simply curious</button>
            </div>
            <div className="persona-panel" role="tabpanel" id="personaPanel" aria-live="polite"></div>
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className="vision" id="vision">
        <div className="wrap vision-grid">
          <div className="vision-text">
            <p className="eyebrow">01 — The vision</p>
            <h2>Spirit before structure.<br />Engineering that keeps the promise.</h2>
            <p className="lead">Light City begins as an archetype — a crystal city of light, central spire and gathering spheres — and translates it into something buildable, financeable and governed in the open.</p>
            <ol className="pillars">
              <li>
                <span className="pillar-n">I</span>
                <div><h3>Sacred architecture</h3><p>Three 30–45 m timber gridshell domes in Phase 1, with clay-plastered interiors, solar glazing and clusters of earth tiny homes. Curved, healthy and already proven.</p><span className="tag">TRL 7–9</span></div>
              </li>
              <li>
                <span className="pillar-n">II</span>
                <div><h3>Regenerative living</h3><p>Zero-waste loops, 2–5 MWp of solar in Phase 1, agroforestry and permaculture food systems that return carbon to the soil.</p><span className="tag">TRL 7–8</span></div>
              </li>
              <li>
                <span className="pillar-n">III</span>
                <div><h3>Inner life, studied openly</h3><p>Practice is always optional. Group coherence studies (HRV, EEG) are pre-registered, consent-based and ethics-first. Open data — null results published.</p><span className="tag">TRL 1–3</span></div>
              </li>
            </ol>
            <a className="link" href={u('journey')}>Follow the five-step transition <span aria-hidden="true">→</span></a>
            <a className="link" href={u('docs/concepts/core-concepts')}>Read the core concepts <span aria-hidden="true">→</span></a>
          </div>
          <figure className="vision-art">
            <img src={img('vision-2')} alt="A lone figure walks a golden path toward a radiant crystal spire surrounded by glowing crystal forms in a misty canyon" width="896" height="1152" loading="lazy" />
            <figcaption>The archetype: a spire of light at the heart of the community.</figcaption>
          </figure>
        </div>
        <div className="wrap stats" id="stats">
          <div><span className="stat-n" data-count="200">200</span><span className="stat-l">Phase 1 residents</span></div>
          <div><span className="stat-n" data-count="12" data-suffix="+">12+</span><span className="stat-l">Communospheres at full build</span></div>
          <div><span className="stat-n">8–12%</span><span className="stat-l">Target impact IRR</span></div>
          <div><span className="stat-n" data-count="180">180</span><span className="stat-l">Residents to break even</span></div>
        </div>
      </section>

      {/* CITY PLAN */}
      <section className="night city" id="city">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow light">02 — The city</p>
            <h2>Concentric by design.<br />Walk it from the spire outward.</h2>
            <p className="lead">Select a ring to see what lives there, then grow the city phase by phase.</p>
          </div>
          <div className="city-grid">
            <div className="plan-wrap">
              <svg id="plan" viewBox="-260 -260 520 520" role="group" aria-label="Interactive top-down plan of Light City"></svg>
              <div className="phase-switch" role="radiogroup" aria-label="Development phase">
                <button role="radio" aria-checked="true" data-phase="1">Phase 1<small>200 people</small></button>
                <button role="radio" aria-checked="false" data-phase="2">Phase 2<small>1,500 people</small></button>
                <button role="radio" aria-checked="false" data-phase="3">Phase 3<small>8,000+ people</small></button>
              </div>
            </div>
            <article className="zone" id="zone" aria-live="polite"></article>
          </div>
          <p style={{marginTop: 'var(--space-8)'}}><a className="link light" href={u('city')}>Tour every structure, with specifications <span aria-hidden="true">→</span></a> <a className="link light" href={u('locations')} style={{marginLeft: 'var(--space-6)'}}>See the four candidate regions on a map <span aria-hidden="true">→</span></a></p>
        </div>
      </section>

      {/* IMAGE BAND */}
      <section className="band">
        <img src={img('dome-interior')} alt="Sunlight streams through a timber gridshell dome over trees, a sunken seating circle around a stone water basin where people gather" width="1400" height="788" loading="lazy" />
        <div className="band-in wrap">
          <blockquote>Ambitious in form.<br />Conservative in engineering.</blockquote>
          <p>Every structure uses materials already standing elsewhere — from Norway's 85.4 m Mjøstårnet timber tower to timber gridshells, earth domes and 3D-printed homes of local soil.</p>
        </div>
      </section>


      {/* BEYOND THE BOX */}
      <section className="forms" id="forms">
        <div className="wrap">
          <div className="sec-head row">
            <div>
              <p className="eyebrow">03 — Beyond the box</p>
              <h2>Curves instead of boxes.<br />Healthy, simple, affordable.</h2>
            </div>
            <p className="lead forms-lead">Curved shells carry load in compression, so they use less material, move air and light more freely and feel calmer inside. We build them from timber, earth and clay — low-tech where it can be, precise where it must be.</p>
          </div>
          <div className="forms-grid">
            <a className="form-tile" href={u('docs/design/organic-forms-and-materials#the-toolbox')}>
              <img src={img('form-gridshell')} alt="A curved timber gridshell roof over a light-filled community hall" width="720" height="540" loading="lazy" />
              <span className="form-k">Domes · TRL 8–9</span><h3>Timber gridshell</h3><p>Bent lattices of thin timber: long spans, little material, warm light.</p>
            </a>
            <a className="form-tile" href={u('docs/design/organic-forms-and-materials#notes-on-the-strongest-options')}>
              <img src={img('form-superadobe')} alt="A cluster of small superadobe earth domes with clay plaster, round windows and planted roofs around a courtyard fire circle" width="720" height="540" loading="lazy" />
              <span className="form-k">Homes · TRL 7–9</span><h3>Earthbag &amp; clay</h3><p>Superadobe domes of local soil with clay plaster that buffers humidity.</p>
            </a>
            <a className="form-tile" href={u('docs/design/organic-forms-and-materials#an-accessibility-ladder')}>
              <img src={img('form-printed-earth')} alt="3D-printed earth homes with ribbed curved walls and green roofs along a garden path" width="720" height="540" loading="lazy" />
              <span className="form-k">Homes · TRL 6–7</span><h3>3D-printed earth</h3><p>Printers shape local soil into curved walls with almost no waste.</p>
            </a>
            <a className="form-tile" href={u('docs/design/organic-forms-and-materials#the-toolbox')}>
              <img src={img('form-thin-shell')} alt="A thin concrete shell roof curving over an open-air gathering space" width="720" height="540" loading="lazy" />
              <span className="form-k">Pavilions · TRL 7–8</span><h3>Thin shells</h3><p>Funicular vaults a few centimeters thick for markets and gathering halls.</p>
            </a>
          </div>
          <p className="forms-more"><a className="link" href={u('docs/design/organic-forms-and-materials')}>Read Beyond the Box <span aria-hidden="true">→</span></a> <a className="link" href={u('homes#earth')}>Earth tiny homes <span aria-hidden="true">→</span></a></p>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section className="tech" id="technology">
        <div className="wrap">
          <div className="sec-head row">
            <div>
              <p className="eyebrow">04 — Proven technology</p>
              <h2>Built from what already works.</h2>
            </div>
            <div className="chips" id="techChips" role="group" aria-label="Filter technologies">
              <button className="chip active" data-f="all">All</button>
              <button className="chip" data-f="structure">Structure</button>
              <button className="chip" data-f="energy">Energy</button>
              <button className="chip" data-f="water">Water</button>
              <button className="chip" data-f="food">Food</button>
            </div>
          </div>
        </div>
        <div className="rail-wrap">
          <div className="rail" id="techRail" tabIndex={0} aria-label="Technology cards, scroll horizontally"></div>
          <div className="wrap rail-ctrl">
            <span><a className="link" href={u('technology')}>How the city's systems work <span aria-hidden="true">→</span></a> <a className="link" href={u('docs/technical/technology-catalog')}>Full technology catalog <span aria-hidden="true">→</span></a></span>
            <div><button className="arrow" id="railPrev" aria-label="Previous technologies">←</button><button className="arrow" id="railNext" aria-label="Next technologies">→</button></div>
          </div>
        </div>
      </section>

      {/* LIVING */}
      <section className="living" id="living">
        <div className="wrap living-grid">
          <figure className="living-art">
            <img src={img('living')} alt="Residents of many ages and backgrounds in varied natural clothing walk a garden path between curved timber homes with green roofs and a glass dome in morning light" width="1400" height="933" loading="lazy" />
          </figure>
          <div>
            <p className="eyebrow">05 — Living</p>
            <h2>A day that follows the sun.</h2>
            <p className="lead">Drag the sun across the sky — or tap an hour — to see how life in a communosphere is paced.</p>
          </div>
        </div>
        <div className="wrap day">
          <div className="day-scroll"><div className="day-track">
          <div className="arc-wrap"><svg className="sun-arc" viewBox="0 0 1000 220" preserveAspectRatio="none" aria-hidden="true">
            <rect x="0" y="-20" width="1000" height="250" fill="transparent"/><path id="arcPath" d="M20 210 Q500 -150 980 210" fill="none" stroke="currentColor" strokeDasharray="3 7"/>

          </svg><span className="sun" id="sun" aria-hidden="true"></span></div>
          <input type="range" id="dayRange" min="0" max="6" step="1" defaultValue={0} aria-label="Time of day" />
          <ol className="hours" id="hours"></ol>
          </div></div>
          <div className="hour-detail" id="hourDetail" aria-live="polite"></div>
        </div>
        <div className="wrap homes">
          <div className="homes-head">
            <h3>Homes</h3>
            <p>All-inclusive: utilities, 10–15 communal meals a month, sauna, yoga, maintenance — and a vote in governance.</p>
          </div>
          <div className="home-list">
            <a className="home" href={u('homes#tiny')}><span className="home-t">Tiny home</span><span className="home-s">200–300 sf</span><span className="home-p">$500–700<small>/mo</small></span></a>
            <a className="home" href={u('homes#studio')}><span className="home-t">Studio</span><span className="home-s">400–500 sf</span><span className="home-p">$700–950<small>/mo</small></span></a>
            <a className="home" href={u('homes#one-bedroom')}><span className="home-t">1-Bedroom</span><span className="home-s">600–800 sf</span><span className="home-p">$950–1,300<small>/mo</small></span></a>
            <a className="home" href={u('homes#two-bedroom')}><span className="home-t">2-Bedroom</span><span className="home-s">900–1,200 sf</span><span className="home-p">$1,300–1,700<small>/mo</small></span></a>
          </div>
          <a className="link" href={u('homes')}>See every home type <span aria-hidden="true">→</span></a>
          <a className="link" href={u('docs/project/contribution-based-residency')}>How contribution-based residency works <span aria-hidden="true">→</span></a>
        </div>
      </section>

      {/* INVEST */}
      <section className="night invest" id="invest">
        <div className="wrap">
          <div className="sec-head row">
            <div>
              <p className="eyebrow light">06 — For investors</p>
              <h2>Patient capital.<br />Measurable returns.</h2>
            </div>
            <div className="scen" role="radiogroup" aria-label="Investment scenario">
              <button role="radio" aria-checked="false" data-s="0">Low</button>
              <button role="radio" aria-checked="true" data-s="1">Mid · target</button>
              <button role="radio" aria-checked="false" data-s="2">High</button>
            </div>
          </div>
          <div className="kpis">
            <div><span className="kpi-l">Capital expenditure</span><span className="kpi-n" id="kCapex">$45M</span></div>
            <div><span className="kpi-l">Annual operating cost</span><span className="kpi-n" id="kOpex">$2.5M</span></div>
            <div><span className="kpi-l">Resident capacity</span><span className="kpi-n" id="kCap">200</span></div>
            <div><span className="kpi-l">Break-even residents</span><span className="kpi-n" id="kBe">180</span></div>
          </div>
          <div className="invest-grid">
            <div>
              <h3>Revenue mix <small>per year</small></h3>
              <ul className="bars" id="bars"></ul>
            </div>
            <div>
              <h3>Risks already priced in</h3>
              <dl className="risks">
                <div><dt>Wildfire</dt><dd>Fire-resistant materials, defensible space, insurance</dd></div>
                <div><dt>Wind loads</dt><dd>Wind-tunnel testing and dome reinforcement</dd></div>
                <div><dt>Water rights</dt><dd>Legal review, well permits, backup sources</dd></div>
                <div><dt>Budget creep</dt><dd>20% contingency and phased value engineering</dd></div>
                <div><dt>Neighbors</dt><dd>Early engagement and benefit sharing</dd></div>
              </dl>
            </div>
          </div>
          <div className="invest-links">
            <a className="link light" href={u('docs/project/development-stages')}>Timeline, costs and financial model notes <span aria-hidden="true">→</span></a>
            <a className="link light" href={u('docs/project/governance')}>Governance and decision rights <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>

      {/* RESEARCH */}
      <section className="research" id="research">
        <div className="wrap research-grid">
          <div>
            <p className="eyebrow">07 — Research</p>
            <h2>A living laboratory,<br />held to open-science standards.</h2>
            <p className="lead">Engineering deliverables and consciousness hypotheses are kept on separate tracks — each with an honest readiness level.</p>
            <div className="trl" id="trl" aria-label="Technology readiness scale from 1 to 9">
              <div className="trl-scale"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span></div>
              <ul className="trl-rows">
                <li style={{['--a' as string]: 0, ['--b' as string]: 2} as React.CSSProperties}><span className="trl-name">Consciousness field studies</span><span className="trl-bar"></span><span className="trl-d">HRV, EEG and heart-brain coherence across groups</span></li>
                <li style={{['--a' as string]: 1, ['--b' as string]: 3} as React.CSSProperties}><span className="trl-name">Acoustic resonance</span><span className="trl-bar"></span><span className="trl-d">RT60, SPL and listener studies inside the spire</span></li>
                <li style={{['--a' as string]: 4, ['--b' as string]: 6} as React.CSSProperties}><span className="trl-name">Biophilic health</span><span className="trl-bar"></span><span className="trl-d">Stress markers, sleep and cognitive performance</span></li>
                <li style={{['--a' as string]: 6, ['--b' as string]: 8} as React.CSSProperties}><span className="trl-name">Regenerative agriculture</span><span className="trl-bar"></span><span className="trl-d">Soil carbon, biomass and lifecycle analysis</span></li>
              </ul>
            </div>
            <p className="fine">Pre-registered on OSF · IRB approval · informed consent · opt-out zones · public anonymized datasets</p>
            <a className="link" href={u('docs/research/open-questions')}>Open research questions <span aria-hidden="true">→</span></a>
          </div>
          <figure className="research-art">
            <img src={img('research')} alt="A circle of meditation cushions with small sensors inside a sunlit timber pavilion, a laptop showing waveforms on a desk" width="1400" height="788" loading="lazy" />
          </figure>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="night roadmap" id="roadmap">
        <img className="roadmap-bg" src={img('spire')} alt="" width="1200" height="960" loading="lazy" />
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow light">08 — Roadmap</p>
            <h2>Six stages, from blueprint<br />to living city.</h2>
          </div>
          <div className="stages" id="stages" role="tablist" aria-label="Development stages"></div>
          <div className="stage-detail" id="stageDetail" aria-live="polite"></div>
        </div>
      </section>

      {/* INSPIRATION */}
      <section className="inspo" id="inspiration">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">09 — Inspiration</p>
            <h2>An archetype, translated for Earth.</h2>
            <p className="lead">The project's visionary source describes Delphin, a crystal city on another world. We treat it as a design archetype, not evidence, and pair it with the temple cities humans have already built.</p>
          </div>
          <div className="compare">
            <figure className="cmp cmp-a">
              <img src={img('delphin')} alt="Concept rendering of Delphin: a towering dark crystal spire over a radial city with white domes in forest" width="936" height="524" loading="lazy" />
              <figcaption><span>Delphin · visionary archetype, not a real place</span>As the source describes it: a 40,000 ft spire and spheres for 10,000 people</figcaption>
            </figure>
            <figure className="cmp cmp-b">
              <img src={img('vision-1')} alt="Concept art of Light City: a circular white city with a glowing central spire on a lake among mountains" width="1216" height="832" loading="lazy" />
              <figcaption><span>Light City · Earth</span>Spire 60–300 m · spheres for 80–400 people · CLT, BIPV, geodesic</figcaption>
            </figure>
            <figure className="cmp cmp-c">
              <img src={img('borobudur')} alt="Stone stupas of Borobudur temple at sunrise" width="1000" height="562" loading="lazy" />
              <figcaption><span>Borobudur</span>A mandala you walk through</figcaption>
            </figure>
            <figure className="cmp cmp-d">
              <img src={img('angkor')} alt="Towers of Angkor Wat reflected in water" width="768" height="768" loading="lazy" />
              <figcaption><span>Angkor</span>Water, axis and the sacred center</figcaption>
            </figure>
          </div>
          <a className="link" href={u('docs/design/architecture')}>Architecture: archetype vs. Earth implementation <span aria-hidden="true">→</span></a>
          <a className="link" href={u('docs/concepts/the-archetype')}>The Archetype: the visionary source in full <span aria-hidden="true">→</span></a>
        </div>
      </section>

      {/* LIBRARY */}
      <section className="library" id="library">
        <div className="wrap">
          <div className="sec-head row">
            <div>
              <p className="eyebrow">10 — Library</p>
              <h2>Everything we've written, in one place.</h2>
            </div>
            <label className="search">
              <span className="sr">Search the library</span>
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="1.8"/><path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
              <input type="search" id="libSearch" placeholder="Search governance, domes, energy…" autoComplete="off" />
            </label>
          </div>
          <div className="chips" id="libChips" role="group" aria-label="Filter library by section">
            <button className="chip active" data-f="all">All</button>
            <button className="chip" data-f="Concepts">Concepts</button>
            <button className="chip" data-f="Design">Design</button>
            <button className="chip" data-f="Technical">Technical</button>
            <button className="chip" data-f="Research">Research</button>
            <button className="chip" data-f="Project">Project</button>
          </div>
          <div className="docs" id="docs"></div>
          <p className="empty" id="libEmpty" hidden={true}>No documents match that search. Try “energy”, “residency” or “geometry”.</p>
        </div>
      </section>

      {/* JOIN */}
      <section className="join" id="join">
        <img src={img('spire')} alt="" width="1200" height="960" loading="lazy" className="join-bg" />
        <div className="join-veil"></div>
        <div className="wrap join-in">
          <h2>Help light the first dome.</h2>
          <p>Join the founding circle for early updates, resident applications and investor materials.</p>
          <form className="form" id="joinForm" action="https://api.web3forms.com/submit" method="POST">
            <input type="hidden" name="subject" defaultValue="Light City Project - Founding circle signup" />
            <input type="hidden" name="from_name" defaultValue="Light City website" />
            <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" hidden />
            <label className="sr" htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required placeholder="you@example.com" />
            <label className="sr" htmlFor="interest">I'm interested as</label>
            <select id="interest" name="interest"><option>Future resident</option><option>Investor</option><option>Builder</option><option>Researcher</option><option>Supporter</option></select>
            <button className="btn" type="submit">Join</button>
          </form>
          <p className="form-msg" id="formMsg" role="status"></p>
        </div>
      </section>
      </main>

      <footer className="foot">
        <div className="wrap foot-grid">
          <div>
            <a href="#top" className="brand"><svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true"><path d="M4 26a12 12 0 0 1 24 0" fill="none" stroke="currentColor" strokeWidth="1.6"/><path d="M16 26V4" stroke="currentColor" strokeWidth="1.6"/><circle cx="16" cy="4" r="2.2" fill="currentColor"/></svg><span>Light City</span></a>
            <p>A regenerative community project combining sacred architecture, proven technology and room for inner life. Built in the open.</p>
          </div>
          <div><h4>Explore</h4><a href="#vision">Vision</a><a href="#city">The City</a><a href="#living">Living</a><a href="#invest">Invest</a><a href="#research">Research</a></div>
          <div><h4>Documentation</h4><a href={u('docs/START-HERE')}>Start here</a><a href={u('docs/project/development-stages')}>Development stages</a><a href={u('blog')}>Updates</a><a href="https://github.com/szemkoff/light-city-project">GitHub</a><a href={u('about')}>About the project</a></div>
          <div><h4>Contact</h4><a href={u('trust')}>Living here, honestly</a><a href={u('investors')}>Investor diligence</a><a href={u('contact')}>Contact form</a><a href={u('conduct')}>Code of conduct</a><a href={u('privacy')}>Privacy</a></div>
        </div>
        <div className="wrap foot-base"><span>© {new Date().getFullYear()} Light City Project</span><span>MIT (code) · CC BY-SA 4.0 (docs)</span></div>
      </footer>
      </div>
    </Layout>
  );
}
