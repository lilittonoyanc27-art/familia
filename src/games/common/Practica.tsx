import { useState } from 'react';
import type { GameProps } from '../types';
import { Bar, Btn, Es, QuestionCard } from '../../ui/kit';
import { makeQuestion, TITLES, type QKind, type Question } from '../../core/question';
import { THEMES, type Theme } from '../../data/vocab';
import { TENSES, type Tense } from '../../data/verbs';
import { st, useStore } from '../../core/store';
export default function Practica({ level, finish, cfg, me }: GameProps) {
  const [start, setStart] = useState(!!cfg.auto), [theme, setTheme] = useState<Theme | ''>((cfg.theme as Theme) ?? ''), [kind, setKind] = useState<QKind | ''>((cfg.kind as QKind) ?? ''), [tense, setTense] = useState<Tense | ''>(''), [i, setI] = useState(0), [ok, setOk] = useState(0); const N = 10; const mist = useStore(s => s.profiles[me].mistakes); const [rev, setRev] = useState(!!cfg.review); const [queue] = useState<Question[]>(() => mist.slice(0, N).map(m => m.q)); const lv = level;
  const gen = () => makeQuestion(lv, theme || undefined, kind || undefined, tense || undefined); const [q, setQ] = useState<Question>(gen); const total = rev ? Math.max(1, queue.length) : N;
  if (!start && !rev) return <div className="board2d"><div className="side" style={{ width: 'min(620px,100%)', maxHeight: 'none' }}><Es p={['¿Qué quieres practicar?', 'Что хочешь потренировать?']} as="h2" /><label>Тема <select value={theme} onChange={e => setTheme(e.target.value as Theme)}><option value="">Все темы</option>{Object.entries(THEMES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></label><label>Упражнение <select value={kind} onChange={e => setKind(e.target.value as QKind)}><option value="">Разные</option>{Object.entries(TITLES).map(([k, v]) => <option key={k} value={k}>{v[1]}</option>)}</select></label>{kind === 'verb' && <label>Время <select value={tense} onChange={e => setTense(e.target.value as Tense)}><option value="">Все времена уровня {level}</option>{TENSES.map(t => <option key={t.id} value={t.id}>{t.es} ({t.level})</option>)}</select></label>}<div className="row"><Btn kind="main" p={['Empezar', 'Начать']} onClick={() => { setQ(gen()); setStart(true); }} />{queue.length > 0 && <Btn p={[`Repasar errores (${queue.length})`, `Повторить ошибки (${queue.length})`]} onClick={() => { setRev(true); setQ(queue[0]); }} />}</div></div></div>;
  if (rev && !queue.length) return <div className="board2d"><div className="side"><Es p={['¡No tienes errores!', 'Ошибок нет!']} as="h2" /><Btn kind="main" p={['Continuar', 'Продолжить']} onClick={() => finish({ score: 100 })} /></div></div>;
  const cur = rev ? queue[i] : q;
  return <div className="board2d"><div className="side" style={{ width: 'min(620px,100%)', maxHeight: 'none' }}><Bar v={i / total} /><QuestionCard q={cur} onDone={k => { const n = ok + (k ? 1 : 0); setOk(n); if (i + 1 >= total) { st().daily('practice'); finish({ score: n / total * 100 }); } else { setI(i + 1); if (!rev) setQ(gen()); } }} /></div></div>;
}
