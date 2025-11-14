import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Mail } from 'lucide-react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* About Column */}
          <div className="footer-column">
            <h3>About Light City</h3>
            <p className="footer-description">
              A regenerative community project combining sacred architecture, 
              proven technologies, and unity consciousness.
            </p>
            <div className="social-links">
              <a href="https://github.com/szemkoff/light-city-project" target="_blank" rel="noopener noreferrer">
                <Github size={20} />
              </a>
              <a href="mailto:info@lightcityproject.org">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Explore Column */}
          <div className="footer-column">
            <h3>Explore</h3>
            <ul>
              <li><Link to="/about">Vision & Philosophy</Link></li>
              <li><Link to="/builders">Architecture</Link></li>
              <li><Link to="/about">Development Stages</Link></li>
              <li><Link to="/builders">Technology Catalog</Link></li>
            </ul>
          </div>

          {/* Get Involved Column */}
          <div className="footer-column">
            <h3>Get Involved</h3>
            <ul>
              <li><Link to="/investors">For Investors</Link></li>
              <li><Link to="/residents">For Residents</Link></li>
              <li><Link to="/builders">For Builders</Link></li>
              <li><Link to="/researchers">For Researchers</Link></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="footer-column">
            <h3>Resources</h3>
            <ul>
              <li><Link to="/resources">Documentation</Link></li>
              <li><Link to="/resources">FAQ</Link></li>
              <li><Link to="/resources">Glossary</Link></li>
              <li><a href="https://github.com/szemkoff/light-city-project" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; 2025 Light City Project. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Use</Link>
            <Link to="/conduct">Code of Conduct</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
