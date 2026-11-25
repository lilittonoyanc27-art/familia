export type P = readonly [es: string, ru: string];
export type Level = 'A1' | 'A2' | 'B1';
export type MemberId = 'elena' | 'alejandro' | 'lev' | 'mira';
export const LEVELS: Level[] = ['A1', 'A2', 'B1'];
export const MEMBERS: { id: MemberId; es: string; ru: string; role: P; color: string; style: P }[] = [
  { id: 'elena', es: 'Elena', ru: 'Елена', role: ['la mamá', 'мама'], color: '#c8623f', style: ['Cocina, compras y vecinos', 'Кухня, покупки и соседи'] },
  { id: 'alejandro', es: 'Alejandro', ru: 'Александр', role: ['el papá', 'папа'], color: '#33608f', style: ['Coche, taller y ciudad', 'Машина, мастерская и город'] },
  { id: 'lev', es: 'Lev', ru: 'Лев', role: ['el hijo', 'сын'], color: '#4b8b3b', style: ['Bloques, retos y aventuras', 'Блоки, испытания и приключения'] },
  { id: 'mira', es: 'Mira', ru: 'Мира', role: ['la hija', 'дочка'], color: '#7a3f78', style: ['Ajedrez, lógica y misterios', 'Шахматы, логика и тайны'] },
];
export const memberOf = (id: MemberId) => MEMBERS.find(m => m.id === id)!;
