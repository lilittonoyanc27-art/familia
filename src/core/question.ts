import type { Level, P } from './types';
import { LEVELS } from './types';
import { WORDS, type Theme } from '../data/vocab';
import { PHRASES, REPLIES } from '../data/phrases';
import { PERSONS, TENSES, VERBS, conj, type Tense } from '../data/verbs';
import { pick, sample, shuffle, rnd } from './util';
import { tokens } from './lex';
export type QKind = 'es-ru' | 'ru-es' | 'listen' | 'cloze' | 'order' | 'reply' | 'verb' | 'speak';
export interface Question { id: string; kind: QKind; title: P; prompt: P | null; say?: string; hint?: string; options?: string[]; tiles?: string[]; answer: string; answerRu: string; why: string; word?: string }
const upto = (l: Level) => LEVELS.slice(0, LEVELS.indexOf(l) + 1);
/** Чем ближе слово к выбранному уровню, тем чаще оно встречается. */
function lv<T extends { level: Level }>(a: T[], l: Level) { const main = a.filter(x => x.level === l), rest = a.filter(x => upto(l).includes(x.level)); return main.length > 2 && Math.random() < .6 ? main : rest.length ? rest : a; }
const themed = <T extends { theme: Theme }>(a: T[], t?: Theme) => { const r = t ? a.filter(x => x.theme === t) : a; return r.length ? r : a; };
export const wordsFor = (l: Level, t?: Theme) => themed(WORDS, t).filter(w => upto(l).includes(w.level));
const KINDS: Record<Level, QKind[]> = { A1: ['es-ru', 'ru-es', 'listen', 'reply', 'order', 'verb', 'cloze'], A2: ['es-ru', 'ru-es', 'listen', 'cloze', 'order', 'reply', 'verb', 'verb'], B1: ['ru-es', 'listen', 'cloze', 'order', 'reply', 'verb', 'verb', 'cloze'] };
export const TITLES: Record<QKind, P> = {
  'es-ru': ['¿Qué significa?', 'Что это значит?'], 'ru-es': ['¿Cómo se dice en español?', 'Как сказать по-испански?'], listen: ['Escucha y elige', 'Послушай и выбери'], cloze: ['Completa la frase', 'Заполни пропуск'],
  order: ['Ordena las palabras', 'Расставь слова по порядку'], reply: ['Elige la respuesta correcta', 'Выбери правильную реплику'], verb: ['Conjuga el verbo', 'Поставь глагол в нужную форму'], speak: ['Repite en voz alta', 'Повтори вслух'],
};
export function makeQuestion(level: Level, theme?: Theme, kind: QKind = pick(KINDS[level]), tense?: Tense): Question {
  const title = TITLES[kind];
  if (kind === 'es-ru' || kind === 'ru-es') {
    const pool = lv(themed(WORDS, theme), level), w = pick(pool), others = sample(WORDS.filter(x => x.ru !== w.ru && (x.theme === w.theme || Math.random() < .3) && upto(level).includes(x.level)), 3);
    const er = kind === 'es-ru';
    return { id: kind + w.es, kind, title, prompt: er ? [w.es, '']: ['', w.ru], say: er ? w.es : undefined, options: shuffle([w, ...others].map(x => er ? x.ru : x.es)), answer: er ? w.ru : w.es, answerRu: w.ru, why: `«${w.es}» — это «${w.ru}».`, word: w.es };
  }
  if (kind === 'reply') { const r = pick(lv(themed(REPLIES, theme), level)); return { id: 'r' + r.q[0], kind, title, prompt: r.q, say: r.q[0], options: shuffle([r.a[0], ...r.bad.map(b => b[0])]), answer: r.a[0], answerRu: r.a[1], why: `На вопрос «${r.q[1]}» подходит ответ: «${r.a[0]}» — ${r.a[1]} Остальные: ${r.bad.map(b => `«${b[0]}» — ${b[1]}`).join(' ')}` }; }
  if (kind === 'verb') {
    const ts = TENSES.filter(t => upto(level).includes(t.level)), t = tense ? TENSES.find(x => x.id === tense)! : pick(ts);
    const v = pick(VERBS.filter(x => upto(level).includes(x.level))), i = rnd(6), forms = conj(v, t.id), mark = pick(t.mark);
    const bad = new Set<string>(); const all = [...forms, ...ts.flatMap(q => conj(v, q.id)), ...TENSES.flatMap(q => [conj(v, q.id)[i]])];
    shuffle(all).forEach(f => { if (f !== forms[i] && bad.size < 3) bad.add(f); });
    const es = `${mark[0]} ${PERSONS[i][0].split(' /')[0]} ___ (${v.inf}) ${v.obj[0]}.`;
    return { id: 'v' + t.id + v.inf + i, kind, title: [`${title[0]}: ${t.es}`, `${title[1]}: ${t.ru}`], prompt: [es, `${mark[1]} · ${PERSONS[i][1]} · ${v.ru} ${v.obj[1]}`], options: shuffle([forms[i], ...bad]), answer: forms[i], answerRu: `${v.ru} (${PERSONS[i][1]})`, why: `${t.rule} Глагол ${v.inf} (${v.ru}), ${PERSONS[i][0]} → ${forms[i]}.` };
  }
  const p = pick(lv(themed(PHRASES, theme), level));
  if (kind === 'listen') { const o = sample(PHRASES.filter(x => x.ru !== p.ru && upto(level).includes(x.level)), 2); return { id: 'l' + p.es, kind, title, prompt: null, say: p.es, options: shuffle([p, ...o].map(x => x.ru)), answer: p.ru, answerRu: p.ru, why: `Прозвучало: «${p.es}» — ${p.ru}` }; }
  if (kind === 'order') { const t = tokens(p.es); return { id: 'o' + p.es, kind, title, prompt: ['', p.ru], tiles: shuffle(t), answer: t.join(' '), answerRu: p.ru, why: `Правильный порядок: «${p.es}» — ${p.ru}` }; }
  if (kind === 'speak') return { id: 's' + p.es, kind, title, prompt: [p.es, p.ru], say: p.es, answer: p.es, answerRu: p.ru, why: `Нужно было сказать: «${p.es}» — ${p.ru}` };
  const t = tokens(p.es), cand = t.map((x, i) => [x.replace(/[^a-záéíóúüñA-ZÁÉÍÓÚÑ]/g, ''), i] as const).filter(x => x[0].length > 2), [word, idx] = pick(cand.length ? cand : t.map((x, i) => [x, i] as const));
  const pool = PHRASES.filter(x => x.es !== p.es && upto(level).includes(x.level)).flatMap(x => tokens(x.es)).map(x => x.replace(/[^a-záéíóúüñ]/g, '')).filter(x => x.length > 2 && x !== word.toLowerCase());
  const t2 = [...t]; t2[idx] = t2[idx].replace(word, '___');
  return { id: 'c' + p.es + idx, kind: 'cloze', title, prompt: [t2.join(' '), p.ru], options: shuffle([word, ...sample([...new Set(pool)], 3)]), answer: word, answerRu: p.ru, why: `Полная фраза: «${p.es}» — ${p.ru}` };
}
