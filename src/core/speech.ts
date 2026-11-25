import { st } from './store';
import { norm } from './lex';
let voices: SpeechSynthesisVoice[] = [];
const has = typeof window !== 'undefined' && 'speechSynthesis' in window;
if (has) { const f = () => { voices = speechSynthesis.getVoices().filter(v => v.lang.startsWith('es')); }; f(); speechSynthesis.addEventListener?.('voiceschanged', f); }
const pickVoice = () => voices.find(v => v.lang === 'es-ES' && /premium|enhanced|natural|mónica|monica|jorge|google/i.test(v.name)) ?? voices.find(v => v.lang === 'es-ES') ?? voices[0];
export const canSpeak = () => has && voices.length > 0;
export function speak(text: string, slow = false, pitch = 1) {
  const s = st().settings; if (!has || !s.voice) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text.replace(/_+/g, '…').replace(/ \/ ella/g, '')); u.lang = 'es-ES'; const v = pickVoice(); if (v) u.voice = v;
  u.rate = slow ? .55 : s.rate; u.volume = s.voice; u.pitch = pitch; speechSynthesis.speak(u);
}
export const hush = () => { if (has) speechSynthesis.cancel(); };
type Rec = { lang: string; interimResults: boolean; maxAlternatives: number; onresult: (e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void; onerror: (e: { error: string }) => void; onend: () => void; start(): void; stop(): void };
const RC = typeof window !== 'undefined' ? ((window as unknown as Record<string, unknown>).SpeechRecognition ?? (window as unknown as Record<string, unknown>).webkitSpeechRecognition) as (new () => Rec) | undefined : undefined;
export const canListen = !!RC;
export const listen = () => new Promise<string[]>((res, rej) => { if (!RC) return rej('no'); const r = new RC(); r.lang = 'es-ES'; r.interimResults = false; r.maxAlternatives = 5; let done = false; r.onresult = e => { done = true; res(Array.from(e.results[0]).map(x => x.transcript)); }; r.onerror = e => rej(e.error); r.onend = () => { if (!done) rej('silence'); }; r.start(); });
export function similarity(a: string, b: string) { a = norm(a); b = norm(b); const m = a.length, n = b.length; if (!m || !n) return 0; let p = Array.from({ length: n + 1 }, (_, i) => i); for (let i = 1; i <= m; i++) { const c = [i]; for (let j = 1; j <= n; j++) c[j] = Math.min(p[j] + 1, c[j - 1] + 1, p[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); p = c; } return 1 - p[n] / Math.max(m, n); }
