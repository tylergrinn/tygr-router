export interface Page {
  path: string;
  children?: (Page | string)[];
  redirectTo?: string;
}

export interface RouterConfig {
  baseUrl?: string;
  fallback?: string;
  pages: (Page | string)[];
}

export interface Route {
  path: string;
  params: any;
  query: URLSearchParams;
}

const unescape = (str: string) => str.replace(/['"]/g, '');

export class PageObject {
  public path: string;
  public children?: PageObject[];
  public redirectTo?: string;

  public constructor(page: Page | string) {
    if (typeof page === 'string') {
      this.path = unescape(page);
    } else {
      this.path = unescape(page.path);
      this.redirectTo = page.redirectTo ? unescape(page.redirectTo) : undefined;
      if (page.children) {
        this.children = page.children.map((c) => new PageObject(c));
      }
    }
  }
}

export class RouterConfigObject {
  public baseUrl: string;
  public fallback: string;
  public pages: PageObject[];

  public constructor(config: RouterConfig) {
    this.baseUrl = config.baseUrl ? unescape(config.baseUrl) : '';
    this.fallback = config.fallback ? unescape(config.fallback) : '/';

    this.pages = config.pages.map((p) => new PageObject(p));
  }
}
