import { useEffect, useMemo, useState } from 'react';
import type { GameProps } from '../types';
import { Es, Btn } from '../../ui/kit';
import { thumb, propKeys } from '../../three/props';
import { wp } from '../../data/vocab';
import { pick, shuffle } from '../../core/util';
import { sfx } from '../../core/audio';
import { speak } from '../../core/speech';
import { st } from '../../core/store';
/** Пазл из картинки, нарисованной по 3D-моделям сцены. */
export default function Puzle({ level, finish }: GameProps) {
  const n = level === 'A1' ? 3 : level === 'A2' ? 4 : 5; const ks = useMemo(() => shuffle(propKeys().filter(k => wp(k)[1] !== k)).slice(0, 4), []), main = ks[0]; const [img, setImg] = useState(''); const [ord, setOrd] = useState(() => shuffle([...Array(n * n).keys()])), [sel, setSel] = useState(-1), [mv, setMv] = useState(0);
  useEffect(() => { const c = document.createElement('canvas'); c.width = c.height = 512; const g = c.getContext('2d')!; const gr = g.createLinearGradient(0, 0, 0, 512); gr.addColorStop(0, '#9fd3ee'); gr.addColorStop(.62, '#fbe7c4'); gr.addColorStop(.62, '#8fbf68'); gr.addColorStop(1, '#6fa04f'); g.fillStyle = gr; g.fillRect(0, 0, 512, 512); g.fillStyle = '#ffe9a8'; g.beginPath(); g.arc(420, 90, 46, 0, 7); g.fill(); let k = 0; const draw = (src: string, x: number, y: number, s: number) => new Promise<void>(r => { const im = new Image(); im.onload = () => { g.drawImage(im, x, y, s, s); r(); }; im.src = src; }); Promise.all([draw(thumb(ks[1]), 10, 250, 170), draw(thumb(ks[2]), 330, 260, 170), draw(thumb(ks[3]), 40, 40, 130)]).then(() => draw(thumb(main), 120, 150, 290)).then(() => { g.font = '42px "Yeseva One",serif'; g.fillStyle = '#1f2a44'; g.textAlign = 'center'; g.fillText(wp(main)[0], 256, 492); setImg(c.toDataURL()); k++; }); void k; }, []);
  const tap = (i: number) => { if (sel < 0) { setSel(i); sfx('click'); return; } const o = [...ord];[o[sel], o[i]] = [o[i], o[sel]]; setOrd(o); setSel(-1); setMv(mv + 1); sfx('place'); if (o.every((v, k) => v === k)) { sfx('win'); speak(wp(main)[0]); st().learn(wp(main)[0], wp(main)[1]); setTimeout(() => finish({ score: Math.min(100, 100 - Math.max(0, mv + 1 - n * n) * 2) }), 900); } };
  return <div className="board2d" style={{ ['--bg' as string]: '#4a3a5c' }}>{img && <div className="cells" style={{ gridTemplateColumns: `repeat(${n},1fr)`, width: 'min(480px,94vw)', gap: 2 }}>{ord.map((v, i) => <button key={i} type="button" className="cell" aria-label={`Часть ${v + 1}`} onClick={() => tap(i)} style={{ backgroundImage: `url(${img})`, backgroundSize: `${n * 100}% ${n * 100}%`, backgroundPosition: `${(v % n) / (n - 1) * 100}% ${Math.floor(v / n) / (n - 1) * 100}%`, borderRadius: 2, outline: sel === i ? '4px solid #f0c040' : v === i ? '' : '1px solid rgba(0,0,0,.2)' }} />)}</div>}<div className="side"><Es p={['Cambia dos piezas para ordenar la imagen.', 'Меняй две части местами, чтобы собрать картинку.']} />{img && <img src={img} width={120} height={120} alt="" style={{ borderRadius: 10 }} />}<Es p={[`Movimientos: ${mv}`, `Ходов: ${mv}`]} /><Btn small p={['Ver la palabra', 'Показать слово']} onClick={() => st().translate(wp(main))} /></div></div>;
}
void pick;
