import type { Page, RouterConfigObject } from './router-config';

export default function getRoutes(config: RouterConfigObject): string[] {
  const getRoutesForPage = (prepend: string, page: Page | string): string[] => {
    if (typeof page === 'string') {
      return [prepend + '/' + page];
    }
    if (page.children) {
      return page.children.reduce((routes, child) => {
        routes.push(...getRoutesForPage(prepend + '/' + page.path, child));
        return routes;
      }, [] as string[]);
    }

    return [prepend + '/' + page.path];
  };
  return config.pages.reduce((routes, page) => {
    routes.push(...getRoutesForPage('', page));
    return routes;
  }, [] as string[]);
}
