import { useEffect, useRef, useState } from 'react';
import type { GameProps } from '../types';
import { Es, Modal, QuestionCard } from '../../ui/kit';
import { memberOf } from '../../core/types';
import { makeQuestion, type Question } from '../../core/question';
import { pick } from '../../core/util';
import { sfx } from '../../core/audio';
import { speak } from '../../core/speech';
const LN = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
export const winT = (b: number[]) => { for (const l of LN) if (b[l[0]] && b[l[0]] === b[l[1]] && b[l[0]] === b[l[2]]) return b[l[0]]; return 0; };
function mm(b: number[], p: number): number { const w = winT(b); if (w) return w === 2 ? 1 : -1; if (b.every(Boolean)) return 0; let r = p === 2 ? -2 : 2; b.forEach((v, i) => { if (v) return; b[i] = p; const s = mm(b, 3 - p); b[i] = 0; r = p === 2 ? Math.max(r, s) : Math.min(r, s); }); return r; }
export default function Tres({ seats, level, finish }: GameProps) {
  const [b, setB] = useState<number[]>(Array(9).fill(0)), [t, setT] = useState(1), [q, setQ] = useState<{ q: Question; c: number } | null>(null); const done = useRef(false); const s = seats[t - 1], nm = s.kind === 'm' ? memberOf(s.id).es : s.name;
  const set = (c: number) => { const n = [...b]; n[c] = t; setB(n); sfx('place'); chk(n); }; const chk = (n: number[]) => { const w = winT(n); if (w || n.every(Boolean)) { done.current = true; speak(w ? '¡Tres en raya!' : 'Empate'); setTimeout(() => finish(w ? { score: 100, winner: w - 1 } : { score: 60 }), 1300); } else setT(3 - t); };
  useEffect(() => { if (s.kind !== 'cpu' || done.current) return; const x = setTimeout(() => { const free = b.map((v, i) => v ? -1 : i).filter(i => i >= 0); let c = pick(free); if (Math.random() > (level === 'A1' ? .5 : .2)) { let bs = -3; free.forEach(i => { const n = [...b]; n[i] = 2; const r = mm(n, 1); if (r > bs) { bs = r; c = i; } }); } if (Math.random() < .15) { setT(1); return; } set(c); }, 900); return () => clearTimeout(x); }, [t]);
  return <div className="board2d" style={{ ['--bg' as string]: '#5a3a6a' }}><div className="cells" style={{ gridTemplateColumns: 'repeat(3,1fr)', width: 'min(440px,92vw)', gap: 10 }}>{b.map((v, i) => <button key={i} type="button" className="cell" aria-label={`Клетка ${i + 1}`} disabled={!!v || s.kind === 'cpu' || done.current} onClick={() => setQ({ q: makeQuestion(level), c: i })}><svg viewBox="0 0 40 40" width="76%">{v === 1 ? <path d="M9 9l22 22M31 9L9 31" stroke="#c8623f" strokeWidth="6" strokeLinecap="round" /> : v === 2 ? <circle cx="20" cy="20" r="12" fill="none" stroke="#23716d" strokeWidth="6" /> : null}</svg></button>)}</div><div className="side"><Es p={[`Es el turno de ${nm}`, `Ход: ${nm}`]} as="h2" /><Es p={['Responde bien para ocupar la casilla.', 'Ответь верно, чтобы занять клетку.']} as="p" /></div>{q && <Modal title={['Responde', 'Ответь']}><QuestionCard q={q.q} who={s.kind === 'm' ? s.id : undefined} onDone={ok => { const c = q.c; setQ(null); if (ok) set(c); else setT(3 - t); }} /></Modal>}</div>;
}
