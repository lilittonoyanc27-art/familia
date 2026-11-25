import { useMemo, useState } from 'react';
import type { GameProps } from '../types';
import { Es } from '../../ui/kit';
import { memberOf } from '../../core/types';
import { wordsFor } from '../../core/question';
import { hasProp, thumb } from '../../three/props';
import { propKey } from '../../data/vocab';
import { sample, shuffle } from '../../core/util';
import { sfx } from '../../core/audio';
import { speak } from '../../core/speech';
import { st } from '../../core/store';
export default function Memoria({ seats, level, finish }: GameProps) {
  const n = level === 'A1' ? 6 : level === 'A2' ? 8 : 10; const cards = useMemo(() => { const used = new Set<string>(); const ws = shuffle(wordsFor(level)).filter(w => { const k = propKey(w.es); if (!hasProp(k) || used.has(k)) return false; used.add(k); return true; }).slice(0, n); return shuffle(ws.flatMap((w, i) => [{ i, w, img: true }, { i, w, img: false }])); }, []); const [open, setOpen] = useState<number[]>([]), [got, setGot] = useState<number[]>([]), [t, setT] = useState(0), [sc, setSc] = useState(seats.map(() => 0)), [tries, setTries] = useState(0); const nm = (i: number) => { const s = seats[i]; return s.kind === 'm' ? memberOf(s.id).es : s.name; };
  const flip = (k: number) => { if (open.length >= 2 || open.includes(k) || got.includes(cards[k].i)) return; const o = [...open, k]; setOpen(o); sfx('click'); speak(cards[k].w.es); if (o.length === 2) { setTries(tries + 1); const [a, b] = o.map(x => cards[x]); if (a.i === b.i) { setTimeout(() => { sfx('ok'); st().learn(a.w.es, a.w.ru); const g = [...got, a.i], s = sc.map((v, i) => i === t ? v + 1 : v); setGot(g); setSc(s); setOpen([]); if (g.length === n) { const mx = Math.max(...s); finish(seats.length > 1 && s.filter(v => v === mx).length === 1 ? { score: 100, winner: s.indexOf(mx) } : { score: Math.min(100, 150 - (tries + 1) / n * 35) }); } }, 600); } else setTimeout(() => { setOpen([]); setT((t + 1) % seats.length); }, 1300); } };
  return <div className="board2d" style={{ ['--bg' as string]: '#4a3a5c' }}><div className="cells" style={{ gridTemplateColumns: `repeat(${n > 8 ? 5 : 4},1fr)`, width: 'min(640px,96vw)', gap: 8 }}>{cards.map((c, k) => { const up = open.includes(k) || got.includes(c.i); return <button key={k} type="button" className="cell" aria-label={up ? c.w.es : 'Карта'} style={{ background: up ? '#fff' : 'repeating-linear-gradient(45deg,#7a3f78,#7a3f78 8px,#8b5089 8px,#8b5089 16px)', opacity: got.includes(c.i) ? .55 : 1, padding: 4, fontSize: 'clamp(11px,2.4vw,17px)', overflow: 'hidden' }} onClick={() => flip(k)}>{up && (c.img ? <img src={thumb(propKey(c.w.es))} alt={c.w.es} /> : <span>{c.w.es}</span>)}</button>; })}</div><div className="side">{seats.map((_, i) => <div key={i} className="row sp" style={{ fontWeight: i === t ? 800 : 500 }}><span>{nm(i)}</span><b>{sc[i]}</b></div>)}<Es p={[`Es el turno de ${nm(t)}`, `Ход: ${nm(t)}`]} />{got.map(g => { const w = cards.find(c => c.i === g)!.w; return <Es key={g} p={[w.es, w.ru]} />; })}</div></div>;
}
