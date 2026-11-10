import { navigateTo, type AppRoute } from '../../app/routes/router';

const toolbarItems: Array<{ label: string; route: AppRoute }> = [
  { label: 'Dashboard', route: 'dashboard' },
  { label: 'Lessons', route: 'lessons' },
  { label: 'Simulator', route: 'simulator' },
];

interface MainToolbarProps {
  activeRoute: AppRoute;
}

export function MainToolbar({ activeRoute }: MainToolbarProps) {
  return (
    <nav className="main-toolbar" aria-label="Primary learning tools">
      {toolbarItems.map((item) => (
        <button
          type="button"
          key={item.route}
          className={activeRoute === item.route ? 'active' : undefined}
          aria-current={activeRoute === item.route ? 'page' : undefined}
          onClick={() => navigateTo(item.route)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
