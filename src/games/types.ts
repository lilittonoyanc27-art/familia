import type { ComponentType } from 'react';
import type { Level, MemberId, P } from '../core/types';
export type Seat = { kind: 'm'; id: MemberId } | { kind: 'cpu'; name: string };
export interface GameProps { level: Level; me: MemberId; seats: Seat[]; cfg: Record<string, unknown>; finish: (r: { score: number; won?: boolean; winner?: number }) => void; tick: () => number }
export type GameComp = ComponentType<GameProps>;
export interface GameDef { id: string; p: P; d: P; owner: MemberId | 'todos'; kind: 'score' | 'board'; seats?: [number, number]; cpu?: boolean; prop: string; load: () => Promise<{ default: GameComp }>; cfg?: Record<string, unknown> }
