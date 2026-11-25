import { useEffect } from 'react';
import { useStore } from './core/store';
import { CityWorld, RoomWorld } from './world/Worlds';
import { GameHost } from './games/Host';
import { Title, PauseMenu, Games, Missions, MissionPage, Tournament, Profile, Dictionary, Shop, MapPage, Settings } from './ui/pages';
import { TransCard, Toasts } from './ui/kit';
export default function App() {
  const sc = useStore(s => s.screen);
  useEffect(() => { const k = (e: KeyboardEvent) => { if ((e.key === 'Escape' || e.key === 'p' || e.key === 'P') && !/INPUT|SELECT/.test((e.target as HTMLElement).tagName)) { if (useStore.getState().card) return; if (document.pointerLockElement) return; useStore.setState(s => ({ paused: !s.paused })); } }; const vis = () => { if (document.hidden && useStore.getState().screen.k !== 'title') useStore.setState({ paused: true }); }; addEventListener('keydown', k); document.addEventListener('visibilitychange', vis); return () => { removeEventListener('keydown', k); document.removeEventListener('visibilitychange', vis); }; }, []);
  let body: React.ReactNode = null;
  if (sc.k === 'title') body = <Title />; else if (sc.k === 'city') body = <CityWorld />; else if (sc.k === 'room') body = <RoomWorld key={sc.id} id={sc.id} />; else if (sc.k === 'game') body = <GameHost key={sc.id + JSON.stringify(sc.cfg ?? {}) + (sc.mission?.step ?? '')} />;
  else { const id = sc.id; body = id === 'juegos' ? <Games /> : id.startsWith('juegos-') ? <Games who={id.slice(7)} /> : id === 'misiones' ? <Missions /> : id.startsWith('mision:') ? <MissionPage id={id.slice(7)} /> : id === 'torneo' ? <Tournament /> : id === 'perfil' ? <Profile /> : id === 'diccionario' ? <Dictionary /> : id === 'tienda' ? <Shop /> : id === 'mapa' ? <MapPage /> : <Settings />; }
  return <div className="app" style={{ ['--me' as string]: undefined }}>{body}<PauseMenu /><TransCard /><Toasts /></div>;
}
