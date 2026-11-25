import { useState, useEffect } from 'react';
import { Volume2, VolumeX, ArrowUp, Mail } from 'lucide-react';
import { isSfxEnabled, setSfxEnabled, playClickSound } from '../../utils/audio';

export function InacioDock() {
  const [sfxOn, setSfxOn] = useState(false);
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    setSfxOn(isSfxEnabled());

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

  const toggleSound = () => {
    const next = !sfxOn;
    setSfxOn(next);
    setSfxEnabled(next);
    if (next) playClickSound();
  };

  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToContact = () => {
    playClickSound();
    const el = document.getElementById('terminal') || document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <aside className="inacio-dock-root" aria-label="Quick actions dock">
      <div className="inacio-dock-pill">
        <button
          onClick={toggleSound}
          className={`inacio-dock-btn ${sfxOn ? 'active' : ''}`}
          title={sfxOn ? 'Mute sound effects' : 'Enable tactile audio'}
          aria-label="Toggle audio effects"
        >
          {sfxOn ? <Volume2 size={13} /> : <VolumeX size={13} />}
          <span>{sfxOn ? 'SOUND: ON' : 'SOUND: OFF'}</span>
        </button>

        <div className="inacio-dock-sep" />

        <div className="inacio-dock-btn" style={{ cursor: 'default' }}>
          <span>BLR {timeStr || '12:17 PM'}</span>
        </div>

        <div className="inacio-dock-sep" />

        <button onClick={scrollToContact} className="inacio-dock-btn" aria-label="Jump to contact">
          <Mail size={13} />
          <span>CONNECT</span>
        </button>

        <button onClick={scrollToTop} className="inacio-dock-btn" aria-label="Back to top">
          <ArrowUp size={13} />
          <span>TOP</span>
        </button>
      </div>
    </aside>
  );
}
