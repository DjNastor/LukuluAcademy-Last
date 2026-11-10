export type AppRoute = 'dashboard' | 'lessons' | 'simulator';

const routeMap: Record<string, AppRoute> = {
  dashboard: 'dashboard',
  lessons: 'lessons',
  simulator: 'simulator',
};

export function getRouteFromHash(hash: string): AppRoute {
  const normalized = hash.replace(/^#\/?/, '').trim();
  return routeMap[normalized] ?? 'dashboard';
}

export function navigateTo(route: AppRoute) {
  window.location.hash = `/${route}`;
}
