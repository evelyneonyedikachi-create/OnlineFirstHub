// Web Audio API lightweight sound generator for elegant micro-interactions
let audioCtx: AudioContext | null = null;
let soundEnabled = false;

export function setSoundEnabled(enabled: boolean) {
  soundEnabled = enabled;
  if (enabled && !audioCtx && typeof window !== 'undefined') {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export function playTick(frequency = 720, type: OscillatorType = 'sine', duration = 0.04, gainLevel = 0.025) {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(frequency * 0.6, audioCtx.currentTime + duration);

    gain.gain.setValueAtTime(gainLevel, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch {
    // Ignore audio restrictions
  }
}

export function playChime(_accentColor?: string) {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    if (!audioCtx) return;

    // Ethereal dual crystal harmonic (587Hz D5 + 880Hz A5)
    [587.33, 880.00].forEach((freq, idx) => {
      const osc = audioCtx!.createOscillator();
      const gain = audioCtx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx!.currentTime);

      const dur = 0.22 + idx * 0.08;
      gain.gain.setValueAtTime(0.025, audioCtx!.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx!.currentTime + dur);

      osc.connect(gain);
      gain.connect(audioCtx!.destination);

      osc.start();
      osc.stop(audioCtx!.currentTime + dur);
    });
  } catch {
    // Ignore audio restrictions
  }
}
