import React from 'react';
import ReactDOM from 'react-dom';
import useRouter from '../lib';
import './main.scss';
import routerConfig from './router.json';

function App() {
  const [router, goto] = useRouter(routerConfig.router);

  return (
    <div>
      <div className="content">
        <h1>Tygr Router Example</h1>
        <nav>
          <div>
            <button onClick={goto('/')}>Home</button>
            <button onClick={goto('/page1')}>Page 1</button>
            <button onClick={goto('/page2')}>Page 2</button>
            <button onClick={goto('/i/i0')}>Child 1</button>
            <button onClick={goto('/i/i1')}>Child 2</button>
            <button onClick={goto('/i/j/j0')}>Grandchild 1</button>
            <button onClick={goto('/i/j/j1')}>Grandchild 2</button>
            <button onClick={goto('/i/j/k/k0')}>Great grandchild 1</button>
            <button onClick={goto('/i/j/k/k1')}>Great grandchild 2</button>
            <button onClick={goto('/i/j/k/l/l0')}>
              Great great grandchild 1
            </button>
            <button onClick={goto('/i/j/k/l/l1')}>
              Great great grandchild 2
            </button>
            <button onClick={goto('/non-existing-page')}>Fallback</button>
            <button onClick={goto('/absolute-redirect')}>
              Absolute Redirect
            </button>
            <button onClick={goto('/relative-redirect')}>
              Relative Redirect
            </button>
          </div>
        </nav>
        <div className="router" {...router}>
          <div className="info-box">
            <h3>Router</h3>
            <span data-route="/404">Fallback page</span>
            <span data-route="/">Home page</span>
            <span data-route="/page1">Page 1</span>
            <span data-route="/page2">Page 2</span>
            <span data-route="/i/i0">Child 1</span>
            <span data-route="/i/i1">Child 2</span>
            <span data-route="/i/j/j0">Grandchild 1</span>
            <span data-route="/i/j/j1">Grandchild 2</span>
            <span data-route="/i/j/k/k0">Great grandchild 1</span>
            <span data-route="/i/j/k/k1">Great grandchild 2</span>
            <span data-route="/i/j/k/l/l0">Great great grandchild 1</span>
            <span data-route="/i/j/k/l/l1">Great great grandchild 2</span>
            <span data-route="/relative-redirect/child1">
              Relative redirect
            </span>
          </div>

          <div className="info-box">
            <h3>Syntaxes</h3>
            <h4>Exclusionary</h4>
            <span data-route="!/page1">Everywhere except Page 1</span>
            <span data-route="!/page2 !/i/i1">
              Everywhere except Page 2 or Child 2
            </span>
            <h4>Starts with</h4>
            <span data-route="^/i">Any child</span>
            <h4>Child route</h4>
            <div data-route="^/i">
              <span>Any Child</span>
              <span data-route="~/i1">Child 2</span>
              <span data-route="~/j/j0">Grandchild 1</span>
              <span data-route="~/j/j1">Grandchild 2</span>
              <span data-route="~/j/k/k0">Great grandchild 1</span>
              <span data-route="~/j/k/k1">Great grandchild 2</span>
              <span data-route="~/j/k/l/l0">Great great grandchild 1</span>
              <span data-route="~/j/k/l/l1">Great great grandchild 2</span>
              <h4>Deeply nested</h4>
              <div data-route="~/j">
                <span data-route="~/j0">Grandchild1</span>
                <span data-route="~/j1">Grandchild2</span>
                <div data-route="~/k">
                  <span data-route="~/k0">Great grandchild1</span>
                  <span data-route="~/k1">Great grandchild2</span>
                  <div data-route="~/l">
                    <span data-route="~/l0">Great great grandchild1</span>
                    <span data-route="~/l1">Great great grandchild2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
