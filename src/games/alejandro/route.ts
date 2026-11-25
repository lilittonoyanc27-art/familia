import { ROADS } from '../../world/city';
export type Nd = [number, number];
const C = [-72, -48, -24, 0, 24, 48, 72]; const onRoad = (x: number, z: number) => ROADS.includes(x) || ROADS.includes(z);
export const nodes: Nd[] = C.flatMap(x => C.map(z => [x, z] as Nd)).filter(([x, z]) => onRoad(x, z) && !(x % 48 === 0 && z % 48 === 0));
const key = (n: Nd) => n[0] + ',' + n[1]; const set = new Set(nodes.map(key));
export const near = (x: number, z: number) => nodes.reduce((a, n) => Math.hypot(n[0] - x, n[1] - z) < Math.hypot(a[0] - x, a[1] - z) ? n : a);
export function path(a: Nd, b: Nd, avoid?: Nd): Nd[] { const prev = new Map<string, Nd | null>([[key(a), null]]), q: Nd[] = [a]; while (q.length) { const n = q.shift()!; if (key(n) === key(b)) break; for (const [dx, dz] of [[24, 0], [-24, 0], [0, 24], [0, -24]]) { const m: Nd = [n[0] + dx, n[1] + dz]; const mid = ROADS.includes(n[0]) && dx === 0 || ROADS.includes(n[1]) && dz === 0; if (!set.has(key(m)) || !mid || prev.has(key(m))) continue; if (avoid && n === a && key(m) === key(avoid)) continue; prev.set(key(m), n); q.push(m); } } const out: Nd[] = []; let c: Nd | null | undefined = b; while (c) { out.unshift(c); c = prev.get(key(c)); } return out[0] && key(out[0]) === key(a) ? out : avoid ? path(a, b) : []; }
/** Поворот в узле: >0 — направо, <0 — налево, 0 — прямо. */
export const turn = (a: Nd, b: Nd, c: Nd) => Math.sign((b[0] - a[0]) * (c[1] - b[1]) - (b[1] - a[1]) * (c[0] - b[0]));
