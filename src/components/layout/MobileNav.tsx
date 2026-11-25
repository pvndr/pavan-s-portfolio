import { useEffect, useRef } from 'react';
import { FileText, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { profile } from '../../data/profile';
import './MobileNav.css';

const navLinks = [
  { href: '#work', label: 'Systems', coord: '§01' },
  { href: '#skills', label: 'Capabilities', coord: '§02' },
  { href: '#journey', label: 'Pipeline', coord: '§03' },
  { href: '#research', label: 'Research', coord: '§04' },
  { href: '#terminal', label: 'Terminal', coord: '§05' },
];

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (open) {
      firstLinkRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <>
      <div
        className={`mobile-nav__backdrop ${open ? 'mobile-nav__backdrop--visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        id="mobile-nav"
        className={`mobile-nav ${open ? 'mobile-nav--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <nav>
          <ul className="mobile-nav__links" role="list">
            {navLinks.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="mobile-nav__link"
                  onClick={onClose}
                  ref={i === 0 ? firstLinkRef : undefined}
                >
                  <span className="mobile-nav__coord" aria-hidden="true">
                    {link.coord}
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mobile-nav__footer">
            <a
              href={profile.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-nav__resume"
              onClick={onClose}
            >
              <FileText size={15} />
              Download Resume
            </a>

            <div className="mobile-nav__socials">
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="mobile-nav__social-link"
              >
                <GithubIcon size={20} />
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="mobile-nav__social-link"
              >
                <LinkedinIcon size={20} />
              </a>
              <a
                href={`mailto:${profile.links.email}`}
                aria-label="Email"
                className="mobile-nav__social-link"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
