import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { useStore, st } from '../core/store';
import { speak, canListen, listen, similarity } from '../core/speech';
import { sfx } from '../core/audio';
import { lookup, norm, tokens } from '../core/lex';
import type { MemberId, P } from '../core/types';
import { memberOf } from '../core/types';
import type { Question } from '../core/question';
const I: Record<string, string> = {
  sound: 'M4 9v6h4l5 4V5L8 9zM16 8a5 5 0 0 1 0 8M18.5 5.5a9 9 0 0 1 0 13', slow: 'M3 16c0-5 4-8 8-8s7 3 7 8H3zM18 13l3-1v3l-3 1M6 16v3M15 16v3', back: 'M15 5l-7 7 7 7', close: 'M6 6l12 12M18 6L6 18', map: 'M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2zM9 4v14M15 6v14', menu: 'M4 6h16M4 12h16M4 18h16', pause: 'M8 5v14M16 5v14', play: 'M7 5l12 7-12 7z', redo: 'M4 12a8 8 0 1 1 2.5 5.8M4 20v-5h5', full: 'M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5', star: 'M12 3l2.7 5.8 6.3.8-4.6 4.3 1.2 6.3L12 17l-5.6 3.2 1.2-6.3L3 9.6l6.3-.8z', coin: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM14.5 9a3.5 3.5 0 1 0 0 6M8 11h5M8 13h5', mic: 'M12 3a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM6 11a6 6 0 0 0 12 0M12 17v4', cup: 'M7 4h10v5a5 5 0 0 1-10 0zM7 6H4c0 4 2 5 3 5M17 6h3c0 4-2 5-3 5M12 14v4M8 20h8', book: 'M4 5c3-1 6-1 8 1 2-2 5-2 8-1v14c-3-1-6-1-8 1-2-2-5-2-8-1zM12 6v14', gear: 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3', bag: 'M5 8h14l1 13H4zM9 8a3 3 0 0 1 6 0', user: 'M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM4 21c1-5 4-7 8-7s7 2 8 7', users: 'M9 5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM2 20c1-4 3-6 7-6s6 2 7 6M16 5a3 3 0 0 1 0 6M18 14c3 1 4 3 4 6', game: 'M7 8h10a5 5 0 0 1 5 5c0 5-4 6-6 3H8c-2 3-6 2-6-3a5 5 0 0 1 5-5zM7 11v4M5 13h4M16 12h.1M18 14h.1', flag: 'M5 21V4h13l-3 4 3 4H5', home: 'M3 11l9-8 9 8M6 10v10h12V10', chat: 'M4 5h16v11H10l-5 4v-4H4z', list: 'M9 6h11M9 12h11M9 18h11M4 6h.1M4 12h.1M4 18h.1', jump: 'M6 15l6-6 6 6', hand: 'M8 12V6a1.5 1.5 0 0 1 3 0v5V4.5a1.5 1.5 0 0 1 3 0V11V6a1.5 1.5 0 0 1 3 0v9c0 4-2 6-5 6s-5-1-7-5l-2-4c1-1 2-1 3 0z', check: 'M5 13l4 4L19 7', cal: 'M4 6h16v15H4zM4 10h16M8 3v4M16 3v4', dice: 'M5 5h14v14H5zM9 9h.1M15 15h.1M12 12h.1', clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 3', shop: 'M4 9l2-5h12l2 5M4 9v11h16V9M4 9c0 3 4 3 4 0 0 3 4 3 4 0 0 3 4 3 4 0 0 3 4 3 4 0',
};
export const Icon = ({ n, s = 20 }: { n: string; s?: number }) => <svg className="ico" width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={I[n] ?? I.star} /></svg>;
/** Кликабельный испанский текст: клик открывает перевод и озвучку. */
export const Es = ({ p, className = '', as: T = 'span', noRu, style }: { p: P; className?: string; as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'b' | 'div'; noRu?: boolean; style?: CSSProperties }) => (
  <T className={'es ' + className} style={style} role="button" tabIndex={0} title="Перевод" onClick={e => { e.stopPropagation(); st().translate(p, e, noRu); if (st().settings.autoSpeak) speak(p[0]); }} onKeyDown={e => { if (e.key === 'Enter') { e.stopPropagation(); st().translate(p, null, noRu); } }}>{p[0]}</T>);
