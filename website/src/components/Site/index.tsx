import React, {useEffect, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useLocation} from '@docusaurus/router';
import '../Home/home.css';
import './site.css';

const NAV = [
  {to: '/about', label: 'Vision'},
  {to: '/explore', label: 'Explore'},
  {to: '/residents', label: 'Residents'},
  {to: '/investors', label: 'Investors'},
  {to: '/builders', label: 'Builders'},
  {to: '/researchers', label: 'Researchers'},
  {to: '/contact', label: 'Contact'},
];

const Mark = ({s = 26}: {s?: number}) => (
  <svg viewBox="0 0 32 32" width={s} height={s} aria-hidden="true">
    <path d="M4 26a12 12 0 0 1 24 0" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <path d="M16 26V4" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="16" cy="4" r="2.2" fill="currentColor" />
  </svg>
);

type Props = {
  title: string;
  description: string;
  eyebrow: string;
  heading: React.ReactNode;
  sub?: React.ReactNode;
  image?: string; // name in static/img/home, omit for a compact night hero
  children: React.ReactNode;
};

export default function Site({title, description, eyebrow, heading, sub, image, children}: Props): JSX.Element {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const {pathname} = useLocation();
  const base = useBaseUrl('/');
  const heroSrc = useBaseUrl(image ? `img/home/${image}.webp` : 'img/home/hero.webp');
  const here = (to: string) => pathname.replace(/\/$/, '') === (base + to.slice(1)).replace(/\/$/, '');

  useEffect(() => {
    const f = () => setSolid(window.scrollY > 40);
    f();
    window.addEventListener('scroll', f, {passive: true});
    return () => window.removeEventListener('scroll', f);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <Layout title={title} description={description} noFooter>
      <div className="lc-home lc-page">
        <a className="skip" href="#main">Skip to content</a>
        <header className={'nav' + (solid || open ? ' solid' : '')}>
          <div className="nav-in">
            <Link to="/" className="brand" aria-label="Light City home"><Mark /><span>Light City</span></Link>
            <nav aria-label="Primary">
              <ul className={'nav-links' + (open ? ' open' : '')} id="navLinks">
                {NAV.map((n) => (
                  <li key={n.to}>
                    <Link to={n.to} className={here(n.to) ? 'active' : undefined} aria-current={here(n.to) ? 'page' : undefined}>{n.label}</Link>
                  </li>
                ))}
                <li><Link to="/docs/START-HERE" className="nav-docs">Docs</Link></li>
              </ul>
            </nav>
            <a href={base + '#join'} className="btn btn-sm nav-cta">Join the founding circle</a>
            <button className="menu" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="navLinks" onClick={() => setOpen((o) => !o)}>
              <span></span><span></span>
            </button>
          </div>
        </header>

        <main id="main">
          <section className={'pg-hero' + (image ? '' : ' compact')}>
            {image ? <img className="pg-hero-img" src={heroSrc} alt="" /> : null}
            <div className="pg-hero-veil"></div>
            <div className="wrap pg-hero-in">
              <p className="eyebrow light">{eyebrow}</p>
              <h1>{heading}</h1>
              {sub ? <p className="pg-hero-sub">{sub}</p> : null}
            </div>
          </section>
          {children}
        </main>

        <footer className="foot">
          <div className="wrap foot-grid">
            <div>
              <Link to="/" className="brand"><Mark s={22} /><span>Light City</span></Link>
              <p>A regenerative community project combining sacred architecture, proven technology and unity consciousness. Built in the open.</p>
            </div>
            <div><h4>Explore</h4><Link to="/explore">All topics</Link><Link to="/homes">Homes</Link><Link to="/city">The city</Link><Link to="/technology">Technology</Link><Link to="/locations">Locations</Link><Link to="/journey">The transition</Link></div>
            <div><h4>Get involved</h4><Link to="/residents">Residents</Link><Link to="/investors">Investors</Link><Link to="/builders">Builders</Link><Link to="/researchers">Researchers</Link><a href={base + '#join'}>Founding circle</a></div>
            <div><h4>Documentation</h4><Link to="/docs/START-HERE">Start here</Link><Link to="/docs/project/development-stages">Development stages</Link><Link to="/docs/technical/technology-catalog">Technology catalog</Link><Link to="/blog">Updates</Link><a href="https://github.com/szemkoff/light-city-project" target="_blank" rel="noopener noreferrer">GitHub</a></div>
            <div><h4>Project</h4><Link to="/about">Vision &amp; philosophy</Link><Link to="/resources">Resources</Link><Link to="/contact">Contact form</Link><Link to="/conduct">Code of conduct</Link><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></div>
          </div>
          <div className="wrap foot-base"><span>© {new Date().getFullYear()} Light City Project</span><span>MIT (code) · CC BY-SA 4.0 (docs)</span></div>
        </footer>
      </div>
    </Layout>
  );
}

/* ---------- building blocks ---------- */

export function Section({eyebrow, title, lead, night, alt, children, id}: {
  eyebrow?: string; title?: React.ReactNode; lead?: React.ReactNode; night?: boolean; alt?: boolean; id?: string; children?: React.ReactNode;
}): JSX.Element {
  return (
    <section id={id} className={'pg-sec' + (night ? ' night' : '') + (alt ? ' alt' : '')}>
      <div className="wrap">
        {title ? (
          <div className="pg-head">
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            <h2>{title}</h2>
            {lead ? <p className="lead">{lead}</p> : null}
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}

export function Cards({items}: {items: {title: string; text: React.ReactNode; img?: string; alt?: string; kicker?: string; to?: string; more?: string}[]}): JSX.Element {
  const base = useBaseUrl('/');
  return (
    <div className="pg-cards">
      {items.map((c) => {
        const inner = (
          <>
            {c.img ? <img src={`${base}img/home/${c.img}.webp`} alt={c.alt ?? ''} loading="lazy" width="600" height="400" /> : null}
            <div className="pg-card-body">
              {c.kicker ? <p className="pg-kicker">{c.kicker}</p> : null}
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              {c.to ? <span className="pg-topic-go">{c.more ?? (c.to.startsWith('/docs') ? 'Read more' : 'Explore')} <span aria-hidden="true">→</span></span> : null}
            </div>
          </>
        );
        return c.to
          ? <Link className="pg-card pg-card-link" key={c.title} to={c.to}>{inner}</Link>
          : <article className="pg-card" key={c.title}>{inner}</article>;
      })}
    </div>
  );
}

export function DocLinks({items}: {items: {to: string; title: string; text: string; tag?: string}[]}): JSX.Element {
  return (
    <div className="pg-docs">
      {items.map((d) => {
        const ext = d.to.startsWith('http');
        const inner = (
          <>
            {d.tag ? <span className="pg-tag">{d.tag}</span> : null}
            <h3>{d.title}</h3>
            <p>{d.text}</p>
            <span className="pg-arrow" aria-hidden="true">→</span>
          </>
        );
        return ext ? (
          <a key={d.to} className="pg-doc" href={d.to} target="_blank" rel="noopener noreferrer">{inner}</a>
        ) : (
          <Link key={d.to} className="pg-doc" to={d.to}>{inner}</Link>
        );
      })}
    </div>
  );
}

export function Cta({title, text, primary, secondary}: {
  title: string; text: string; primary: {to: string; label: string}; secondary?: {to: string; label: string};
}): JSX.Element {
  const bg = useBaseUrl('img/home/spire.webp');
  const base = useBaseUrl('/');
  const L = ({to, label, cls}: {to: string; label: string; cls: string}) =>
    to.includes('#') ? <a className={cls} href={base + to.replace(/^\//, '')}>{label}</a> : <Link className={cls} to={to}>{label}</Link>;
  return (
    <section className="pg-cta">
      <img src={bg} alt="" loading="lazy" className="pg-cta-bg" />
      <div className="pg-cta-veil"></div>
      <div className="wrap pg-cta-in">
        <h2>{title}</h2>
        <p>{text}</p>
        <div className="pg-actions">
          <L cls="btn" to={primary.to} label={primary.label} />
          {secondary ? <L cls="btn btn-ghost" to={secondary.to} label={secondary.label} /> : null}
        </div>
      </div>
    </section>
  );
}

/* ---------- detail blocks ---------- */

export function Feature({img, alt, kicker, title, children, specs, tag, reverse, id, to, more}: {
  img: string; alt: string; kicker?: string; title: string; children?: React.ReactNode;
  specs?: [string, React.ReactNode][]; tag?: string; reverse?: boolean; id?: string; to?: string; more?: string;
}): JSX.Element {
  const src = useBaseUrl(`img/home/${img}.webp`);
  return (
    <article className={'pg-feature' + (reverse ? ' rev' : '')} id={id}>
      <figure className="pg-feature-art"><img src={src} alt={alt} loading="lazy" width="1200" height="900" /></figure>
      <div className="pg-feature-body">
        {kicker ? <p className="pg-kicker">{kicker}</p> : null}
        <h3>{title}</h3>
        {tag ? <span className="pg-ready">{tag}</span> : null}
        <div className="pg-feature-text">{children}</div>
        {specs ? (
          <dl className="pg-specs">
            {specs.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
          </dl>
        ) : null}
        {to ? <Link className="pg-feature-more" to={to}>{more ?? 'Read more in the docs'} <span aria-hidden="true">→</span></Link> : null}
      </div>
    </article>
  );
}

export function Jump({items}: {items: {href: string; label: string}[]}): JSX.Element {
  return (
    <nav className="pg-jump" aria-label="On this page">
      {items.map((i) => <a key={i.href} href={i.href}>{i.label}</a>)}
    </nav>
  );
}

export function Topic({part, items}: {part: string; items: {to: string; title: string; summary: string; points: string[]}[]}): JSX.Element {
  return (
    <div className="pg-topic-group">
      <h3 className="pg-topic-part">{part}</h3>
      <div className="pg-topics">
        {items.map((t) => (
          <Link key={t.to} to={t.to} className="pg-topic">
            <h4>{t.title}</h4>
            <p>{t.summary}</p>
            <ul>{t.points.map((p) => <li key={p}>{p}</li>)}</ul>
            <span className="pg-topic-go">Read in the library <span aria-hidden="true">→</span></span>
          </Link>
        ))}
      </div>
    </div>
  );
}
