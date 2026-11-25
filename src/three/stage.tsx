import * as T from 'three';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useStore, st } from '../core/store';
import { Character, LOOKS, type Look } from './character';
import { disposeAll } from './geo';
import { Es, Icon, Say } from '../ui/kit';
import { speak } from '../core/speech';
import { sfx } from '../core/audio';
import type { MemberId, P } from '../core/types';
import { clamp } from '../core/util';
import { TOPS } from '../data/shop';
export interface Box { x0: number; x1: number; y0: number; y1: number; z0: number; z1: number; tag?: string; off?: boolean }
export interface Item { obj: T.Object3D; p: P; r?: number; use?: () => void; act?: P; off?: boolean; pos?: T.Vector3 }
export class Input {
  keys = new Set<string>(); jx = 0; jy = 0; jumpQ = false; useQ = false; lookX = 0; lookY = 0; wheel = 0;
  get x() { const k = this.keys; return clamp((k.has('KeyD') || k.has('ArrowRight') ? 1 : 0) - (k.has('KeyA') || k.has('ArrowLeft') ? 1 : 0) + this.jx, -1, 1); }
  get y() { const k = this.keys; return clamp((k.has('KeyW') || k.has('ArrowUp') ? 1 : 0) - (k.has('KeyS') || k.has('ArrowDown') ? 1 : 0) + this.jy, -1, 1); }
  get run() { return this.keys.has('ShiftLeft') || this.keys.has('ShiftRight'); }
}
export const lookFor = (id: MemberId): Look => { const o = st().profiles[id].outfit, t = TOPS.find(x => x.id === o.top); return { ...LOOKS[id], ...(t?.color ? { top: t.color } : {}), hat: o.hat }; };
export class Stage {
  scene = new T.Scene(); camera = new T.PerspectiveCamera(55, 1, .1, 420); r!: T.WebGLRenderer; input = new Input(); boxes: Box[] = []; items: Item[] = []; upd: ((dt: number, t: number) => void)[] = []; t = 0;
  player: Character | null = null; pos = new T.Vector3(); vy = 0; ground = true; speed = 4.6; facing = 0; yaw = 0; pitch = .34; dist = 6; minD = 2.2; maxD = 16; camH = 1.25; camCollide = false; control = true; follow = true; bounds: [number, number, number, number] | null = null; near: Item | null = null; jumpV = 5.6; floorY = 0; killY = -30;
  sun = new T.DirectionalLight('#fff1d8', 2.6); hemi = new T.HemisphereLight('#dcecff', '#b59c78', 1.25); onNear: (i: Item | null) => void = () => { }; onPick: ((hit: T.Intersection, e: PointerEvent) => boolean) | null = null; onDown: ((e: PointerEvent) => void) | null = null; pickables: T.Object3D[] | null = null; el!: HTMLElement; dead = false; q: 'low' | 'medium' | 'high' = 'high'; fp = false; ray = new T.Raycaster(); lookAt = new T.Vector3(); shadowR = 26; noOrbit = false; noDrag = false; canJump = true;
  constructor(el: HTMLElement) {
    this.el = el; const s = st().settings.quality, weak = matchMedia('(pointer:coarse)').matches || (navigator.hardwareConcurrency ?? 8) <= 4; this.q = s === 'auto' ? (weak ? 'medium' : 'high') : s;
    this.r = new T.WebGLRenderer({ antialias: this.q !== 'low', powerPreference: 'high-performance' }); this.r.setPixelRatio(Math.min(devicePixelRatio, this.q === 'high' ? 2 : this.q === 'medium' ? 1.5 : 1)); this.r.toneMapping = T.ACESFilmicToneMapping; this.r.toneMappingExposure = 1.02; this.r.shadowMap.enabled = this.q !== 'low'; this.r.shadowMap.type = T.PCFShadowMap; el.prepend(this.r.domElement);
    this.scene.add(this.hemi, this.sun, this.sun.target); this.sun.position.set(18, 30, 14); this.sun.castShadow = this.q !== 'low'; const z = this.q === 'high' ? 2048 : 1024; this.sun.shadow.mapSize.set(z, z); this.sun.shadow.bias = -.0004; this.sun.shadow.normalBias = .04; this.setShadow(26); this.scene.background = new T.Color('#bfe0f2'); this.bind(); this.resize();
  }
  setShadow(r: number) { this.shadowR = r; const c = this.sun.shadow.camera; c.left = c.bottom = -r; c.right = c.top = r; c.near = 1; c.far = 110; c.updateProjectionMatrix(); }
  private off: (() => void)[] = [];
  private on<K extends keyof WindowEventMap>(t: EventTarget, k: K, f: (e: WindowEventMap[K]) => void, o?: AddEventListenerOptions) { t.addEventListener(k, f as EventListener, o); this.off.push(() => t.removeEventListener(k, f as EventListener)); }
  private bind() {
    const typing = (e: Event) => /INPUT|TEXTAREA|SELECT/.test((e.target as HTMLElement)?.tagName ?? '');
    this.on(window, 'keydown', e => { if (typing(e)) return; if (/^(Arrow|Space)/.test(e.code)) { if ((document.activeElement as HTMLElement)?.tagName !== 'BUTTON' || e.code !== 'Space') e.preventDefault(); } if (e.repeat) return; this.input.keys.add(e.code); if (e.code === 'Space') this.input.jumpQ = true; if (e.code === 'KeyE' || e.code === 'Enter') this.input.useQ = e.code === 'KeyE' || (document.activeElement as HTMLElement)?.tagName !== 'BUTTON'; });
    this.on(window, 'keyup', e => this.input.keys.delete(e.code)); this.on(window, 'blur', () => this.input.keys.clear()); this.on(window, 'resize', () => this.resize());
    const c = this.r.domElement, ptr = new Map<number, { x: number; y: number }>(); let moved = 0, pinch = 0;
    this.on(c, 'contextmenu', e => e.preventDefault()); this.on(c, 'wheel', e => { e.preventDefault(); this.input.wheel += e.deltaY; }, { passive: false });
    this.on(c, 'pointerdown', e => { (document.activeElement as HTMLElement)?.blur?.(); try { c.setPointerCapture(e.pointerId); } catch { /* синтетическое событие */ } ptr.set(e.pointerId, { x: e.clientX, y: e.clientY }); moved = 0; this.onDown?.(e); });
    this.on(c, 'pointermove', e => { const p = ptr.get(e.pointerId); if (!p) return; const dx = e.clientX - p.x, dy = e.clientY - p.y; p.x = e.clientX; p.y = e.clientY; moved += Math.abs(dx) + Math.abs(dy); if (ptr.size === 2) { const [a, b] = [...ptr.values()], d = Math.hypot(a.x - b.x, a.y - b.y); if (pinch) this.input.wheel -= (d - pinch) * 4; pinch = d; return; } if (!this.noDrag) { this.input.lookX += dx; this.input.lookY += dy; } });
    const up = (e: PointerEvent) => { ptr.delete(e.pointerId); if (ptr.size < 2) pinch = 0; if (moved < 9 && e.type === 'pointerup') this.click(e); }; this.on(c, 'pointerup', up); this.on(c, 'pointercancel', up);
  }
  ndc(e: { clientX: number; clientY: number }) { const b = this.r.domElement.getBoundingClientRect(); return new T.Vector2((e.clientX - b.left) / b.width * 2 - 1, -(e.clientY - b.top) / b.height * 2 + 1); }
  click(e: PointerEvent) {
    if (st().paused) return; this.ray.setFromCamera(this.ndc(e), this.camera); const hits = this.ray.intersectObjects(this.pickables ?? this.scene.children, true).filter(h => (h.object as T.Mesh).isMesh && visible(h.object)); if (!hits.length) return;
    if (this.onPick?.(hits[0], e)) return; const it = this.itemOf(hits[0].object); if (it && !it.off) { const d = this.itemPos(it).distanceTo(this.pos); if (it.use && (!this.player || d < (it.r ?? 2.4) + 1.2)) it.use(); else { speak(it.p[0]); st().learn(it.p[0], it.p[1]); st().translate(it.p, e); } }
  }
  itemOf(o: T.Object3D | null): Item | undefined { while (o) { if (o.userData.item) return o.userData.item as Item; o = o.parent; } }
  private tmp = new T.Vector3(); itemPos(i: Item) { return i.pos ?? i.obj.getWorldPosition(this.tmp).clone(); }
  item(i: Item) { i.obj.userData.item = i; this.items.push(i); return i; }
  removeItem(i: Item) { this.items = this.items.filter(x => x !== i); delete i.obj.userData.item; if (this.near === i) { this.near = null; this.onNear(null); } }
  box(x: number, z: number, w: number, d: number, h = 3, y = 0, tag?: string): Box { const b = { x0: x - w / 2, x1: x + w / 2, z0: z - d / 2, z1: z + d / 2, y0: y, y1: y + h, tag }; this.boxes.push(b); return b; }
  addPlayer(look: Look, x: number, z: number, y = 0, face = Math.PI) { if (this.player) this.scene.remove(this.player.root); this.player = new Character(look); this.scene.add(this.player.root); this.pos.set(x, y, z); this.facing = face; this.player.root.position.copy(this.pos); this.player.root.rotation.y = face; return this.player; }
  groundAt: ((x: number, z: number) => number) | null = null;
  hit(x: number, y: number, z: number, r: number, h: number) { for (const b of this.boxes) if (!b.off && x + r > b.x0 && x - r < b.x1 && z + r > b.z0 && z - r < b.z1 && y + .02 < b.y1 && y + h > b.y0) return b; return null; }
  slide(p: T.Vector3, dx: number, dz: number, r: number, h: number, step: number) {
    for (const [ax, d] of [['x', dx], ['z', dz]] as const) { const n = p[ax] + d, x = ax === 'x' ? n : p.x, z = ax === 'z' ? n : p.z, b = this.hit(x, p.y, z, r, h); if (!b) p[ax] = n; else if (b.y1 - p.y <= step && !this.hit(x, b.y1, z, r, h)) { p[ax] = n; p.y = b.y1; } }
    if (this.bounds) { p.x = clamp(p.x, this.bounds[0], this.bounds[1]); p.z = clamp(p.z, this.bounds[2], this.bounds[3]); }
  }
  support(p: T.Vector3, r: number) { let g = this.groundAt ? this.groundAt(p.x, p.z) : this.floorY; for (const b of this.boxes) if (!b.off && p.x + r * .7 > b.x0 && p.x - r * .7 < b.x1 && p.z + r * .7 > b.z0 && p.z - r * .7 < b.z1 && b.y1 <= p.y + .3 && b.y1 > g) g = b.y1; return g; }
  onFall: (() => void) | null = null;
  step(dt: number) {
    this.t += dt; const i = this.input, s = st().settings.sens;
    if (!this.noOrbit) { this.yaw -= i.lookX * .0055 * s; this.pitch = clamp(this.pitch + i.lookY * .004 * s, this.fp ? -1.45 : -.12, this.fp ? 1.45 : 1.25); this.dist = clamp(this.dist * (1 + i.wheel * .0011), this.minD, this.maxD); } i.lookX = i.lookY = i.wheel = 0;
    if (this.player && this.control) {
      const mx = i.x, my = i.y, len = Math.min(1, Math.hypot(mx, my)); let spd = 0;
      if (len > .08) { const a = Math.atan2(mx, my) , dir = this.yaw + Math.PI - a; spd = this.speed * len * (i.run ? 1.65 : 1); const dx = Math.sin(dir) * spd * dt, dz = Math.cos(dir) * spd * dt; this.slide(this.pos, dx, dz, .3, this.player.look.h, .42); let df = dir - this.facing; df = Math.atan2(Math.sin(df), Math.cos(df)); this.facing += df * Math.min(1, dt * 12); }
      if (i.jumpQ && this.ground && this.canJump) { this.vy = this.jumpV; this.ground = false; sfx('jump'); } i.jumpQ = false;
      this.vy -= 15 * dt; let ny = this.pos.y + this.vy * dt; const g = this.support(this.pos, .3); if (this.vy > 0) { const hb = this.hit(this.pos.x, ny, this.pos.z, .25, this.player.look.h); if (hb && hb.y0 > this.pos.y + 1) { this.vy = 0; ny = this.pos.y; } } if (ny <= g && this.vy <= 0) { ny = g; this.vy = 0; this.ground = true; } else if (ny > g + .05) this.ground = false; this.pos.y = ny; if (this.pos.y < this.killY) this.onFall?.();
      const pr = this.player; pr.root.position.lerp(this.pos, 1); pr.root.rotation.y = this.facing; pr.update(dt, spd, !this.ground);
      let best: Item | null = null, bd = 9; for (const it of this.items) { if (it.off) continue; const p = this.itemPos(it), d = Math.hypot(p.x - this.pos.x, p.z - this.pos.z); if (Math.abs(p.y - this.pos.y) > 3 || d > (it.r ?? 2.1)) continue; const ang = Math.atan2(p.x - this.pos.x, p.z - this.pos.z) - this.facing, w = d + (1 - Math.cos(ang)) * .6 - (it.use ? .35 : 0); if (w < bd) { bd = w; best = it; } } if (best !== this.near) { this.near = best; this.onNear(best); }
      if (i.useQ) { i.useQ = false; this.useNear(); }
    }
    for (const f of this.upd) f(dt, this.t);
    if (this.player && this.follow) { const ty = this.pos.y + this.camH; let d = this.dist; const cx = Math.sin(this.yaw) * Math.cos(this.pitch), cy = Math.sin(this.pitch), cz = Math.cos(this.yaw) * Math.cos(this.pitch); if (this.camCollide) for (let k = .6; k < this.dist; k += .35) if (this.hit(this.pos.x + cx * k, ty + cy * k - .1, this.pos.z + cz * k, .25, .2)) { d = Math.max(1, k - .4); break; } const tgt = new T.Vector3(this.pos.x + cx * d, Math.max(.3, ty + cy * d), this.pos.z + cz * d); this.camera.position.lerp(tgt, 1 - Math.exp(-dt * 14)); this.lookAt.lerp(new T.Vector3(this.pos.x, ty, this.pos.z), 1 - Math.exp(-dt * 16)); this.camera.lookAt(this.lookAt); this.sun.target.position.copy(this.pos); this.sun.position.copy(this.pos).add(this.sunDir); }
  }
  sunDir = new T.Vector3(18, 30, 14);
  snap() { if (!this.player) return; this.lookAt.set(this.pos.x, this.pos.y + this.camH, this.pos.z); this.camera.position.set(this.pos.x + Math.sin(this.yaw) * this.dist, this.pos.y + this.camH + Math.sin(this.pitch) * this.dist, this.pos.z + Math.cos(this.yaw) * this.dist); }
  useNear() { const n = this.near; if (!n) return; if (n.use) n.use(); else { speak(n.p[0]); st().learn(n.p[0], n.p[1]); st().translate(n.p); } }
  resize() { const w = this.el.clientWidth || innerWidth, h = this.el.clientHeight || innerHeight; this.r.setSize(w, h, false); this.camera.aspect = w / h; this.camera.fov = w < h ? 68 : 55; this.camera.updateProjectionMatrix(); this.onResize?.(); }
  onResize: (() => void) | null = null;
  render() { this.r.render(this.scene, this.camera); }
  dispose() { this.dead = true; this.off.forEach(f => f()); disposeAll(this.scene); this.r.dispose(); this.r.domElement.remove(); this.r.forceContextLoss(); }
}
const visible = (o: T.Object3D | null) => { while (o) { if (!o.visible) return false; o = o.parent; } return true; };
export function Joystick({ s, jump = true, children }: { s: Stage; jump?: boolean; children?: ReactNode }) {
  const k = useRef<HTMLElement>(null); const mv = (e: React.PointerEvent<HTMLDivElement>) => { if (!(e.buttons & 1)) return; const b = e.currentTarget.getBoundingClientRect(); let x = (e.clientX - b.left - 62) / 45, y = (e.clientY - b.top - 62) / 45; const l = Math.hypot(x, y); if (l > 1) { x /= l; y /= l; } s.input.jx = x; s.input.jy = -y; if (k.current) k.current.style.transform = `translate(${x * 38}px,${y * 38}px)`; };
  const end = () => { s.input.jx = s.input.jy = 0; if (k.current) k.current.style.transform = ''; };
  return <><div className="joy" aria-label="Джойстик" onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); mv(e); }} onPointerMove={mv} onPointerUp={end} onPointerCancel={end}><i ref={k} /></div><div className="tbtns">{children}{jump && <button type="button" aria-label="Прыжок" onPointerDown={e => { e.preventDefault(); s.input.jumpQ = true; }}><Icon n="jump" s={28} /></button>}<button type="button" aria-label="Действие" onPointerDown={e => { e.preventDefault(); s.input.useQ = true; }}><Icon n="hand" s={28} /></button></div></>;
}
export function NearPrompt({ s }: { s: Stage }) { const [n, set] = useState<Item | null>(s.near); useEffect(() => { s.onNear = set; return () => { s.onNear = () => { }; }; }, [s]); if (!n) return null; return <div className="prompt"><span className="key">E</span><Es p={n.p} /><Say t={n.p[0]} />{n.use && <span className="btn small main"><button type="button" onClick={() => s.useNear()}>{(n.act ?? ['Usar', 'Использовать'])[0]}</button><button type="button" className="ru" onClick={e => st().translate(n.act ?? ['Usar', 'Использовать'], e)}>RU</button></span>}</div>; }
/** Создаёт сцену один раз; setup может вернуть функцию очистки. */
export function StageView({ setup, children, joy = true, jump = true, prompt = true, buttons }: { setup: (s: Stage) => void | (() => void); children?: (s: Stage) => ReactNode; joy?: boolean; jump?: boolean; prompt?: boolean; buttons?: (s: Stage) => ReactNode }) {
  const el = useRef<HTMLDivElement>(null), [s, set] = useState<Stage | null>(null), su = useRef(setup); su.current = setup; const [err, setErr] = useState(false);
  useEffect(() => {
    let g: Stage; try { g = new Stage(el.current!); } catch { setErr(true); return; } const clean = su.current(g); g.snap(); set(g); (window as unknown as Record<string, unknown>).__stage = g; let last = performance.now(), raf = 0, slow = 0, n = 0;
    const loop = (t: number) => { if (g.dead) return; raf = requestAnimationFrame(loop); const raw = (t - last) / 1000; const dt = Math.min(.05, raw); last = t; if (!useStore.getState().paused && !document.querySelector('.modal')) { g.step(dt); } else { g.input.lookX = g.input.lookY = 0; g.input.useQ = g.input.jumpQ = false; } g.render();
      if (st().settings.quality === 'auto' && ++n > 60 && raw < .5) { if (raw > .034) slow++; if (n % 120 === 0) { if (slow > 70 && g.r.getPixelRatio() > .8) g.r.setPixelRatio(Math.max(.75, g.r.getPixelRatio() * .8)); slow = 0; } } };
    raf = requestAnimationFrame(loop); const ro = new ResizeObserver(() => g.resize()); ro.observe(el.current!);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); clean?.(); g.dispose(); set(null); };
  }, []);
  return <div className="stage" ref={el}>{err && <div className="page"><h1>WebGL недоступен</h1><p>Включите аппаратное ускорение в браузере — без него 3D-мир не запустится. Настольные игры доступны в меню.</p></div>}{s && <>{joy && <Joystick s={s} jump={jump}>{buttons?.(s)}</Joystick>}{prompt && <NearPrompt s={s} />}{children?.(s)}</>}</div>;
}