/** Кнопка с испанской подписью; «RU» рядом открывает перевод, не нажимая саму кнопку. */
export function Btn({ p, onClick, icon, kind = '', disabled, small, style }: { p: P; onClick?: () => void; icon?: string; kind?: string; disabled?: boolean; small?: boolean; style?: CSSProperties }) {
  return <span className={`btn ${kind} ${small ? 'small' : ''} ${disabled ? 'off' : ''}`} style={style}><button type="button" disabled={disabled} onClick={e => { e.stopPropagation(); sfx('click'); onClick?.(); }}>{icon && <Icon n={icon} s={small ? 16 : 19} />}<span>{p[0]}</span></button><button type="button" className="ru" aria-label={'Перевод: ' + p[1]} onClick={e => { e.stopPropagation(); st().translate(p, e); }}>RU</button></span>;
}
export const IconBtn = ({ n, label, onClick, on }: { n: string; label: string; onClick: () => void; on?: boolean }) => <button type="button" className={'iconbtn' + (on ? ' on' : '')} aria-label={label} title={label} onClick={e => { e.stopPropagation(); sfx('click'); onClick(); }}><Icon n={n} /></button>;
export const Say = ({ t, s = 20 }: { t: string; s?: number }) => <span className="say"><button type="button" aria-label="Слушать" title="Слушать" onClick={e => { e.stopPropagation(); speak(t); }}><Icon n="sound" s={s} /></button><button type="button" aria-label="Слушать медленно" title="Медленно" onClick={e => { e.stopPropagation(); speak(t, true); }}><Icon n="slow" s={s} /></button></span>;
export function TransCard() {
  const c = useStore(s => s.card); const [w, setW] = useState<[string, string] | null>(null);
  useEffect(() => setW(null), [c]);
  useEffect(() => { if (!c) return; const f = (e: KeyboardEvent) => { if (e.key === 'Escape') { e.stopPropagation(); useStore.setState({ card: null }); } }; addEventListener('keydown', f, true); return () => removeEventListener('keydown', f, true); }, [c]);
  if (!c) return null;
  const W = Math.min(350, innerWidth - 24), x = Math.max(12, Math.min(innerWidth - W - 12, c.x - W / 2)), up = c.y > innerHeight * .55;
  return <div className="tcard-bg" onClick={() => useStore.setState({ card: null })}><div className="tcard" style={{ width: W, left: x, ...(up ? { bottom: Math.max(12, innerHeight - c.y + 14) } : { top: c.y + 16 }) }} onClick={e => e.stopPropagation()}>
    <div className="tc-es">{tokens(c.p[0]).map((t, i) => { const r = lookup(t); return <span key={i} className={r ? 'tw' : ''} onClick={() => { speak(t); if (r) { setW([t.replace(/[^\p{L}]/gu, ''), r]); st().learn(t.replace(/[^\p{L}]/gu, '').toLowerCase(), r); } }}>{t} </span>; })}</div>
    {!c.noRu && <div className="tc-ru">{c.p[1]}</div>}{w && <div className="tc-w"><b>{w[0]}</b> — {w[1]}</div>}
    <div className="tc-row"><Say t={c.p[0]} s={22} /><small>Нажми на слово — его перевод</small></div></div></div>;
}
export const Toasts = () => { const t = useStore(s => s.toasts); return <div className="toasts" aria-live="polite">{t.map(x => <div key={x.id} className={'toast ' + x.kind}><Es p={x.p} /></div>)}</div>; };
export const Panel = ({ title, onClose, children, wide }: { title?: P; onClose?: () => void; children: ReactNode; wide?: boolean }) => <div className={'panel' + (wide ? ' wide' : '')}>{(title || onClose) && <div className="panel-h">{title && <Es p={title} as="h2" />}{onClose && <IconBtn n="close" label="Закрыть" onClick={onClose} />}</div>}{children}</div>;
export const Modal = (p: { title?: P; onClose?: () => void; children: ReactNode; wide?: boolean }) => <div className="modal" onPointerDown={e => e.stopPropagation()}><Panel {...p} /></div>;
export const Face = ({ id, s = 46 }: { id: MemberId; s?: number }) => { const hair = { elena: '#5b3320', alejandro: '#2b2320', lev: '#c48a45', mira: '#3a2418' }[id], c = memberOf(id).color, long = id === 'elena' || id === 'mira';
  return <svg width={s} height={s} viewBox="0 0 48 48" aria-hidden><circle cx="24" cy="24" r="24" fill={c} /><path d="M8 48c1-10 8-13 16-13s15 3 16 13z" fill="#fff" opacity=".85" />{long && <path d="M11 22c0-20 26-20 26 0v16H11z" fill={hair} />}<rect x="20" y="28" width="8" height="10" rx="4" fill="#e3aa83" /><ellipse cx="24" cy="23" rx="9.5" ry="11" fill="#f2c09a" />{id !== 'alejandro' && <path d={id === 'lev' ? 'M13 21l2-10 4 3 4-6 4 6 5-3 3 10c-4-5-18-5-22 0z' : 'M13 22c0-16 22-16 22 0-2-6-6-8-12-9-3 4-7 6-10 9z'} fill={hair} />}{id === 'alejandro' && <ellipse cx="20" cy="15" rx="3" ry="1.6" fill="#fff" opacity=".35" />}<circle cx="20" cy="23" r="1.5" fill="#26303f" /><circle cx="28" cy="23" r="1.5" fill="#26303f" /><path d="M20 28c2 2.4 6 2.4 8 0" stroke="#a24d3c" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>; };
