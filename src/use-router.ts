import useSwitch from '@tygr/switch';
import { useMemo } from 'react';
import getRoute from './get-route';
import getRoutes from './get-routes';
import { RouterConfig, RouterConfigObject } from './router-config';
import useEventListener from './use-event-listener';

const escape = (str: string) => str.replace(/\//g, '__');

export default function useRouter(
  c: RouterConfig
): [any, (path: string) => () => void, string] {
  const config = useMemo(() => new RouterConfigObject(c), [c]);
  const routes = useMemo(() => getRoutes(config).map(escape), [c]);

  const [router, setRoute, ...flags] = useSwitch({ name: 'route' }, ...routes);
  const route = routes[flags.indexOf(true)];

  const handleRouteChange = () => {
    const pathname = window.location.pathname.replace(config.baseUrl, '');
    const route = getRoute(config, pathname);

    if (
      route !== config.fallback &&
      config.baseUrl + route !== window.location.pathname
    )
      history.pushState(null, route, config.baseUrl + route);
    setRoute(escape(route))();
  };

  useEventListener(window, 'popstate', handleRouteChange);
  useMemo(handleRouteChange, []);

  const goto = (pathname: string) => () => {
    const route = getRoute(config, pathname);
    history.pushState(null, route, config.baseUrl + pathname);
    setRoute(escape(route))();
  };

  return [router, goto, route];
}
