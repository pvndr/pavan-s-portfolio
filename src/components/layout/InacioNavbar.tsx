import { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { profile } from '../../data/profile';
import { playClickSound } from '../../utils/audio';

export function InacioNavbar() {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const formatted = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(new Date());
      setTimeStr(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { href: '#work', label: 'Works', idx: '01' },
    { href: '#capabilities', label: 'Stack', idx: '02' },
    { href: '#journey', label: 'Journey', idx: '03' },
    { href: '#research', label: 'Research', idx: '04' },
    { href: '#terminal', label: 'Terminal', idx: '05' },
  ];

  return (
    <header className="inacio-top-bar" role="banner">
      <div className="inacio-nav-container">
        {/* Brand */}
        <a
          href="#hero"
          className="inacio-brand"
          onClick={() => playClickSound()}
          aria-label={`${profile.name} — home`}
        >
          <span className="inacio-brand-mark">SYS</span>
          <span className="inacio-brand-name">{profile.name}</span>
        </a>

        {/* Links */}
        <ul className="inacio-nav-links" role="list">
          {navItems.map((item) => (
            <li key={item.href} className="inacio-nav-item">
              <a href={item.href} onClick={() => playClickSound()}>
                <span className="inacio-nav-idx">[{item.idx}]</span>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Meta / Right */}
        <div className="inacio-top-meta">
          <div className="inacio-time-clock">
            <span className="inacio-pulse-dot" />
            <span>BLR {timeStr || '12:18 PM'}</span>
          </div>

          <a
            href={profile.links.resume}
            target="_blank"
            rel="noreferrer"
            className="inacio-action-link"
            style={{ fontSize: '12px', padding: '4px 10px' }}
            onClick={() => playClickSound()}
          >
            <FileText size={12} />
            <span>CV</span>
          </a>
        </div>
      </div>
    </header>
  );
}