/** Универсальная карточка языкового задания с объяснением ошибки на русском. */
export function QuestionCard({ q, onDone, who, compact }: { q: Question; onDone: (ok: boolean) => void; who?: MemberId; compact?: boolean }) {
  const [given, setGiven] = useState<string | null>(null), [seq, setSeq] = useState<number[]>([]), [txt, setTxt] = useState(''), [rec, setRec] = useState('');
  const done = useRef(false);
  useEffect(() => { done.current = false; setGiven(null); setSeq([]); setTxt(''); setRec(''); if (q.say && st().settings.autoSpeak && q.kind !== 'speak') speak(q.say); }, [q]);
  const judge = (g: string, ok = norm(g) === norm(q.answer)) => { if (done.current) return; done.current = true; setGiven(g || '—'); sfx(ok ? 'ok' : 'bad'); st().answer(q, g, ok, who); if (ok && !/[а-я]/i.test(q.answer) && st().settings.autoSpeak) speak(q.kind === 'cloze' || q.kind === 'verb' ? q.prompt![0].replace('___', q.answer).replace(/\(.+?\)/, '') : q.answer); };
  const ok = given !== null && (q.kind === 'speak' ? similarity(given, q.answer) > .72 : norm(given) === norm(q.answer));
  const isRu = q.kind === 'es-ru' || q.kind === 'listen';
  return <div className={'q' + (compact ? ' compact' : '')}>
    <Es p={q.title} className="q-title" />
    {q.prompt && q.prompt[0] && <div className="q-prompt"><Es p={q.kind === 'es-ru' && given === null ? [q.prompt[0], ''] : q.prompt} noRu={q.kind === 'es-ru' && given === null} /><Say t={q.prompt[0]} /></div>}
    {q.prompt && !q.prompt[0] && <div className="q-ru">{q.prompt[1]}</div>}
    {q.kind === 'verb' && <div className="q-hint">{q.prompt![1]}</div>}
    {q.kind === 'listen' && <div className="q-listen"><Say t={q.say!} s={34} /></div>}
    {q.options && <div className="q-opts">{q.options.map(o => <button key={o} type="button" disabled={given !== null} className={given !== null ? (norm(o) === norm(q.answer) ? 'good' : o === given ? 'wrong' : '') : ''} onClick={() => judge(o)} lang={isRu ? 'ru' : 'es'}>{o}</button>)}</div>}
    {q.tiles && <><div className="q-line">{seq.map((i, k) => <button key={i} type="button" className="tile" disabled={given !== null} onClick={() => setSeq(seq.filter((_, j) => j !== k))}>{q.tiles![i]}</button>)}</div><div className="q-tiles">{q.tiles.map((t, i) => <button key={i} type="button" className="tile" disabled={given !== null || seq.includes(i)} onClick={() => { sfx('click'); setSeq([...seq, i]); }}>{t}</button>)}</div>{given === null && <Btn p={['Comprobar', 'Проверить']} disabled={seq.length !== q.tiles.length} onClick={() => judge(seq.map(i => q.tiles![i]).join(' '))} />}</>}
    {q.kind === 'speak' && given === null && <div className="q-speak">{canListen && <Btn icon="mic" kind="main" p={rec ? ['Escuchando…', 'Слушаю…'] : ['Hablar', 'Говорить']} onClick={() => { setRec('…'); listen().then(a => { const b = a.sort((x, y) => similarity(y, q.answer) - similarity(x, q.answer))[0]; judge(b, similarity(b, q.answer) > .72); }).catch(() => { setRec(''); st().toast(['No te he oído. Escribe la frase.', 'Не расслышал. Напиши фразу.']); }); }} />}<input value={txt} onChange={e => setTxt(e.target.value)} placeholder="…" lang="es" aria-label="Напиши фразу" /><Btn p={['Comprobar', 'Проверить']} disabled={!txt} onClick={() => judge(txt, similarity(txt, q.answer) > .85)} /></div>}
    {given !== null && <div className={'q-res ' + (ok ? 'good' : 'wrong')}>{ok ? <Es p={['¡Muy bien!', 'Отлично!']} as="b" /> : <><Es p={['Casi…', 'Почти…']} as="b" /><p lang="ru">{q.why}</p></>}<Btn kind="main" p={['Continuar', 'Продолжить']} onClick={() => onDone(ok)} /></div>}
  </div>;
}
export type Line = readonly [who: string, es: string, ru: string] | { ask: readonly (readonly [es: string, ru: string, ok: boolean])[]; why: string };
/** Диалог: реплики по очереди + выбор игрока. Неверный выбор объясняется, затем можно попробовать ещё раз. */
export function Dialogue({ lines, onDone, me, pitch = 1 }: { lines: readonly Line[]; onDone: (score: number) => void; me: string; pitch?: number }) {
  const [i, setI] = useState(0), [err, setErr] = useState<string | null>(null), [bad, setBad] = useState<string[]>([]); const total = useRef(0), good = useRef(0), box = useRef<HTMLDivElement>(null); const [log, setLog] = useState<[string, string, string][]>([]);
  const L = lines[i]; const isLine = Array.isArray(L);
  useEffect(() => { const l = lines[i]; if (!l) return; if (Array.isArray(l)) { const who = l[0] === 'me' ? me : l[0]; setLog(g => [...g, [who, l[1], l[2]]]); if (st().settings.autoSpeak) speak(l[1], false, pitch); } setErr(null); setBad([]); }, [i, lines]);
  useEffect(() => box.current?.scrollTo(0, 9e9), [log, err]);
  const opts = useMemo(() => (L && !isLine ? [...(L as { ask: readonly (readonly [string, string, boolean])[] }).ask].sort(() => Math.random() - .5) : []), [i, lines]);
  const next = () => { if (i + 1 >= lines.length) onDone(total.current ? Math.round(good.current / total.current * 100) : 100); else setI(i + 1); };
  return <div className="dlg"><div className="dlg-log" ref={box}>{log.map((l, k) => <div key={k} className={'bub ' + (l[0] === me ? 'me' : '')}><b>{l[0]}</b><Es p={[l[1], l[2]]} /><Say t={l[1]} s={17} /></div>)}</div>
    {isLine ? <div className="dlg-a"><Btn kind="main" p={i + 1 >= lines.length ? ['Terminar', 'Завершить'] : ['Siguiente', 'Дальше']} onClick={next} /></div> : <div className="dlg-a"><Es p={['¿Qué respondes?', 'Что ты ответишь?']} className="q-title" />{opts.map(o => <Btn key={o[0]} p={[o[0], o[1]]} disabled={bad.includes(o[0])} onClick={() => { if (!bad.length) total.current++; if (o[2]) { if (!bad.length) good.current++; sfx('ok'); st().learn(o[0], o[1]); st().coins(1); st().daily('talk'); setLog(g => [...g, [me, o[0], o[1]]]); speak(o[0]); next(); } else { sfx('bad'); setBad([...bad, o[0]]); setErr((L as { why: string }).why); st().learn((L as { ask: readonly (readonly [string, string, boolean])[] }).ask.find(x => x[2])![0], (L as { ask: readonly (readonly [string, string, boolean])[] }).ask.find(x => x[2])![1], false); } }} />)}{err && <p className="q-res wrong" lang="ru">{err}</p>}</div>}
  </div>;
}
export const Bar = ({ v, c }: { v: number; c?: string }) => <div className="bar"><i style={{ width: `${Math.max(0, Math.min(1, v)) * 100}%`, background: c }} /></div>;
export function useTick(ms: number, f: () => void, on = true) { const r = useRef(f); r.current = f; const paused = useStore(s => s.paused); useEffect(() => { if (!on || paused) return; const t = setInterval(() => r.current(), ms); return () => clearInterval(t); }, [ms, on, paused]); }
