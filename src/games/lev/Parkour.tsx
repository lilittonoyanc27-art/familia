import * as T from 'three';
import { useMemo, useRef, useState } from 'react';
import { StageView, lookFor, type Stage } from '../../three/stage';
import { B, label, mesh } from '../../three/geo';
import { prop, hasProp, fit } from '../../three/props';
import { wordsFor } from '../../core/question';
import { propKey } from '../../data/vocab';
import type { GameProps } from '../types';
import { Es, Say } from '../../ui/kit';
import { rnd, sample } from '../../core/util';
import { sfx } from '../../core/audio';
import { speak } from '../../core/speech';
import { st } from '../../core/store';
import type { P } from '../../core/types';
export default function Parkour({ level, me, finish, tick }: GameProps) {
  const N = level === 'A1' ? 7 : 9; const qs = useMemo(() => sample(wordsFor(level), N).map(w => ({ w, o: sample(wordsFor(level).filter(x => x.ru !== w.ru), 1)[0], left: rnd(2) === 0 })), []); const [i, setI] = useState(0), falls = useRef(0);
  const setup = (s: Stage) => {
    s.scene.background = new T.Color('#f2b98a'); s.scene.fog = new T.Fog('#f2c9a0', 40, 130); s.hemi.intensity = 1.5; s.dist = 8; s.pitch = .42; s.floorY = -99; s.killY = -14; s.speed = 5; s.jumpV = 7; s.setShadow(24); s.addPlayer(lookFor(me), 0, 2, 1, Math.PI); s.yaw = 0; let cp = new T.Vector3(0, 1.2, 2), done = 0, over = false;
    const plat = (x: number, y: number, z: number, w: number, d: number, c: string) => { const m = mesh([B(w, .5, d, c, 0, -.25, 0), B(w * .8, .5, d * .8, '#8d6f52', 0, -.7, 0), B(w * .5, .6, d * .5, '#7a5f45', 0, -1.2, 0)]); m.position.set(x, y, z); s.scene.add(m); const b = s.box(x, z, w, d, .5, y - .5); return { m, b, x, y, z }; }; plat(0, 1, 2, 6, 6, '#69a94d'); let z = -2, y = 1; const rows: { z: number; y: number; ok: ReturnType<typeof plat>; bad: ReturnType<typeof plat>; hit: boolean; badHit: boolean }[] = [];
    qs.forEach((q, k) => { z -= 4.2; y += .5; const st0 = plat(0, y, z, 2.2, 1.8, '#d9a85f'); if (k % 2 && level !== 'A1') s.upd.push((_, t) => { const nx = Math.sin(t * .9 + k) * 1.3; st0.m.position.x = nx; st0.b.x0 = nx - 1.1; st0.b.x1 = nx + 1.1; }); z -= 4.6; y += .55; const a = plat(-2.3, y, z, 3, 2.8, '#4f8fb5'), b = plat(2.3, y, z, 3, 2.8, '#4f8fb5'); [[a, q.left], [b, !q.left]].forEach(([p, ok]) => { const pl = p as typeof a, w = ok ? q.w : q.o; const l = label(w.es, 1.5); l.position.set(pl.x, y + 2.5, z); s.scene.add(l); const k2 = propKey(w.es); if (level === 'A1' && hasProp(k2)) { const o = fit(k2, .7); o.position.set(pl.x + 1, y, z - .8); s.scene.add(o); } }); rows.push({ z, y, ok: q.left ? a : b, bad: q.left ? b : a, hit: false, badHit: false }); z -= 3.9; y += .4; plat(0, y, z, 4, 2.6, '#69a94d'); });
    z -= 4.4; y += .3; plat(0, y, z, 6, 6, '#e6c65a'); const pr = prop('premio', 2); pr.position.set(0, y, z); s.scene.add(pr); s.upd.push(d => pr.rotation.y += d); s.item({ obj: pr, p: ['el premio', 'приз'], r: 2.4, act: ['Coger', 'Взять'], use: () => { if (over) return; over = true; sfx('win'); finish({ score: 100 - falls.current * 7 - Math.max(0, tick() - 160) * .1 }); } }); for (let k = 0; k < 26; k++) { const c = mesh([B(5 + rnd(6), 1, 3 + rnd(4), '#fff6ea')], undefined, false); c.position.set((Math.random() - .5) * 90, -8 - Math.random() * 12, 10 - Math.random() * 140); s.scene.add(c); }
    s.onFall = () => { falls.current++; sfx('bad'); s.pos.copy(cp); s.vy = 0; };
    s.upd.push(dt => { rows.forEach((r, k) => { if (!r.hit && s.ground && Math.abs(s.pos.z - r.z) < 1.5 && Math.abs(s.pos.y - r.y) < .3) { if (Math.sign(s.pos.x) === Math.sign(r.ok.x)) { r.hit = true; sfx('ok'); speak(qs[k].w.es); st().learn(qs[k].w.es, qs[k].w.ru); cp = new T.Vector3(r.ok.x, r.y + .2, r.z); done = k + 1; setI(done); } else if (!r.badHit) { r.badHit = true; r.bad.b.off = true; falls.current++; sfx('bad'); st().learn(qs[k].w.es, qs[k].w.ru, false); st().toast([`Era: ${qs[k].w.es}`, `«${qs[k].w.ru}» — это ${qs[k].w.es}`], 'bad'); } } if (r.badHit && r.bad.b.off && r.bad.m.position.y > -20) r.bad.m.position.y -= dt * 9; }); });
  };
  const q = qs[i]; const t: P = ['¡Coge el premio!', 'Возьми приз!'];
  return <StageView setup={setup}>{() => <div className="goal">{q ? <><Es p={['Salta a la palabra:', 'Прыгай на слово:']} className="q-title" /><div style={{ fontSize: 22, fontWeight: 800 }}>{q.w.ru}</div></> : <Es p={t} as="h3" />}<div>{i} / {N}</div></div>}</StageView>;
}
void Say;
