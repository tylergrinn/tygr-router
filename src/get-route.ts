import type { PageObject, RouterConfigObject } from './router-config';

export default function getRoute(
  config: RouterConfigObject,
  pathname: string
): string {
  const tokens = pathname.split('/').slice(1);
  let children: PageObject[] | undefined = config.pages;
  let route = '';

  for (let i = 0; i < tokens.length; i++) {
    if (!children) {
      return config.fallback;
    }

    const page: PageObject | undefined = children.find(
      (p) => p.path === tokens[i]
    );
    if (!page) return config.fallback;

    if (page.redirectTo)
      return getRoute(
        config,
        page.redirectTo[0] === '/'
          ? page.redirectTo
          : route + '/' + page.redirectTo
      );

    const LAST = i === tokens.length - 1;

    if (!page.children && !LAST) return config.fallback;

    if (LAST && page.children && page.children.some((p) => p.path === '')) {
      console.log('Extra page');
      tokens.push('');
    }

    route += '/' + page.path;

    if (page.children) children = page.children;
    else return route;
  }

  return route;
}
