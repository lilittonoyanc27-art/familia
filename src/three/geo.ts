import * as T from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
export type Part = T.BufferGeometry;
const col = new T.Color();
function fin(g: T.BufferGeometry, c: string | number, x: number, y: number, z: number, rx = 0, ry = 0, rz = 0): Part {
  if (rx || ry || rz) g.applyMatrix4(new T.Matrix4().makeRotationFromEuler(new T.Euler(rx, ry, rz)));
  g.translate(x, y, z); const n = g.index ? g.toNonIndexed() : g; n.deleteAttribute('uv'); n.deleteAttribute('uv1'); col.set(c);
  const k = n.attributes.position.count, a = new Float32Array(k * 3); for (let i = 0; i < k; i++) { a[i * 3] = col.r; a[i * 3 + 1] = col.g; a[i * 3 + 2] = col.b; } n.setAttribute('color', new T.BufferAttribute(a, 3)); return n;
}
type N = number; type C = string | number;
export const B = (w: N, h: N, d: N, c: C, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) => fin(new T.BoxGeometry(w, h, d), c, x, y, z, rx, ry, rz);
export const R = (w: N, h: N, d: N, c: C, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, r = .06) => fin(new RoundedBoxGeometry(w, h, d, 2, Math.min(r, w / 2.1, h / 2.1, d / 2.1)), c, x, y, z, rx, ry, rz);
export const S = (r: N, c: C, x = 0, y = 0, z = 0, sx = 1, sy = 1, sz = 1) => { const g = new T.SphereGeometry(r, 14, 10); g.scale(sx, sy, sz); return fin(g, c, x, y, z); };
export const C = (rt: N, rb: N, h: N, c: C, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, seg = 14) => fin(new T.CylinderGeometry(rt, rb, h, seg), c, x, y, z, rx, ry, rz);
export const K = (r: N, h: N, c: C, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, seg = 14) => fin(new T.ConeGeometry(r, h, seg), c, x, y, z, rx, ry, rz);
export const O = (r: N, t: N, c: C, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, arc = 6.2832) => fin(new T.TorusGeometry(r, t, 8, 18, arc), c, x, y, z, rx, ry, rz);
export const P = (r: N, h: N, c: C, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) => fin(new T.CapsuleGeometry(r, h, 4, 10), c, x, y, z, rx, ry, rz);
export const L = (pts: [N, N][], c: C, x = 0, y = 0, z = 0) => fin(new T.LatheGeometry(pts.map(p => new T.Vector2(p[0], p[1])), 22), c, x, y, z);
export const X = (pts: [N, N][], depth: N, c: C, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) => { const s = new T.Shape(pts.map(p => new T.Vector2(p[0], p[1]))); const g = new T.ExtrudeGeometry(s, { depth, bevelEnabled: true, bevelSize: .015, bevelThickness: .015, bevelSegments: 1 }); g.translate(0, 0, -depth / 2); return fin(g, c, x, y, z, rx, ry, rz); };
export const mat = new T.MeshStandardMaterial({ vertexColors: true, roughness: .72, metalness: .02 });
export const glow = new T.MeshBasicMaterial({ vertexColors: true });
export const merge = (p: Part[]) => { const g = mergeGeometries(p.map(q => { if (!q.attributes.normal) q.computeVertexNormals(); return q; })); p.forEach(q => q.dispose()); return g!; };
export const mesh = (p: Part[], m: T.Material = mat, cast = true) => { const o = new T.Mesh(merge(p), m); o.castShadow = cast; o.receiveShadow = true; return o; };
export function textTex(lines: string[], o: { w?: number; h?: number; bg?: string; fg?: string; font?: number; border?: string } = {}) {
  const w = o.w ?? 512, h = o.h ?? 128, c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d')!;
  if (o.bg) { x.fillStyle = o.bg; x.beginPath(); x.roundRect(0, 0, w, h, 18); x.fill(); } if (o.border) { x.strokeStyle = o.border; x.lineWidth = 8; x.beginPath(); x.roundRect(7, 7, w - 14, h - 14, 14); x.stroke(); }
  x.fillStyle = o.fg ?? '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle'; let f = o.font ?? 60; const set = () => x.font = `${f}px "Yeseva One",Georgia,serif`; set(); while (Math.max(...lines.map(l => x.measureText(l).width)) > w - 44 && f > 14) { f -= 2; set(); }
  lines.forEach((l, i) => x.fillText(l, w / 2, h / 2 + (i - (lines.length - 1) / 2) * f * 1.2 + 2)); const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4; return t;
}
export const sign = (text: string, w: number, h: number, bg = '#1f2a44', fg = '#fff') => new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ map: textTex([text], { w: 512, h: Math.round(512 * h / w), bg, fg, font: 90 }), transparent: true }));
export function label(text: string, scale = 1, bg = 'rgba(31,42,68,.9)') { const s = new T.Sprite(new T.SpriteMaterial({ map: textTex([text], { bg, w: 400, h: 100, font: 52 }), depthTest: true, transparent: true })); s.scale.set(1.5 * scale, .375 * scale, 1); return s; }
export function disposeAll(o: T.Object3D) { o.traverse(n => { const m = n as T.Mesh; if (m.geometry && !m.userData.shared) m.geometry.dispose(); const ms = m.material ? (Array.isArray(m.material) ? m.material : [m.material]) : []; ms.forEach(q => { if (q !== mat && q !== glow) { (q as T.MeshBasicMaterial).map?.dispose(); q.dispose(); } }); }); }
