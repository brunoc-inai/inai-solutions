import { useGameStore } from './engine/gameState';
import TitleScreen from './screens/TitleScreen';
import CongressSetup from './screens/CongressSetup';
import MinistrySetup from './screens/MinistrySetup';
import ChapterScreen from './screens/ChapterScreen';
import EventScreen from './screens/EventScreen';
import PhaseReport from './screens/PhaseReport';
import RankingScreen from './screens/RankingScreen';
import MinisterConsult from './components/MinisterConsult';

export default function App() {
  const screen = useGameStore(s => s.screen);
  const pendingEvent = useGameStore(s => s.pendingEvent);
  const showMinisters = screen !== 'title';

  return (
    <>
      {screen === 'title' && <TitleScreen />}
      {screen === 'congress-setup' && <CongressSetup />}
      {screen === 'ministry-setup' && <MinistrySetup />}
      {(screen === 'chapter' || screen === 'event') && <ChapterScreen />}
      {screen === 'phase-report' && <PhaseReport />}
      {screen === 'ranking' && <RankingScreen />}
      {pendingEvent && screen === 'event' && <EventScreen />}
      {showMinisters && <MinisterConsult />}
    </>
  );
}
