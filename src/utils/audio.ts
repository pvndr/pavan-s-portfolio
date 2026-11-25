let audioCtx: AudioContext | null = null;
let sfxEnabled = false;

function initAudio() {
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

export function setSfxEnabled(enabled: boolean) {
  sfxEnabled = enabled;
  if (enabled) {
    initAudio();
    localStorage.setItem('pavan_sfx', 'true');
  } else {
    localStorage.setItem('pavan_sfx', 'false');
  }
}

export function isSfxEnabled() {
  if (typeof window !== 'undefined' && localStorage.getItem('pavan_sfx') === 'true') {
    sfxEnabled = true;
  }
  return sfxEnabled;
}

export function playHoverSound() {
  if (!sfxEnabled || !audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(780, audioCtx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.04);
  } catch {
    // Ignore audio errors
  }
}

export function playClickSound() {
  if (!sfxEnabled || !audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(380, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, audioCtx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.06);
  } catch {
    // Ignore audio errors
  }
}

export function playTypingSound() {
  if (!sfxEnabled || !audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(700 + Math.random() * 240, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.02);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.02);
  } catch {
    // Ignore audio errors
  }
}
