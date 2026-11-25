import type { P } from '../core/types';
export interface Place { id: string; p: P; x: number; z: number; w: number; d: number; h: number; face: 1 | -1 | 2 | -2; wall: string; roof: string; kind: 'bld' | 'open'; stop: [number, number]; awn?: string }
const b = (id: string, es: string, ru: string, x: number, z: number, w: number, h: number, face: 1 | -1, wall: string, roof: string, awn?: string, d = 12): Place => ({ id, p: [es, ru], x, z, w, d, h, face, wall, roof, kind: 'bld', stop: [Math.round(x / 48) * 48, Math.round(z / 48) * 48 + face * 24], awn });
export const PLACES: Place[] = [
  b('casa', 'La casa de la familia', 'Семейный дом', -55, -40, 16, 7, 1, '#f3e3c8', '#b5532f'),
  b('juguetes', 'La tienda de juguetes', 'Магазин игрушек', -40, -56, 17, 5, -1, '#e8b9a0', '#8a4a35', '#2f8f89'),
  b('escuela', 'La escuela', 'Школа', 0, -40, 32, 8, 1, '#e9c58e', '#a8482f', undefined, 13),
  b('biblioteca', 'La biblioteca', 'Библиотека', 0, -57, 26, 7, -1, '#dcd3c0', '#5f6f7a'),
  b('banco', 'El banco', 'Банк', 40, -56, 16, 8, -1, '#d5d9dc', '#54606e'),
  b('farmacia', 'La farmacia', 'Аптека', 56, -40, 15, 5, 1, '#e6efe0', '#4f7f5f', '#3c9a57'),
  b('ropa', 'La tienda de ropa', 'Магазин одежды', 40, -40, 14, 6, 1, '#f0d3cf', '#93423f', '#a83a5a'),
  b('supermercado', 'El supermercado', 'Супермаркет', -48, 8, 32, 7, 1, '#f1ead8', '#b5532f', '#c8623f', 13),
  b('construccion', 'La tienda de bricolaje', 'Строительный магазин', -48, -9, 28, 6, -1, '#dfc9a0', '#6f5a40', '#d98a2b'),
  b('cafe', 'El café', 'Кафе', 40, 8, 15, 5, 1, '#f2d9b0', '#a8482f', '#23716d'),
  b('restaurante', 'El restaurante', 'Ресторан', 57, 8, 15, 6, 1, '#e3b48c', '#8a3f2a', '#8a2f3f'),
  b('cine', 'El cine', 'Кинотеатр', 48, -9, 26, 9, -1, '#b9505a', '#3a2c3a', '#f0c040'),
  b('centro', 'El centro comercial', 'Торговый центр', 0, 40, 34, 10, -1, '#cfdce3', '#6f8794', undefined, 14),
  b('juegos', 'El centro de juegos', 'Игровой центр', -48, 40, 26, 7, -1, '#8f6fa8', '#3f2f58', '#f0c040'),
  { id: 'columpios', p: ['El parque infantil', 'Детская площадка'], x: 48, z: 48, w: 30, d: 30, h: 0, face: -1, wall: '', roof: '', kind: 'open', stop: [48, 24] },
  { id: 'parque', p: ['El parque', 'Парк'], x: 0, z: 0, w: 34, d: 34, h: 0, face: 1, wall: '', roof: '', kind: 'open', stop: [0, 24] },
  { id: 'estacion', p: ['La estación de tren', 'Железнодорожная станция'], x: -92, z: 0, w: 14, d: 34, h: 8, face: 2, wall: '#e3c9a4', roof: '#54606e', kind: 'bld', stop: [-72, 0] },
  { id: 'aeropuerto', p: ['El aeropuerto', 'Аэропорт'], x: 94, z: 0, w: 16, d: 40, h: 9, face: -2, wall: '#e8eef2', roof: '#7f9aac', kind: 'bld', stop: [72, 0] },
  { id: 'playa', p: ['La playa', 'Пляж'], x: 0, z: 98, w: 60, d: 20, h: 0, face: -1, wall: '', roof: '', kind: 'open', stop: [0, 72] },
];
export const placeOf = (id: string) => PLACES.find(p => p.id === id)!;
export const doorOf = (p: Place): [number, number] => p.kind === 'open' ? [p.x, p.z] : p.face === 2 ? [p.x + p.w / 2 + 1.6, p.z] : p.face === -2 ? [p.x - p.w / 2 - 1.6, p.z] : [p.x, p.z + p.face * (p.d / 2 + 1.6)];
