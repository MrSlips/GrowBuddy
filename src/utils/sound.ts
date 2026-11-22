import { CareActionType } from '../types/game';

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const Ctx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!Ctx) return null;
  if (!audioCtx) {
    audioCtx = new Ctx();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function playTone(
  freqStart: number,
  freqEnd: number,
  duration: number,
  type: OscillatorType = 'sine',
  gainPeak = 0.08,
  delay = 0
) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freqStart, now);
  osc.frequency.exponentialRampToValueAtTime(Math.max(40, freqEnd), now + duration);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(gainPeak, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + duration + 0.02);
}

export function playCareSound(action: CareActionType, muted: boolean) {
  if (muted) return;
  try {
    switch (action) {
      case 'plant':
        playTone(260, 340, 0.14, 'triangle', 0.07);
        playTone(340, 440, 0.16, 'sine', 0.06, 0.08);
        break;
      case 'water':
        playTone(520, 760, 0.12, 'sine', 0.06);
        playTone(680, 920, 0.14, 'sine', 0.05, 0.07);
        break;
      case 'fertilize':
        playTone(330, 440, 0.15, 'triangle', 0.06);
        playTone(495, 587, 0.18, 'sine', 0.06, 0.08);
        break;
      case 'sunlight':
        playTone(587, 784, 0.16, 'sine', 0.06);
        playTone(784, 988, 0.2, 'triangle', 0.05, 0.09);
        break;
    }
  } catch {
    // Ignore audio context errors on restricted browsers
  }
}

export function playStageUpSound(isMature: boolean, muted: boolean) {
  if (muted) return;
  try {
    if (isMature) {
      playTone(523.25, 523.25, 0.16, 'triangle', 0.07, 0);
      playTone(659.25, 659.25, 0.16, 'triangle', 0.07, 0.11);
      playTone(783.99, 783.99, 0.18, 'triangle', 0.07, 0.22);
      playTone(1046.5, 1046.5, 0.34, 'sine', 0.08, 0.34);
    } else {
      playTone(440, 440, 0.12, 'sine', 0.06, 0);
      playTone(554.37, 554.37, 0.14, 'sine', 0.06, 0.09);
      playTone(659.25, 659.25, 0.24, 'triangle', 0.07, 0.18);
    }
  } catch {
    // Ignore audio errors
  }
}
