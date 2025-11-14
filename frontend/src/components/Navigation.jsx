import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import '../styles/Navigation.css';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="main-navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">✦</span>
          <span className="logo-text">Light City</span>
        </Link>

        {/* Desktop Menu */}
        <div className="nav-menu desktop">
          <Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link>
          <Link to="/about" className={isActive('/about') ? 'active' : ''}>About</Link>
          <Link to="/investors" className={isActive('/investors') ? 'active' : ''}>Investors</Link>
          <Link to="/residents" className={isActive('/residents') ? 'active' : ''}>Residents</Link>
          <Link to="/builders" className={isActive('/builders') ? 'active' : ''}>Builders</Link>
          <Link to="/researchers" className={isActive('/researchers') ? 'active' : ''}>Researchers</Link>
          <Link to="/resources" className={isActive('/resources') ? 'active' : ''}>Resources</Link>
        </div>

        {/* Theme Toggle & Mobile Menu Toggle */}
        <div className="nav-actions">
          <ThemeToggle />
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="nav-menu mobile">
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link to="/investors" onClick={() => setMobileMenuOpen(false)}>Investors</Link>
          <Link to="/residents" onClick={() => setMobileMenuOpen(false)}>Residents</Link>
          <Link to="/builders" onClick={() => setMobileMenuOpen(false)}>Builders</Link>
          <Link to="/researchers" onClick={() => setMobileMenuOpen(false)}>Researchers</Link>
          <Link to="/resources" onClick={() => setMobileMenuOpen(false)}>Resources</Link>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
