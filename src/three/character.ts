import * as T from 'three';
import { B, C, K, O, P, R, S, mesh, type Part } from './geo';
import type { MemberId } from '../core/types';
export interface Look { h: number; skin: string; hair: string; top: string; bottom: string; shoe: string; style: 'long' | 'short' | 'spiky' | 'pony' | 'bun' | 'bald' | 'bob'; dress?: boolean; hat?: string; pack?: string; beard?: boolean; apron?: string; tie?: string; glasses?: boolean; detail?: string }
export const LOOKS: Record<MemberId, Look> = {
  elena: { h: 1.66, skin: '#f0bd97', hair: '#5b3320', top: '#c8623f', bottom: '#a84d30', shoe: '#6b3a24', style: 'long', dress: true, detail: '#f3d9a8' },
  alejandro: { h: 1.82, skin: '#e8b18a', hair: '#2b2320', top: '#33507a', bottom: '#2c3442', shoe: '#4d3524', style: 'bald', detail: '#e8edf2' },
  lev: { h: 1.3, skin: '#f3c5a0', hair: '#c48a45', top: '#4b8b3b', bottom: '#44587a', shoe: '#d9d4c8', style: 'spiky', pack: '#d98a2b', detail: '#f0c040' },
  mira: { h: 1.38, skin: '#f2c3a0', hair: '#3a2418', top: '#7a3f78', bottom: '#2e2b40', shoe: '#2a2230', style: 'pony', detail: '#e6d3ea', glasses: true },
};
const NC = ['#b5503c', '#2f7f79', '#d99a2b', '#5c6b8f', '#8a5a7a', '#5f8a4a', '#c07a5a', '#3d5a80'], HC = ['#2b2320', '#5b3320', '#8a5a2a', '#c48a45', '#777', '#3a2418'], SC = ['#f2c3a0', '#e8b18a', '#c98d63', '#8d5a3c', '#f0bd97'];
export const npcLook = (seed: number, o: Partial<Look> = {}): Look => { const f = seed % 2 === 0; return { h: f ? 1.62 : 1.76, skin: SC[seed * 7 % 5], hair: HC[seed * 5 % 6], top: NC[seed * 3 % 8], bottom: NC[(seed * 5 + 3) % 8], shoe: '#3a2f28', style: f ? (['long', 'bob', 'bun', 'pony'] as const)[seed % 4] : (['short', 'spiky', 'short', 'bald'] as const)[seed % 4], dress: f && seed % 3 === 0, beard: !f && seed % 3 === 0, glasses: seed % 5 === 0, ...o }; };
export class Character {
  root = new T.Group(); body = new T.Group(); head = new T.Group(); arms: T.Group[] = []; fore: T.Group[] = []; legs: T.Group[] = []; shin: T.Group[] = []; phase = Math.random() * 6; wave = 0; talk = 0; hold: T.Object3D | null = null; amp = 0; sit = false; jumpT = 0;
  constructor(public look: Look) {
    const s = look.h / 1.75, k = look.h < 1.45, L = look; this.root.add(this.body); this.body.scale.setScalar(s);
    const hip = k ? .78 : .86, sh = k ? 1.22 : 1.38;
    const torso: Part[] = [R(.42, sh - hip + .06, .26, L.top, 0, (sh + hip) / 2, 0, 0, 0, 0, .11), R(.36, .16, .24, L.dress ? L.top : L.bottom, 0, hip - .02, 0, 0, 0, 0, .07), C(.07, .08, .12, L.skin, 0, sh + .08, 0)];
    if (L.dress) torso.push(C(.2, .36, .5, L.top, 0, hip - .16, 0), O(.2, .025, L.detail ?? '#fff', 0, hip + .08, 0, Math.PI / 2)); else torso.push(B(.37, .05, .255, '#3a2f28', 0, hip + .05, 0));
    if (L.detail && !L.dress) torso.push(B(.11, .24, .02, L.detail, 0, sh - .13, .125));
    if (L.apron) torso.push(R(.34, .6, .03, L.apron, 0, hip + .1, .15)); if (L.tie) torso.push(B(.06, .3, .02, L.tie, 0, sh - .18, .14)); if (L.pack) torso.push(R(.34, .4, .18, L.pack, 0, sh - .22, -.22, 0, 0, 0, .08), R(.22, .16, .06, '#a8641c', 0, sh - .32, -.32));
    this.body.add(mesh(torso));
    const hs = k ? 1.18 : 1, hd: Part[] = [S(.17, L.skin, 0, 0, 0, .92, 1.08, .96), S(.035, L.skin, 0, -.02, .165, .8, 1, 1), S(.04, L.skin, .16, -.01, 0, .5, 1, .8), S(.04, L.skin, -.16, -.01, 0, .5, 1, .8)];
    [-1, 1].forEach(e => hd.push(S(.032, '#fff', e * .062, .025, .142, 1, 1.15, .5), S(.02, '#2a3a4a', e * .062, .022, .158, 1, 1.15, .5), S(.007, '#fff', e * .062 + .008, .032, .167), B(.06, .012, .02, L.hair, e * .062, .075, .15, 0, 0, -e * .1), S(.03, '#e88f7a', e * .09, -.04, .12, 1, .6, .4)));
    hd.push(O(.04, .008, '#a2433a', 0, -.06, .145, .2, 0, Math.PI + .4, 2.35));
    const H = L.hair;
    if (L.style !== 'bald') hd.push(S(.185, H, 0, .055, -.035, .98, .95, .95), S(.1, H, .07, .14, .07, 1.1, .5, .8), S(.1, H, -.07, .14, .07, 1.1, .5, .8)); 
    if (L.style === 'long') hd.push(R(.34, .46, .14, H, 0, -.14, -.12, 0, 0, 0, .07), S(.07, H, .16, -.12, 0, .7, 2.4, 1), S(.07, H, -.16, -.12, 0, .7, 2.4, 1)); if (L.style === 'bob') hd.push(S(.19, H, 0, -.06, -.05, 1.03, 1, .85)); if (L.style === 'pony') hd.push(S(.09, H, 0, .1, -.2), P(.065, .26, H, 0, -.1, -.25, .25), O(.05, .02, L.detail ?? '#d0405a', 0, .1, -.18)); if (L.style === 'bun') hd.push(S(.1, H, 0, .2, -.1));
    if (L.style === 'spiky') [-.1, -.03, .05, .12].forEach((x, i) => hd.push(K(.06, .13, H, x, .21, .04 - i % 2 * .08, .2, 0, -x * 3)));
    if (L.beard) hd.push(S(.12, H, 0, -.1, .06, 1.1, .7, .95)); if (L.glasses) hd.push(O(.045, .008, '#2a2a30', .062, .025, .165), O(.045, .008, '#2a2a30', -.062, .025, .165), B(.03, .01, .01, '#2a2a30', 0, .03, .17));
    if (L.hat) { if (L.hat === 'chef') hd.push(C(.17, .15, .12, '#fff', 0, .22, 0), S(.19, '#fff', 0, .32, 0, 1, .6, 1)); else if (L.hat === 'paja') hd.push(C(.32, .32, .02, '#e3c98e', 0, .13, 0), C(.15, .18, .14, '#e3c98e', 0, .2, 0)); else if (L.hat === 'corona') hd.push(C(.17, .15, .1, '#f0c040', 0, .22, 0), ...[0, 1, 2, 3, 4].map(i => K(.04, .1, '#f0c040', Math.sin(i * 1.257) * .15, .31, Math.cos(i * 1.257) * .15))); else if (L.hat === 'boina') hd.push(S(.2, '#8a2f3f', .03, .17, -.02, 1.1, .4, 1.1)); else hd.push(S(.19, L.hat, 0, .09, -.01, 1, .9, 1), R(.24, .02, .18, L.hat, 0, .11, .2)); }
    this.head.add(mesh(hd)); this.head.position.y = sh + .3 * (k ? 1.06 : 1); this.head.scale.setScalar(hs); this.body.add(this.head);
    for (const e of [-1, 1]) {
      const a = new T.Group(); a.position.set(e * .26, sh - .06, 0); a.add(mesh([P(.065, .2, L.top, 0, -.13, 0)])); const f = new T.Group(); f.position.y = -.27; f.add(mesh([P(.055, .17, L.dress || k ? L.skin : L.top, 0, -.1, 0), S(.062, L.skin, 0, -.25, 0)])); a.add(f); this.body.add(a); this.arms.push(a); this.fore.push(f);
      const l = new T.Group(), lh = hip / 2; l.position.set(e * .1, hip, 0); l.add(mesh([P(.085, lh - .16, L.dress ? L.skin : L.bottom, 0, -lh / 2, 0)])); const z = new T.Group(); z.position.y = -lh; z.add(mesh([P(.072, lh - .2, L.dress ? L.skin : L.bottom, 0, -lh / 2 + .04, 0), R(.14, .1, .27, L.shoe, 0, -lh + .05, .05, 0, 0, 0, .04)])); l.add(z); this.body.add(l); this.legs.push(l); this.shin.push(z);
    }
  }
  setHold(o: T.Object3D | null) { if (this.hold) this.hold.removeFromParent(); this.hold = o; if (o) { o.position.set(0, -.28, .08); this.fore[1].add(o); } }
  update(dt: number, speed = 0, air = false) {
    this.phase += dt * (speed > .2 ? 3 + speed * 1.75 : 1.6); const tgt = Math.min(1, speed / 4.5); this.amp += (tgt - this.amp) * Math.min(1, dt * 9); const a = this.amp, p = this.phase;
    for (let i = 0; i < 2; i++) { const s = i ? 1 : -1, w = Math.sin(p) * s; this.legs[i].rotation.x = this.sit ? -1.5 : air ? (i ? -.7 : .3) : w * .85 * a; this.shin[i].rotation.x = this.sit ? 1.5 : air ? .8 : Math.max(0, -Math.cos(p) * s) * 1.1 * a; this.arms[i].rotation.x = air ? -1.2 : -w * .75 * a + Math.sin(p * .6) * .02; this.arms[i].rotation.z = s * (.09 + Math.sin(p * .5) * .015 * (1 - a)); this.fore[i].rotation.x = -.18 - a * .55; }
    if (this.hold) { this.arms[1].rotation.x = -.55; this.fore[1].rotation.x = -.9; }
    if (this.wave > 0) { this.wave -= dt; this.arms[1].rotation.z = 2.5 + Math.sin(p * 5 + this.wave * 10) * .3; this.arms[1].rotation.x = 0; this.fore[1].rotation.x = -.3; }
    if (this.talk > 0) { this.talk -= dt; this.arms[0].rotation.x = -.5 + Math.sin(this.talk * 5) * .25; this.fore[0].rotation.x = -1; this.head.rotation.x = Math.sin(this.talk * 7) * .06; } else this.head.rotation.x *= .9;
    this.head.rotation.y = Math.sin(p * .23) * .18 * (1 - a); this.body.position.y = Math.abs(Math.sin(p)) * .045 * a + Math.sin(p) * .006 * (1 - a) - (this.sit ? .42 * this.look.h / 1.75 : 0); this.body.rotation.x = a * .07; this.body.rotation.z = Math.sin(p) * .025 * a;
  }
}
