import { useEffect, useState } from 'react';
import { getRouteFromHash, type AppRoute } from './router';

export function useHashRoute() {
  const [route, setRoute] = useState<AppRoute>(() =>
    getRouteFromHash(window.location.hash),
  );

  useEffect(() => {
    const handleHashChange = () => setRoute(getRouteFromHash(window.location.hash));
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return route;
}
