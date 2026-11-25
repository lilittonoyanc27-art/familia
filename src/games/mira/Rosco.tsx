import { useEffect, useMemo, useRef, useState } from 'react';
import type { GameProps } from '../types';
import { Btn, Es, Say, useTick } from '../../ui/kit';
import { wordsFor } from '../../core/question';
import { WORDS, noArt, strip } from '../../data/vocab';
import { pick } from '../../core/util';
import { sfx } from '../../core/audio';
import { speak } from '../../core/speech';
import { st } from '../../core/store';
const AB = 'ABCDEFGHIJLMNOPRSTUVZ';
export default function Rosco({ level, finish }: GameProps) {
  const items = useMemo(() => [...AB].map(l => { const pool = wordsFor(level).filter(w => strip(noArt(w.es))[0]?.toUpperCase() === l && !noArt(w.es).includes(' ')); const any = WORDS.filter(w => strip(noArt(w.es))[0]?.toUpperCase() === l && !noArt(w.es).includes(' ')); const c = pick(pool.length ? pool : any.length ? any : WORDS.filter(w => strip(noArt(w.es)).toUpperCase().includes(l))); const ans = noArt(c.es); return { l, w: c, ans, start: strip(ans)[0].toUpperCase() === l }; }), []);
  const T = level === 'A1' ? 240 : 200; const [st0, setSt] = useState<('?' | 'ok' | 'no')[]>(items.map(() => '?')), [i, setI] = useState(0), [txt, setTxt] = useState(''), [left, setLeft] = useState(T), [fb, setFb] = useState(''); const done = useRef(false);
  const fin = (s = st0) => { if (done.current) return; done.current = true; finish({ score: s.filter(x => x === 'ok').length / items.length * 100 }); };
  useTick(1000, () => setLeft(l => { if (l <= 1) { fin(); return 0; } return l - 1; }), !done.current);
  useEffect(() => { const it = items[i]; speak(`${it.start ? 'Empieza por' : 'Contiene la'} ${it.l}`); }, [i]);
  const nextI = (s: typeof st0) => { for (let k = 1; k <= items.length; k++) { const j = (i + k) % items.length; if (s[j] === '?') { setI(j); return; } } fin(s); };
  const send = (pass = false) => { const it = items[i]; const s = [...st0]; if (!pass) { const ok = strip(txt.trim()) === strip(it.ans); s[i] = ok ? 'ok' : 'no'; sfx(ok ? 'ok' : 'bad'); st().learn(it.w.es, it.w.ru, ok); setFb(ok ? '' : `«${it.w.ru}» — ${it.ans}`); if (ok) speak(it.ans); } else { sfx('pop'); speak('Pasapalabra'); } setSt(s); setTxt(''); nextI(s); };
  const it = items[i];
  return <div className="board2d" style={{ ['--bg' as string]: '#1f3a5c' }}><svg viewBox="0 0 400 400" style={{ width: 'min(440px,94vw)' }}>{items.map((x, k) => { const a = k / items.length * 6.283 - 1.571, cx = 200 + Math.cos(a) * 170, cy = 200 + Math.sin(a) * 170; return <g key={k}><circle cx={cx} cy={cy} r="21" fill={st0[k] === 'ok' ? '#2f9d5a' : st0[k] === 'no' ? '#c0392b' : k === i ? '#f0c040' : '#3f78b5'} stroke="#fff" strokeWidth="2" /><text x={cx} y={cy + 7} textAnchor="middle" fill="#fff" fontWeight="800" fontSize="20">{x.l}</text></g>; })}<text x="200" y="195" textAnchor="middle" fill="#fff" fontSize="56" fontFamily="Yeseva One">{left}</text><text x="200" y="232" textAnchor="middle" fill="#cfe2f2" fontSize="16">{st0.filter(x => x === 'ok').length} ✓</text></svg><div className="side"><Es p={[`${it.start ? 'Empieza por' : 'Contiene la'} ${it.l}:`, `${it.start ? 'Начинается на' : 'Содержит букву'} ${it.l}:`]} className="q-title" /><div style={{ fontSize: 23, fontWeight: 800 }}>{it.w.ru}</div>{level === 'A1' && <small className="mut">{it.ans.length} букв · {it.ans[0]}…</small>}<input value={txt} onChange={e => setTxt(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && txt) send(); }} aria-label="Ответ" lang="es" autoFocus /><div className="row"><Btn kind="main" disabled={!txt} p={['Responder', 'Ответить']} onClick={() => send()} /><Btn p={['Pasapalabra', 'Пропустить слово']} onClick={() => send(true)} /></div>{fb && <p className="q-res wrong">{fb}</p>}<Btn small p={['Plantarse', 'Остановиться']} onClick={() => fin()} /></div></div>;
}
void Say;
