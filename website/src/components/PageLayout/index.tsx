import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function PageLayout({ children, title, description }: PageLayoutProps): JSX.Element {
  return (
    <div className={styles.pageWrapper}>
      {/* Navigation */}
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoIcon}>✦</span>
            <span className={styles.logoText}>Light City</span>
          </Link>
          
          <div className={styles.navLinks}>
            <Link to="/" className={styles.navLink}>Home</Link>
            <Link to="/about" className={styles.navLink}>About</Link>
            <Link to="/investors" className={styles.navLink}>Investors</Link>
            <Link to="/residents" className={styles.navLink}>Residents</Link>
            <Link to="/builders" className={styles.navLink}>Builders</Link>
            <Link to="/researchers" className={styles.navLink}>Researchers</Link>
            <Link to="/resources" className={styles.navLink}>Resources</Link>
            <Link to="/docs/START-HERE" className={styles.navLink}>Documentation</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {children}
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerGrid}>
            {/* About Column */}
            <div className={styles.footerColumn}>
              <h3>About Light City</h3>
              <p>
                A regenerative community project combining sacred architecture, 
                proven technologies, and unity consciousness.
              </p>
              <div className={styles.socialLinks}>
                <a href="https://github.com/szemkoff/light-city-project" target="_blank" rel="noopener noreferrer">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="mailto:info@lightcityproject.org">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Explore Column */}
            <div className={styles.footerColumn}>
              <h3>Explore</h3>
              <ul>
                <li><Link to="/about">Vision & Philosophy</Link></li>
                <li><Link to="/builders">Architecture</Link></li>
                <li><Link to="/about">Development Stages</Link></li>
                <li><Link to="/builders">Technology Catalog</Link></li>
              </ul>
            </div>

            {/* Get Involved Column */}
            <div className={styles.footerColumn}>
              <h3>Get Involved</h3>
              <ul>
                <li><Link to="/investors">For Investors</Link></li>
                <li><Link to="/residents">For Residents</Link></li>
                <li><Link to="/builders">For Builders</Link></li>
                <li><Link to="/researchers">For Researchers</Link></li>
              </ul>
            </div>

            {/* Resources Column */}
            <div className={styles.footerColumn}>
              <h3>Resources</h3>
              <ul>
                <li><Link to="/docs/START-HERE">Documentation</Link></li>
                <li><Link to="/resources">FAQ</Link></li>
                <li><Link to="/resources">Glossary</Link></li>
                <li><a href="https://github.com/szemkoff/light-city-project" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className={styles.footerBottom}>
            <p>© 2025 Light City Project. All rights reserved.</p>
            <div className={styles.footerLinks}>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Use</Link>
              <Link to="/conduct">Code of Conduct</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

