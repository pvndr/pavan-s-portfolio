import { useState, useEffect } from 'react';
import { FileText, Menu, X } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { SfxToggle } from '../ui/SfxToggle';
import { LiveTelemetry } from '../ui/LiveTelemetry';
import { profile } from '../../data/profile';
import { playClickSound } from '../../utils/audio';
import './Navbar.css';

const navLinks = [
  { href: '#work', label: 'Systems', coord: '§01' },
  { href: '#skills', label: 'Capabilities', coord: '§02' },
  { href: '#journey', label: 'Pipeline', coord: '§03' },
  { href: '#research', label: 'Research', coord: '§04' },
  { href: '#terminal', label: 'Terminal', coord: '§05' },
];

interface NavbarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export function Navbar({ mobileOpen, setMobileOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: '-30% 0px -50% 0px' }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
      {/* Top Telemetry Strip (Nakiti-style) */}
      <div className="navbar__telemetry-strip">
        <div className="container telemetry-flex">
          <LiveTelemetry />
          <div className="telemetry-right">
            <span className="telemetry-build">BUILD: PROD.v2.4</span>
          </div>
        </div>
      </div>

      <nav className="navbar__inner container" aria-label="Primary navigation">
        {/* Logo */}
        <a
          href="#hero"
          className="navbar__logo"
          aria-label={`${profile.name} — back to top`}
          onClick={() => playClickSound()}
        >
          <span className="navbar__logo-initials">{profile.initials}</span>
          <span className="navbar__logo-name">{profile.name}</span>
        </a>

        {/* Desktop links */}
        <ul className="navbar__links" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`navbar__link ${activeSection === link.href.slice(1) ? 'navbar__link--active' : ''}`}
                aria-current={activeSection === link.href.slice(1) ? 'page' : undefined}
                onClick={() => playClickSound()}
              >
                <span className="navbar__link-coord" aria-hidden="true">{link.coord}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="navbar__actions">
          <SfxToggle />

          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="navbar__icon-link"
            aria-label="GitHub profile"
            onClick={() => playClickSound()}
          >
            <GithubIcon size={16} />
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="navbar__icon-link"
            aria-label="LinkedIn profile"
            onClick={() => playClickSound()}
          >
            <LinkedinIcon size={16} />
          </a>
          <a
            href={profile.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="navbar__resume-btn"
            aria-label="Download resume"
            onClick={() => playClickSound()}
          >
            <FileText size={13} />
            Resume
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="navbar__mobile-toggle"
          onClick={() => {
            playClickSound();
            setMobileOpen(!mobileOpen);
          }}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
    </header>
  );
}
