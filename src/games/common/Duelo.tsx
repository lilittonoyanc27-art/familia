import { useRef, useState } from 'react';
import type { GameProps } from '../types';
import { Bar, Es, QuestionCard, useTick } from '../../ui/kit';
import { makeQuestion, type QKind } from '../../core/question';
import { pick } from '../../core/util';
const gen = (l: GameProps['level']) => makeQuestion(l, undefined, pick<QKind>(['es-ru', 'ru-es', 'listen', 'reply', 'cloze', 'verb']));
export default function Duelo({ level, finish }: GameProps) { const T = 75; const [q, setQ] = useState(() => gen(level)), [n, setN] = useState(0), [left, setLeft] = useState(T), [combo, setC] = useState(0); const pts = useRef(0); useTick(100, () => setLeft(l => { if (l <= .1) { finish({ score: pts.current }); return 0; } return l - .1; }), left > 0);
  return <div className="board2d" style={{ ['--bg' as string]: '#7a3f78' }}><div className="side" style={{ width: 'min(620px,100%)', maxHeight: 'none' }}><Bar v={left / T} /><div className="row sp"><Es p={[`Puntos: ${Math.round(pts.current)}`, `Очки: ${Math.round(pts.current)}`]} as="b" /><Es p={[`Racha: ${combo}`, `Серия: ${combo}`]} /></div><QuestionCard key={n} q={q} onDone={ok => { if (ok) { pts.current += 7 + Math.min(5, combo); setC(combo + 1); } else setC(0); setN(n + 1); setQ(gen(level)); }} /></div></div>; }
