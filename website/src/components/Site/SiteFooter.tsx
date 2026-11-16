import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

export const Mark = ({s = 26}: {s?: number}) => (
  <svg viewBox="0 0 32 32" width={s} height={s} aria-hidden="true">
    <path d="M4 26a12 12 0 0 1 24 0" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <path d="M16 26V4" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="16" cy="4" r="2.2" fill="currentColor" />
  </svg>
);

/** The one site footer, shared by the homepage, the marketing pages and the docs and blog. */
export default function SiteFooter(): JSX.Element {
  const base = useBaseUrl('/');
  return (
    <footer className="foot">
      <div className="wrap foot-grid">
        <div>
          <Link to="/" className="brand"><Mark s={22} /><span>Light City</span></Link>
          <p>A regenerative community project combining sacred architecture, proven technology and room for inner life. Built in the open.</p>
        </div>
        <div><h4>Explore</h4><Link to="/explore">All topics</Link><Link to="/homes">Homes</Link><Link to="/city">The city</Link><a href={base + 'model/index.html?phase=1'}>3D model</a><Link to="/technology">Technology</Link><Link to="/locations">Locations</Link><Link to="/journey">The transition</Link></div>
        <div><h4>Get involved</h4><Link to="/residents">Residents</Link><Link to="/trust">Living here, honestly</Link><Link to="/investors">Investors</Link><Link to="/builders">Builders</Link><Link to="/researchers">Researchers</Link><a href={base + '#join'}>Founding circle</a></div>
        <div><h4>Documentation</h4><Link to="/docs/START-HERE">Start here</Link><Link to="/docs/project/development-stages">Development stages</Link><Link to="/docs/technical/technology-catalog">Technology catalog</Link><Link to="/blog">Updates</Link><a href="https://github.com/szemkoff/light-city-project" target="_blank" rel="noopener noreferrer">GitHub</a></div>
        <div><h4>Project</h4><Link to="/about">Vision &amp; philosophy</Link><Link to="/resources">Resources</Link><Link to="/contact">Contact form</Link><Link to="/conduct">Code of conduct</Link><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></div>
      </div>
      <div className="wrap foot-base"><span>© {new Date().getFullYear()} Light City Project</span><span>MIT (code) · CC BY-SA 4.0 (docs)</span></div>
    </footer>
  );
}
