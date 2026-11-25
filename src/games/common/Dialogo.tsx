import { useState } from 'react';
import type { GameProps } from '../types';
import { Btn, Dialogue, Es } from '../../ui/kit';
import { DIALOGUES, dlg } from '../../data/dialogues';
import { memberOf } from '../../core/types';
import { useStore } from '../../core/store';
export default function Dialogo({ cfg, me, finish }: GameProps) {
  const [id, setId] = useState<string | null>((cfg.id as string) ?? null); const best = useStore(s => s.profiles[me].best);
  if (!id) return <div className="board2d"><div className="side" style={{ width: 'min(820px,100%)', maxHeight: 'none' }}><Es p={['Elige una conversación', 'Выбери разговор']} as="h2" /><div className="grid">{DIALOGUES.map(d => <div key={d.id} className="box"><small className="gold">{d.level}</small><Es p={d.p} as="h3" />{best['d:' + d.id] && <small>{best['d:' + d.id].score}%</small>}<div><Btn small kind="main" p={['Hablar', 'Поговорить']} onClick={() => setId(d.id)} /></div></div>)}</div></div></div>;
  const d = dlg(id); return <div className="board2d" style={{ ['--bg' as string]: '#23716d' }}><div className="side" style={{ width: 'min(620px,100%)', maxHeight: 'none' }}><Es p={d.p} as="h2" /><Dialogue lines={d.lines} me={memberOf(me).es} onDone={s => finish({ score: s })} /></div></div>;
}
