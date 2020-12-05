# Tygr Router

[Demo](https://tylergrinn.github.io/tygr-router)

[Forking Guide](https://github.com/tylergrinn/tygr-router/blob/main/docs/forking.md)

This is a react component packaged for three environments: node, browser, and standalone.

- Node is reccommended. If you are already using react in the project, this library simply exports a react component function you can use directly in jsx.

- Browser is for fast prototyping in the browser. You can add this component via a script tag. The react and react-dom script tags must be placed before the component script.

- Standalone is for projects that do not use react. It exposes the `mount` function, which takes an HTML element.

## Node

Installation:

```cmd
npm i --save @tygr/router
```

Usage (jsx):

```jsx
import Router from '@tygr/router';

// Import styles. Make sure there is a style loader specified in your
// webpack config
import '@tygr/router/lib/tygr-router.min.css';

export default function MyComponent() {
  return (
    <div>
      <h1>Router usage example</h1>
      <Router />
    </div>
  );
}
```

## Browser

Usage:

When included via script tag, the component is exposed as a window library named 'TygrRouter'

```html
<html>
  <head>
    <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <script src="https://tylergrinn.github.io/tygr-router/lib/tygr-router.min.js"></script>
    <link
      rel="stylesheet"
      href="https://tylergrinn.github.io/tygr-router/lib/tygr-router.min.css"
    />
  </head>
  <body>
    <div id="app"></div>

    <script type="text/babel">
      ReactDOM.render(<TygrRouter />, document.getElementById('app'));
    </script>
  </body>
</html>
```

## Standalone

Installation:

```cmd
npm i --save @tygr/router
```

Usage:

```jsx

// Vanilla JS
import Router from '@tygr/router/lib/standalone';

const el = document.getElementById('tygr-router');

Router.mount(el);

// Vue
<template>
<div>
  <div ref="tygr-router"></div>
</div>
</template>

<script>
import Router from '@tygr/router/lib/standalone';

export default {
  mounted() {
    Router.mount(this.$refs['tygr-router']);
  },
};
</script>

// Angular Typescript
import { Component, ElementRef, ViewChild } from '@angular/core';
import Router from '@tygr/router/lib/standalone';

@Component({
  selector: 'app-root',
  template: '<div><div #tygr-router></div></div>',
})
export class RouterComponent  {
  @ViewChild('tygr-router') el: ElementRef;

  ngAfterViewInit() {
    Router.mount(this.el.nativeElement);
  }
}
```

You should not use the standalone version if you have multiple react components in your project.

## Customizing styles

Sass variables can be overridden if you accept responsibility for transpiling it into css. You can see an example of this setup in the `demo/webpack.config.js` configuration named `sass`.

Make sure to reassign any sass variables before importing the `sass` library:

```scss
$accent-1: white;
$accent-2: yellow;

@import '@tygr/router/sass';
```
