import { useEffect, useMemo, useState } from 'react';
import { Board3D } from './Board3D';
import { applyD, bestD, movesD, startD } from './checkers';
import type { GameProps } from '../types';
import { Btn, Es, Say } from '../../ui/kit';
import { memberOf, type P } from '../../core/types';
import { speak } from '../../core/speech';
import { sfx } from '../../core/audio';
import { numEs } from '../../core/util';
export default function Damas({ seats, level, finish }: GameProps) {
  const [b, setB] = useState(startD), [w, setW] = useState(true), [sel, setSel] = useState(-1), [last, setLast] = useState<number[]>([]), [end, setEnd] = useState<P | null>(null), [msg, setMsg] = useState<P>(['Empiezan las blancas.', 'Начинают белые.']), [quiet, setQuiet] = useState(0); const ms = useMemo(() => movesD(b, w), [b, w]); const s = seats[w ? 0 : 1], lvl = level === 'A1' ? 0 : level === 'A2' ? 1 : 2, cpu = seats[1].kind === 'cpu'; const nm = s.kind === 'm' ? memberOf(s.id).es : s.name; const say = (p: P) => { setMsg(p); speak(p[0]); };
  const play = (m: typeof ms[0]) => { const n = applyD(b, m), t = m.path[m.path.length - 1]; setB(n); setLast([m.path[0], t]); setSel(-1); sfx(m.caps.length ? 'hit' : 'place'); const q = m.caps.length ? 0 : quiet + 1; setQuiet(q); if (Math.abs(n[t]) === 2 && Math.abs(b[m.path[0]]) === 1) say(['¡Dama!', 'Дамка!']); else if (m.caps.length) say([`Captura ${m.caps.length === 1 ? 'una ficha' : numEs(m.caps.length) + ' fichas'}.`, `Взято шашек: ${m.caps.length}.`]); if (!movesD(n, !w).length) { const e: P = [`¡Ganan las ${w ? 'blancas' : 'negras'}!`, `Победили ${w ? 'белые' : 'чёрные'}!`]; setEnd(e); speak(e[0]); setTimeout(() => finish({ score: 100, winner: w ? 0 : 1 }), 1800); return; } if (q > 50) { setEnd(['Tablas.', 'Ничья.']); setTimeout(() => finish({ score: 60 }), 1500); return; } setW(!w); };
  useEffect(() => { if (s.kind !== 'cpu' || end) return; const t = setTimeout(() => { const m = bestD(b, w, lvl); if (m) play(m); }, 600); return () => clearTimeout(t); }, [w, end]);
  const tap = (i: number) => { if (end || s.kind === 'cpu') return; if (sel >= 0) { const c = ms.filter(m => m.path[0] === sel && m.path[m.path.length - 1] === i); if (c.length) return play(c.sort((x, y) => y.caps.length - x.caps.length)[0]); } if (b[i] * (w ? 1 : -1) > 0) { setSel(i); if (!ms.some(m => m.path[0] === i)) say(ms[0]?.caps.length ? ['Es obligatorio capturar.', 'Взятие обязательно.'] : ['Esta ficha no puede mover.', 'Эта шашка не может ходить.']); } };
  const pcs = useMemo(() => [...b].map(v => v ? { k: Math.abs(v) === 2 ? 'E' : 'D', w: v > 0 } : null), [b]); const tg = useMemo(() => ms.filter(m => m.path[0] === sel).map(m => m.path[m.path.length - 1]), [sel, ms]);
  return <Board3D pieces={pcs} sel={sel} targets={tg} last={last} flip={!cpu && !w} onTap={tap} light="#f0e0c2" dark="#50748a" a="#f6efe0" b="#b5403a"><div className="goal"><Es p={end ?? [`Turno: ${nm}`, `Ход: ${nm}`]} as="h3" /><div><Es p={msg} /> <Say t={msg[0]} s={16} /></div><div className="mut">{[...b].filter(x => x > 0).length} : {[...b].filter(x => x < 0).length}</div><Btn small p={['Rendirse', 'Сдаться']} onClick={() => finish({ score: 20, winner: w ? 1 : 0 })} /></div></Board3D>;
}
