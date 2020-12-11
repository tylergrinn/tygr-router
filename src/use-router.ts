import { useMemo, useState } from 'react';
import getRoute from './get-route';
import getRoutes from './get-routes';
import resolve from './resolve';
import { RouterConfig, RouterConfigObject } from './router-config';
import useEventListener from './use-event-listener';

export default function useRouter(
  c: RouterConfig
): [any, (path: string) => () => void, string] {
  const config = useMemo(() => new RouterConfigObject(c), [c]);
  const routes = useMemo(() => getRoutes(config), [c]);

  const [route, setRoute] = useState(routes[0]);

  const router = { 'data-route-state': route };

  const handleRouteChange = () => {
    const loc = window.location.pathname.replace(config.baseUrl, '');
    const route = getRoute(config, loc);

    if (
      route !== config.fallback &&
      config.baseUrl + route !== window.location.pathname
    )
      history.pushState(null, route, config.baseUrl + route);
    setRoute(route);
  };

  useEventListener(window, 'popstate', handleRouteChange);
  useMemo(handleRouteChange, []);

  const goto = (to: string) => () => {
    console.log('Route', route);
    if (to.slice(0, 2) === '..') to = `../${to}`;
    const newRoute = getRoute(config, resolve(route, to));
    history.pushState(null, newRoute, config.baseUrl + newRoute);
    setRoute(newRoute);
  };

  return [router, goto, route];
}
