import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { isSfxEnabled, setSfxEnabled, playClickSound } from '../../utils/audio';

export function SfxToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(isSfxEnabled());
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    setSfxEnabled(next);
    if (next) {
      setTimeout(() => playClickSound(), 50);
    }
  };

  return (
    <button
      onClick={toggle}
      className={`sfx-toggle-btn ${enabled ? 'active' : ''}`}
      title={enabled ? 'Mute sound effects' : 'Enable tactile audio effects'}
      aria-label="Toggle sound effects"
    >
      {enabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
      <span className="sfx-text">SFX: {enabled ? 'ON' : 'OFF'}</span>
    </button>
  );
}
