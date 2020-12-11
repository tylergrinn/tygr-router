import type { PageObject, RouterConfigObject } from './router-config';

export default function getRoutes(config: RouterConfigObject): string[] {
  const getRoutesForPage = (page: PageObject, prepend: string): string[] => {
    if (page.children) {
      return page.children.reduce((routes, child) => {
        routes.push(prepend + page.path);
        routes.push(...getRoutesForPage(child, prepend + page.path));
        return routes;
      }, [] as string[]);
    }

    return [prepend + page.path];
  };
  return config.pages.reduce((routes, page) => {
    routes.push(...getRoutesForPage(page, ''));
    return routes;
  }, [] as string[]);
}
