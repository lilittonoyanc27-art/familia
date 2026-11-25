import type { Level } from '../core/types';
export type Tense = 'presente' | 'perfecto' | 'indefinido' | 'imperfecto' | 'futuro';
export const TENSES: { id: Tense; es: string; ru: string; level: Level; mark: [string, string][] ; rule: string }[] = [
  { id: 'presente', es: 'Presente', ru: 'настоящее время', level: 'A1', mark: [['Todos los días', 'каждый день'], ['Normalmente', 'обычно'], ['Ahora', 'сейчас']], rule: 'Presente — действие происходит сейчас или регулярно.' },
  { id: 'perfecto', es: 'Pretérito Perfecto', ru: 'прошедшее, связанное с настоящим', level: 'A2', mark: [['Hoy', 'сегодня'], ['Esta semana', 'на этой неделе'], ['Esta mañana', 'сегодня утром']], rule: 'Pretérito Perfecto = haber + причастие. Период ещё не закончился: hoy, esta semana.' },
  { id: 'indefinido', es: 'Pretérito Indefinido', ru: 'завершённое прошедшее', level: 'A2', mark: [['Ayer', 'вчера'], ['El año pasado', 'в прошлом году'], ['Anoche', 'вчера вечером']], rule: 'Pretérito Indefinido — завершённое действие в законченном периоде: ayer, el año pasado.' },
  { id: 'imperfecto', es: 'Pretérito Imperfecto', ru: 'повторяющееся прошедшее', level: 'B1', mark: [['De pequeño, siempre', 'в детстве всегда'], ['Antes', 'раньше'], ['Todos los veranos', 'каждое лето (раньше)']], rule: 'Pretérito Imperfecto — привычка или описание в прошлом: antes, de pequeño, siempre.' },
  { id: 'futuro', es: 'Futuro Simple', ru: 'будущее время', level: 'A2', mark: [['Mañana', 'завтра'], ['El año que viene', 'в следующем году'], ['Pronto', 'скоро']], rule: 'Futuro Simple — окончания -é, -ás, -á, -emos, -éis, -án прибавляются к инфинитиву.' },
];
export const PERSONS: [string, string][] = [['yo', 'я'], ['tú', 'ты'], ['él / ella', 'он / она'], ['nosotros', 'мы'], ['vosotros', 'вы'], ['ellos', 'они']];
interface V { inf: string; ru: string; obj: [string, string]; level: Level; pres?: string; ind?: string; imp?: string; fut?: string; part?: string }
const v = (inf: string, ru: string, o: string, oru: string, level: Level, x: Partial<V> = {}): V => ({ inf, ru, obj: [o, oru], level, ...x });
export const VERBS: V[] = [
  v('hablar', 'говорить', 'español', 'по-испански', 'A1'), v('comprar', 'покупать', 'pan', 'хлеб', 'A1'), v('trabajar', 'работать', 'en la oficina', 'в офисе', 'A1'), v('cocinar', 'готовить', 'una tortilla', 'тортилью', 'A1'),
  v('comer', 'есть', 'paella', 'паэлью', 'A1'), v('beber', 'пить', 'agua', 'воду', 'A1'), v('vivir', 'жить', 'en la ciudad', 'в городе', 'A1'), v('escribir', 'писать', 'una carta', 'письмо', 'A1', { part: 'escrito' }),
  v('leer', 'читать', 'un libro', 'книгу', 'A1', { ind: 'leí leíste leyó leímos leísteis leyeron', part: 'leído' }), v('estudiar', 'учить', 'matemáticas', 'математику', 'A1'), v('abrir', 'открывать', 'la puerta', 'дверь', 'A1', { part: 'abierto' }),
  v('jugar', 'играть', 'en el parque', 'в парке', 'A1', { pres: 'juego juegas juega jugamos jugáis juegan', ind: 'jugué jugaste jugó jugamos jugasteis jugaron' }),
  v('tener', 'иметь', 'un perro', 'собаку', 'A1', { pres: 'tengo tienes tiene tenemos tenéis tienen', ind: 'tuve tuviste tuvo tuvimos tuvisteis tuvieron', fut: 'tendr' }),
  v('hacer', 'делать', 'los deberes', 'домашнее задание', 'A1', { pres: 'hago haces hace hacemos hacéis hacen', ind: 'hice hiciste hizo hicimos hicisteis hicieron', fut: 'har', part: 'hecho' }),
  v('ir', 'идти, ехать', 'al supermercado', 'в супермаркет', 'A1', { pres: 'voy vas va vamos vais van', ind: 'fui fuiste fue fuimos fuisteis fueron', imp: 'iba ibas iba íbamos ibais iban', fut: 'ir', part: 'ido' }),
  v('ver', 'смотреть', 'una película', 'фильм', 'A1', { pres: 'veo ves ve vemos veis ven', ind: 'vi viste vio vimos visteis vieron', imp: 'veía veías veía veíamos veíais veían', part: 'visto' }),
  v('querer', 'хотеть', 'un helado', 'мороженое', 'A1', { pres: 'quiero quieres quiere queremos queréis quieren', ind: 'quise quisiste quiso quisimos quisisteis quisieron', fut: 'querr' }),
  v('preparar', 'готовить', 'el café', 'кофе', 'A1'), v('visitar', 'навещать', 'a los abuelos', 'бабушку и дедушку', 'A1'), v('limpiar', 'убирать', 'la casa', 'дом', 'A1'), v('recoger', 'собирать', 'los juguetes', 'игрушки', 'A2', { pres: 'recojo recoges recoge recogemos recogéis recogen' }),
  v('poder', 'мочь', 'ayudar', 'помочь', 'A2', { pres: 'puedo puedes puede podemos podéis pueden', ind: 'pude pudiste pudo pudimos pudisteis pudieron', fut: 'podr' }),
  v('decir', 'говорить, сказать', 'la verdad', 'правду', 'A2', { pres: 'digo dices dice decimos decís dicen', ind: 'dije dijiste dijo dijimos dijisteis dijeron', fut: 'dir', part: 'dicho' }),
  v('poner', 'ставить, накрывать', 'la mesa', 'на стол', 'A2', { pres: 'pongo pones pone ponemos ponéis ponen', ind: 'puse pusiste puso pusimos pusisteis pusieron', fut: 'pondr', part: 'puesto' }),
  v('dormir', 'спать', 'ocho horas', 'восемь часов', 'A2', { pres: 'duermo duermes duerme dormimos dormís duermen', ind: 'dormí dormiste durmió dormimos dormisteis durmieron' }),
  v('pedir', 'просить, заказывать', 'la cuenta', 'счёт', 'A2', { pres: 'pido pides pide pedimos pedís piden', ind: 'pedí pediste pidió pedimos pedisteis pidieron' }),
  v('viajar', 'путешествовать', 'a España', 'в Испанию', 'A2'), v('pagar', 'платить', 'el alquiler', 'аренду', 'A2', { ind: 'pagué pagaste pagó pagamos pagasteis pagaron' }), v('construir', 'строить', 'un puente', 'мост', 'B1', { pres: 'construyo construyes construye construimos construís construyen', ind: 'construí construiste construyó construimos construisteis construyeron' }),
  v('conducir', 'водить', 'el coche', 'машину', 'B1', { pres: 'conduzco conduces conduce conducimos conducís conducen', ind: 'conduje condujiste condujo condujimos condujisteis condujeron' }),
  v('volver', 'возвращаться', 'a casa', 'домой', 'A2', { pres: 'vuelvo vuelves vuelve volvemos volvéis vuelven', part: 'vuelto' }), v('salir', 'выходить', 'con amigos', 'с друзьями', 'A2', { pres: 'salgo sales sale salimos salís salen', fut: 'saldr' }),
  v('encontrar', 'находить', 'el tesoro', 'сокровище', 'A2', { pres: 'encuentro encuentras encuentra encontramos encontráis encuentran' }), v('perder', 'терять', 'las llaves', 'ключи', 'B1', { pres: 'pierdo pierdes pierde perdemos perdéis pierden' }),
];
const E = {
  presente: { a: 'o as a amos áis an', e: 'o es e emos éis en', i: 'o es e imos ís en' },
  indefinido: { a: 'é aste ó amos asteis aron', e: 'í iste ió imos isteis ieron', i: 'í iste ió imos isteis ieron' },
  imperfecto: { a: 'aba abas aba ábamos abais aban', e: 'ía ías ía íamos íais ían', i: 'ía ías ía íamos íais ían' },
} as const;
export function conj(x: V, t: Tense): string[] {
  const c = x.inf.at(-2) as 'a' | 'e' | 'i', root = x.inf.slice(0, -2);
  if (t === 'futuro') return 'é ás á emos éis án'.split(' ').map(e => (x.fut ?? x.inf) + e);
  if (t === 'perfecto') { const p = x.part ?? root + (c === 'a' ? 'ado' : 'ido'); return 'he has ha hemos habéis han'.split(' ').map(h => h + ' ' + p); }
  const irr = t === 'presente' ? x.pres : t === 'indefinido' ? x.ind : x.imp;
  return irr ? irr.split(' ') : E[t][c].split(' ').map(e => root + e);
}
