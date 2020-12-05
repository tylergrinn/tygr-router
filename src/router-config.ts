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

export class PageObject {
  public path: string;
  public children?: PageObject[];
  public redirectTo?: string;

  public constructor(page: Page | string) {
    if (typeof page === 'string') {
      this.path = page;
    } else {
      this.path = page.path;
      this.redirectTo = page.redirectTo;
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
    this.baseUrl = config.baseUrl || '';
    this.fallback = config.fallback ? `/${config.fallback}` : '';

    this.pages = config.pages.map((p) => new PageObject(p));
  }
}
