import { useMemo, useState } from 'react';
import type { GameProps } from '../types';
import { Btn, Es } from '../../ui/kit';
import { wordsFor } from '../../core/question';
import { THEMES, noArt, strip, propKey } from '../../data/vocab';
import { hasProp, thumb } from '../../three/props';
import { sample } from '../../core/util';
import { sfx } from '../../core/audio';
import { speak } from '../../core/speech';
import { st } from '../../core/store';
export default function Adivina({ level, finish }: GameProps) {
  const ws = useMemo(() => sample(wordsFor(level).filter(w => !noArt(w.es).includes(' ') && noArt(w.es).length >= 3), 4), []); const [i, setI] = useState(0), [g, setG] = useState<string[]>([]), [bad, setBad] = useState(0), [tot, setTot] = useState(0); const w = ws[i], ans = strip(noArt(w.es)).toUpperCase(); const lost = bad >= 6, won = [...ans].every(c => g.includes(c));
  const next = (ok: boolean) => { const s = tot + (ok ? 25 - bad * 2 : 0); setTot(s); st().learn(w.es, w.ru, ok); if (i + 1 >= ws.length) finish({ score: s }); else { setI(i + 1); setG([]); setBad(0); } };
  return <div className="board2d" style={{ ['--bg' as string]: '#3a2f58' }}><div className="side" style={{ width: 'min(640px,100%)' }}><Es p={[`Palabra ${i + 1} de ${ws.length} · Tema: ${w.theme}`, `Слово ${i + 1} из ${ws.length} · Тема: ${THEMES[w.theme]}`]} className="q-title" />{bad >= 3 && hasProp(propKey(w.es)) && <img src={thumb(propKey(w.es))} width={90} height={90} alt="" />}{bad >= 4 && <p>Подсказка: {w.ru}</p>}<div className="row" style={{ justifyContent: 'center', gap: 6 }}>{[...ans].map((c, k) => <span key={k} style={{ width: 36, height: 46, borderBottom: '4px solid #1f2a44', display: 'grid', placeItems: 'center', fontSize: 28, fontWeight: 800 }}>{g.includes(c) || lost ? c : ''}</span>)}</div><div className="row" style={{ justifyContent: 'center' }}>{Array.from({ length: 6 }, (_, k) => <i key={k} style={{ width: 16, height: 16, borderRadius: 8, background: k < bad ? '#c0392b' : '#cfd8c9' }} />)}</div>{won || lost ? <div className={'q-res ' + (won ? 'good' : 'wrong')}><b>{w.es}</b> — {w.ru}<div><Btn kind="main" p={['Siguiente', 'Дальше']} onClick={() => next(won)} /></div></div> : <div className="row" style={{ justifyContent: 'center', gap: 4 }}>{[...'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'].map(c => <button key={c} type="button" className="tile" disabled={g.includes(c)} onClick={() => { const n = [...g, c]; setG(n); if (ans.includes(c)) { sfx('pop'); if ([...ans].every(x => n.includes(x))) { sfx('win'); speak(w.es); } } else { sfx('bad'); setBad(bad + 1); } }}>{c}</button>)}</div>}</div></div>;
}
