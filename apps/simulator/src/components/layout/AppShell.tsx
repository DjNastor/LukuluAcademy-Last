import { DashboardPage } from '../../app/routes/DashboardPage';
import { LessonsPage } from '../../app/routes/LessonsPage';
import { SimulatorPage } from '../../app/routes/SimulatorPage';
import { useHashRoute } from '../../app/routes/useHashRoute';
import { MainToolbar } from './MainToolbar';
import { StatusBar } from './StatusBar';
import { TopHeader } from './TopHeader';

export function AppShell() {
  const route = useHashRoute();
  const isSimulator = route === 'simulator';

  return (
    <div
      className={isSimulator ? 'app-shell simulator-mode' : 'app-shell'}
      aria-label="Lukulu Academy DAW Learning Lab workspace"
    >
      {!isSimulator && <TopHeader />}
      {!isSimulator && <MainToolbar activeRoute={route} />}
      {route === 'dashboard' && <DashboardPage />}
      {route === 'lessons' && <LessonsPage />}
      {route === 'simulator' && <SimulatorPage />}
      {!isSimulator && <StatusBar />}
    </div>
  );
}
