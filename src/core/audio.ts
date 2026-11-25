import { st } from './store';
let ctx: AudioContext | null = null; let amb: { g: GainNode; stop(): void } | null = null;
const ac = () => { if (!ctx) { try { ctx = new AudioContext(); } catch { return null; } } if (ctx.state === 'suspended') void ctx.resume(); return ctx; };
function tone(f: number, t: number, d: number, type: OscillatorType = 'sine', v = .2, f2 = f) { const c = ac(); if (!c) return; const o = c.createOscillator(), g = c.createGain(), n = c.currentTime + t; o.type = type; o.frequency.setValueAtTime(f, n); o.frequency.exponentialRampToValueAtTime(Math.max(20, f2), n + d); g.gain.setValueAtTime(0, n); g.gain.linearRampToValueAtTime(v * st().settings.sound, n + .01); g.gain.exponentialRampToValueAtTime(.0001, n + d); o.connect(g).connect(c.destination); o.start(n); o.stop(n + d + .05); }
function noise(d: number, f: number, v = .2, t = 0) { const c = ac(); if (!c) return; const b = c.createBuffer(1, c.sampleRate * d, c.sampleRate), x = b.getChannelData(0); for (let i = 0; i < x.length; i++) x[i] = (Math.random() * 2 - 1) * (1 - i / x.length); const s = c.createBufferSource(), fl = c.createBiquadFilter(), g = c.createGain(); s.buffer = b; fl.type = 'bandpass'; fl.frequency.value = f; g.gain.value = v * st().settings.sound; s.connect(fl).connect(g).connect(c.destination); s.start(c.currentTime + t); }
const FX = {
  ok: () => { tone(660, 0, .15); tone(880, .1, .25); }, bad: () => tone(220, 0, .3, 'triangle', .2, 140), click: () => tone(520, 0, .06, 'triangle', .1), coin: () => { tone(988, 0, .08, 'square', .06); tone(1319, .07, .3, 'square', .06); },
  win: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, i * .12, .4, 'triangle', .18)), step: () => noise(.06, 300, .06), chop: () => noise(.08, 1800, .3), pop: () => tone(300, 0, .12, 'sine', .2, 700), hit: () => { noise(.1, 700, .4); tone(160, 0, .12, 'square', .08); }, fry: () => noise(.5, 5000, .15), jump: () => tone(260, 0, .18, 'sine', .15, 520), dig: () => noise(.12, 500, .35), place: () => { noise(.06, 300, .4); tone(180, 0, .08); }, dice: () => [0, .07, .15, .22].forEach(t => noise(.04, 1500, .4, t)), kick: () => tone(150, 0, .18, 'sine', .4, 50), splash: () => noise(.5, 900, .25), horn: () => { tone(392, 0, .3, 'sawtooth', .06); tone(494, 0, .3, 'sawtooth', .06); }, bell: () => { tone(1200, 0, 1, 'sine', .15); tone(2400, 0, .6, 'sine', .05); },
};
export type Fx = keyof typeof FX;
export const sfx = (k: Fx) => { if (st().settings.sound > 0) try { FX[k](); } catch { /* звук необязателен */ } };
/** Фоновая атмосфера: отфильтрованный шум (ветер/море/город) и редкие птичьи трели. */
export function ambience(kind: 'city' | 'sea' | 'room' | 'rain' | 'cave' | null) {
  amb?.stop(); amb = null; if (!kind) return; const c = ac(); if (!c) return;
  const b = c.createBuffer(1, c.sampleRate * 3, c.sampleRate), x = b.getChannelData(0); let l = 0; for (let i = 0; i < x.length; i++) { l = (l + .02 * (Math.random() * 2 - 1)) / 1.02; x[i] = l * 3; }
  const s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain(), lfo = c.createOscillator(), lg = c.createGain(); s.buffer = b; s.loop = true; f.type = 'lowpass'; f.frequency.value = { city: 420, sea: 700, room: 180, rain: 4000, cave: 200 }[kind];
  const base = { city: .25, sea: .5, room: .1, rain: .7, cave: .25 }[kind] * st().settings.ambient; g.gain.value = base; lfo.frequency.value = kind === 'sea' ? .14 : .07; lg.gain.value = base * .5; lfo.connect(lg).connect(g.gain); s.connect(f).connect(g).connect(c.destination); s.start(); lfo.start();
  const birds = kind === 'city' || kind === 'sea' ? setInterval(() => { if (Math.random() < .5 && !document.hidden) { const q = 1800 + Math.random() * 1400; for (let i = 0; i < 3; i++) tone(q, i * .13, .1, 'sine', .035 * st().settings.ambient, q * 1.25); } }, 2600) : 0;
  amb = { g, stop() { try { s.stop(); lfo.stop(); } catch { /* уже остановлен */ } clearInterval(birds); g.disconnect(); } };
}
