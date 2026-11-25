import { create } from 'zustand';
import type { Level, MemberId, P } from './types';
import { MEMBERS } from './types';
import { today } from './util';
import type { Question } from './question';
export interface WordStat { ok: number; bad: number; ru: string }
export interface Mistake { id: string; q: Question; given: string; n: number; t: number }
export interface Best { score: number; secs: number; plays: number; wins: number }
export interface Outfit { top?: string; hat?: string }
export interface Profile { level: Level; coins: number; correct: number; total: number; streak: number; words: Record<string, WordStat>; mistakes: Mistake[]; inv: Record<string, number>; owned: string[]; outfit: Outfit; car: string; ach: string[]; best: Record<string, Best>; medals: { oro: number; plata: number; bronce: number } }
export type Mode = 'solo' | 'dos' | 'tres' | 'cuatro' | 'padres-hijos' | 'el-am' | 'coop';
export interface Result { game: string; who: MemberId; score: number; secs: number; t: number; team: string }
export interface Settings { sound: number; ambient: number; voice: number; rate: number; quality: 'auto' | 'low' | 'medium' | 'high'; autoSpeak: boolean; sens: number }
export interface Family { points: Record<string, number>; cups: number; missions: Record<string, number>; missionStars: Record<string, number>; daily: { date: string; n: Record<string, number>; claimed: string[] }; history: Result[]; furniture: string[]; unlocked: string[]; visited: string[] }
const newProfile = (): Profile => ({ level: 'A1', coins: 60, correct: 0, total: 0, streak: 0, words: {}, mistakes: [], inv: {}, owned: [], outfit: {}, car: 'rojo', ach: [], best: {}, medals: { oro: 0, plata: 0, bronce: 0 } });
const newFamily = (): Family => ({ points: {}, cups: 0, missions: {}, missionStars: {}, daily: { date: today(), n: {}, claimed: [] }, history: [], furniture: [], unlocked: [], visited: [] });
export type Screen = { k: 'title' } | { k: 'city' } | { k: 'room'; id: string } | { k: 'game'; id: string; cfg?: Record<string, unknown>; mission?: { id: string; step: number } } | { k: 'page'; id: string };
export interface S {
  profiles: Record<MemberId, Profile>; family: Family; settings: Settings; me: MemberId; mode: Mode; seats: MemberId[]; started: boolean;
  screen: Screen; back: Screen; paused: boolean; toasts: { id: number; p: P; kind: string }[]; card: { p: P; x: number; y: number; noRu?: boolean } | null; pos: [number, number] | null;
  go(s: Screen): void; set(p: Partial<S>): void; prof(id: MemberId, f: (p: Profile) => void): void; fam(f: (x: Family) => void): void; setting(p: Partial<Settings>): void;
  toast(p: P, kind?: string): void; translate(p: P, e?: { clientX: number; clientY: number } | null, noRu?: boolean): void;
  answer(q: Question, given: string, ok: boolean, who?: MemberId): void; learn(es: string, ru: string, ok?: boolean, who?: MemberId): void; coins(n: number, who?: MemberId): void; give(item: string, n?: number, who?: MemberId): void; achieve(id: string, p: P, who?: MemberId): void; daily(id: string, n?: number): void;
}
const KEY = 'familia-adventure-v1';
export const load = (): Partial<S> => { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; } };
const L = load();
const profiles = {} as Record<MemberId, Profile>;
MEMBERS.forEach(m => profiles[m.id] = { ...newProfile(), ...(L.profiles?.[m.id] ?? {}) });
let tid = 0;
export const useStore = create<S>((set, get) => ({
  profiles, family: { ...newFamily(), ...(L.family ?? {}) }, settings: { sound: .7, ambient: .4, voice: 1, rate: .95, quality: 'auto', autoSpeak: true, sens: 1, ...(L.settings ?? {}) },
  me: L.me ?? 'elena', mode: L.mode ?? 'solo', seats: L.seats ?? ['elena'], started: !!L.started, screen: { k: 'title' }, back: { k: 'city' }, paused: false, toasts: [], card: null, pos: null,
  go: s => set(st => ({ screen: s, back: st.screen.k === 'city' || st.screen.k === 'room' ? st.screen : st.back, paused: false, card: null })),
  set: p => set(p),
  prof: (id, f) => set(s => { const p = structuredClone(s.profiles[id]); f(p); return { profiles: { ...s.profiles, [id]: p } }; }),
  fam: f => set(s => { const x = structuredClone(s.family); f(x); return { family: x }; }),
  setting: p => set(s => ({ settings: { ...s.settings, ...p } })),
  toast: (p, kind = 'info') => { const id = ++tid; set(s => ({ toasts: [...s.toasts.slice(-2), { id, p, kind }] })); setTimeout(() => set(s => ({ toasts: s.toasts.filter(t => t.id !== id) })), 4200); },
  translate: (p, e, noRu) => set({ card: { p, x: e?.clientX ?? innerWidth / 2, y: e?.clientY ?? innerHeight * .7, noRu } }),
  answer: (q, given, ok, who = get().me) => {
    get().prof(who, p => {
      p.total++; if (ok) { p.correct++; p.streak++; p.coins += 2; } else p.streak = 0;
      const key = q.word ?? q.answer; if (key.length < 60 && !/[а-я]/i.test(key)) { const w = p.words[key] ?? (p.words[key] = { ok: 0, bad: 0, ru: q.answerRu }); ok ? w.ok++ : w.bad++; }
      const i = p.mistakes.findIndex(m => m.id === q.id);
      if (!ok) { if (i >= 0) { p.mistakes[i].n++; p.mistakes[i].given = given; p.mistakes[i].t = Date.now(); } else p.mistakes.unshift({ id: q.id, q, given, n: 1, t: Date.now() }); p.mistakes = p.mistakes.slice(0, 120); }
      else if (i >= 0 && --p.mistakes[i].n <= 0) p.mistakes.splice(i, 1);
    });
    if (ok) get().daily('correct');
    const p = get().profiles[who];
    if (p.correct >= 1) get().achieve('first', ['Primera respuesta', 'Первый правильный ответ'], who);
    if (p.correct >= 100) get().achieve('c100', ['Cien respuestas', 'Сто правильных ответов'], who);
    if (p.streak >= 10) get().achieve('s10', ['Racha de diez', 'Серия из десяти'], who);
    if (Object.values(p.words).filter(w => w.ok >= 3).length >= 50) get().achieve('w50', ['Cincuenta palabras', 'Пятьдесят выученных слов'], who);
    if (p.total >= 60 && p.total % 30 === 0 && p.correct / p.total > .85 && p.level !== 'B1') { const nl: Level = p.level === 'A1' ? 'A2' : 'B1'; if (Object.values(p.words).filter(w => w.ok >= 2).length >= (nl === 'A2' ? 40 : 110)) { get().prof(who, x => { x.level = nl; }); get().toast([`¡Nuevo nivel: ${nl}!`, `Новый уровень: ${nl}!`], 'gold'); } }
  },
  learn: (es, ru, ok = true, who = get().me) => get().prof(who, p => { const w = p.words[es] ?? (p.words[es] = { ok: 0, bad: 0, ru }); ok ? w.ok++ : w.bad++; }),
  coins: (n, who = get().me) => get().prof(who, p => { p.coins = Math.max(0, p.coins + n); }),
  give: (item, n = 1, who = get().me) => get().prof(who, p => { p.inv[item] = Math.max(0, (p.inv[item] ?? 0) + n); }),
  achieve: (id, p, who = get().me) => { if (get().profiles[who].ach.includes(id)) return; get().prof(who, x => { x.ach.push(id); x.coins += 20; }); get().toast([`Logro: ${p[0]}`, `Достижение: ${p[1]}`], 'gold'); },
  daily: (id, n = 1) => get().fam(f => { if (f.daily.date !== today()) f.daily = { date: today(), n: {}, claimed: [] }; f.daily.n[id] = (f.daily.n[id] ?? 0) + n; }),
}));
let timer: ReturnType<typeof setTimeout> | undefined;
export const snapshot = () => { const { profiles, family, settings, me, mode, seats, started } = useStore.getState(); return { profiles, family, settings, me, mode, seats, started }; };
export const saveNow = () => { try { localStorage.setItem(KEY, JSON.stringify(snapshot())); } catch { /* приватный режим */ } };
useStore.subscribe(() => { clearTimeout(timer); timer = setTimeout(saveNow, 400); });
if (typeof window !== 'undefined') { addEventListener('pagehide', saveNow); (window as unknown as Record<string, unknown>).__store = useStore; }
export const st = () => useStore.getState();
