import { Mail, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { profile } from '../../data/profile';
import './Footer.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__left">
            <span className="footer__name">{profile.name}</span>
            <span className="footer__role">{profile.role}</span>
          </div>

          <div className="footer__links">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
              aria-label="GitHub"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href={`mailto:${profile.links.email}`}
              className="footer__link"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
            <a
              href={profile.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
              aria-label="Resume"
            >
              <FileText size={16} />
            </a>
          </div>

          <p className="footer__copy">
            &copy; {year} {profile.name}
            <span className="footer__dot" aria-hidden="true"> · </span>
            <span className="footer__built">Built with intention.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}