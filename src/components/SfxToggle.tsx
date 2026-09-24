import { useState, useEffect } from 'react';
import { setSfxEnabled, isSfxEnabled, playClickSound } from '../utils/audio';

export function SfxToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(isSfxEnabled());
  }, []);

  const toggleSfx = () => {
    const newState = !enabled;
    setEnabled(newState);
    setSfxEnabled(newState);
    if (newState) {
      // Small timeout to allow AudioContext to init before playing
      setTimeout(playClickSound, 50);
    }
  };

  return (
    <button 
      id="sfx-toggle" 
      className="sfx-toggle magnetic-target"
      onClick={toggleSfx}
      aria-label={`Toggle sound effects, currently ${enabled ? 'enabled' : 'disabled'}`}
    >
      <span className="sfx-status">SFX: {enabled ? 'ON' : 'OFF'}</span>
    </button>
  );
}
