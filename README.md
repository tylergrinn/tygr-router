# Tygr Router

[Demo](https://tylergrinn.github.io/tygr-router)

[Forking Guide](https://github.com/tylergrinn/tygr-logo/blob/main/docs/forking.md)

This is a react router hook built with sass.

The router layout will share as much html as it can between the different routes, allowing for smooth transitions.

## Why?

- Simple API\
  Only one function, only one sass mixin, very basic router config interface
- Limit DOM mutations\
  The most expensive part of any javascript framework is updating the DOM. This library instead compiles all possible routes to a css file. Instead of adding and removing elements, the css file will hide and show them as needed. The only DOM manipulation that occurs during a route change is a single attribute in the top most element of the router.
- Smaller build for small projects\
  The javascript footprint is trivial; most of the logic is in the generated css file. The largest factor to the size of the css is the level of the deepest route. For the project in the demo folder:
  | deepest level | built css size |
  | ------------- | -------- |
  | (2) /i/i0 | 18 KB |
  | (3) /i/j/j0 | 23 KB |
  | (4) /i/j/k/k0 | 32 KB |
  | (5) /i/j/k/l/l0 | 48 KB |

## Requirements:

- A react application built with node (webpack, rollup, babel)
- Sass compiler

See the `demo/webpack.config.js` file for an example of using react and sass with webpack. The `package.json` has the babel config.

## Installation:

```cmd
npm i --save @tygr/router node-sass-json-importer
```

## Step 1: Define your router

The router needs to be defined exactly the same for your sass code and javascript. The easiest way to do that is to use the [node-sass-json-importer](https://www.npmjs.com/package/node-sass-json-importer) and define your router in a separate file that can be loaded by both sass and javascript. You can see an example of this in the `demo` folder.

The router definition must export a variable named `router` or, if using json, have a top level key named `router`. Within that variable, the following properties are available:

_All absolute paths should begin with '/' and all relative paths should not_

**Router**

| property | required | type                   | description                                                                                                              |
| -------- | -------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| baseUrl  | optional | absolute path          | The base path of your website. If your website is hosted on domain.com/my-site, you should use '/my-site' as the baseUrl |
| fallback | optional | relative path          | This is the route that will be displayed if no other route matches the current url. Defaults to the baseUrl              |
| pages    | required | (Page or string) array | The pages you want to show                                                                                               |

_Pages can be specified by a string or by using the following interface_

**Page**

| property   | required | type                      | description                                                                 |
| ---------- | -------- | ------------------------- | --------------------------------------------------------------------------- |
| path       | required | relative path             | The name of the route                                                       |
| redirectTo | optional | relative or absolute path | If a user reaches this page, they will be redirected to the redirectTo url. |
| children   | optional | (Page or string) array    | Any children pages that this page has                                       |

Here is an example router config:

```js
module.exports.router = {
  fallback: '404',
  pages: [
    '', // Use an empty string for the root page
    'page-1',
    {
      path: 'page-2',
      children: {
        'child-1',
        'child-2',
      }
    },
    {
      path: 'redirect',
      redirectTo: '/page-2/child-2', // Could also relative path: 'page-2/child-2'
    }
  ]
};
```

## Step 2: use the router hook in your component

```jsx
import React from 'react';
import useRouter from '@tygr/Router';
import { router as routerConfig } from './router';

export default function App() {
  const [router, goto, currentRoute] = useRouter(routerConfig);

  return (
    <div {...router} className="router">
      ...
    </div>
  );
}
```

The `useRouter` hook takes an config object that matches the interface described in step 1. This should match the one used in the `router` mixin in step 3. It returns a router container object and a function to set the current route, as well as the current route as a string.

Spread the router container object returned from the `useRouter` hook over the parent element of the router as shown above.

## Step 3: use the router sass mixin

```scss
@use '@tygr/router';
@import 'router.js';

.router {
  @include router.router($router);
}
```

The `router` sass mixin takes in a config object that matches the interface described in step 1. This should match the one used in the `useRouter` hook in step 2. You should always enclose this mixin within a selector, just like above, because it makes use of the sass parent selector: `&`. The selector must target the same element that you spread the router container object over in step 2.

## Step 4: hide and show routes conditionally using `data-route`

```jsx
<span data-route="/register">Only shown on register page</span>

<span data-route="/login /register">Shown on login and register pages</span>
```

For elements you want to conditionally show or hide, add the `data-route` attribute with a list of the absolute routes you would like it to show up under.

## Step 5: Use the goto function to change routes

```jsx
<button onClick={goto('/login')}>Goto login</button>
```

Use the `goto` higher order function returned from the `useRouter` hook in order to change routes on button click. The route must be absolute.

# Optional syntaxes

In addition to the absolute paths, you can use these operators in the `data-route` attribute to handle more complex logic

| name          | usage   | description                                                                                                                                                      |
| ------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "starts with" | ^/route | display an element on all paths that begin with '/route'                                                                                                         |
| partial       | ~/child | Use the nearest parent `data-route` attribute and append this route to it when determining whether to display the element. Useful for avoiding typing long paths |
| exclusionary  | !/route | display an element on all paths that don't match /route.                                                                                                         |

## "Starts with" syntax `[^]`

```jsx
<span data-route="^/route">Display on all routes that start with /route</span>
```

The "starts with" syntax only works on full path tokens. What that means is that `^/route` will not match `/routeeee` but will match `/route/eee`

This syntax can be combined with other "starts with" routes or absolute paths in a single `data-route` attribute.

## Partial syntax `[~]`

```jsx
<div data-route="^/some/long/route">
  <span data-route="~/child1">Child 1</span>
  <span data-route="/some/long/route/child1">Equivalent, but more verbose</span>
</div>
```

If you are using a "starts with" syntax to display child routes, any child of that element can piggy back off the route specified by the parent rather than having to specify a full absolute path.

The partial syntax is recursive: grandchildren can use the path of their parent partial `data-route` attribute.

```jsx
<div data-route="^/parent">
  <div data-route="~/child">
    <span data-route="~/grandchild">
      Display when route is /parent/child/grandchild
    </span>
    <span data-route="/parent/child/grandchild">
      Equivalent, but more verbose
    </span>
  </div>
</div>
```

This syntax is exclusive: only a single route can be specified for an element with a partial.

## Exclusionary syntax `[!]`

```jsx
<span data-route="!/login !/reset-password">
  Show on any route except /login and /reset-password
</span>
```

By using the `!` operator, you can exclude an element from a certain route rather than the default additive behavior.

This syntax takes precedence: if a single route is specified with `!`, any absolute routes that are also specified for that element will be ignored.

# Use custom css for route transitions

By default, an element with the `data-route` attribute for conditional rendering is given the `display: none` and `pointer-events: none` css properties when the route is not active.

You may replace that logic with your own by passing content to the `router` mixin:

## Using transitions

```scss
@import '@tygr/router';
@import 'router.js';

.router {
  [data-route] {
    transition: opacity 1s;
  }

  @include router.router($router) {
    /**
    * These styles are applied when the data-route
    * attribute *DOES NOT* match the current route
    */
    opacity: 0;
  }
}
```

## Using animations

```scss
@import '@tygr/router';
@import 'router.js';

.router {
  [data-route] {
    animation: _fade-in 1s;
  }

  @include router.router($router) {
    animation: _fade-out 1s forwards;
  }
}

@keyframes _fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes _fade-out {
  to {
    opacity: 0;
  }
}
```

## Specify styles for a specific route using the `routeChild` mixin

```scss
@import '@tygr/router';
@import 'router.js';

.router {
  @include router.router($router);
}

.green {
  @include router.routeChild('/some/route', 'some/other/route') {
    // These styles are applied when the specified route(s) are active
    color: green;
  }
}
```

The routeChild mixin takes in any number of absolute routes and applies styles to the parent selector when those routes are active. The targeted element **does not** need to use the `data-auth` attribute.

## Specify inactive styles for specific elements

By using the sass parent selector `&`, you can specify different behavior for a route depending on any css selector:

```scss
@import '@tygr/router';
@import 'router.js';

.fade {
  transition: opacity 1s;
}

.router {
  @include router.router($router) {
    display: none;
    pointer-events: none;

    &.fade {
      // Override behavior
      display: unset;
      pointer-events: unset;
      // Alternatively you can wrap above styles in a `&:not(.fade)` selector)

      /*
       * If an element has the fade class and data-route attribute, it will fade
       * out rather than dissapear when inactive
       */
      opacity: 0;
    }
  }
}
```
