import React from 'react';
import ReactDOM from 'react-dom';
import useRouter from '../lib';
import './main.scss';
import routerConfig from './router.json';

function App() {
  const [router, goto] = useRouter(routerConfig.router);

  return (
    <div className="tygr-router">
      <div className="content">
        <h1>Tygr Router Example</h1>
        <nav>
          <button onClick={goto('/')}>Home</button>
          <button onClick={goto('/page1')}>Page 1</button>
          <button onClick={goto('/page2')}>Page 2</button>
          <button onClick={goto('/child/child1')}>Child 1</button>
          <button onClick={goto('/child/child2')}>Child 2</button>
          <button onClick={goto('/child/child/grandchild1')}>
            Grandchild 1
          </button>
          <button onClick={goto('/child/child/grandchild2')}>
            Grandchild 2
          </button>
          <button onClick={goto('/non-existing-page')}>Fallback</button>
          <button onClick={goto('/absolute-redirect')}>
            Absolute Redirect
          </button>
          <button onClick={goto('/relative-redirect')}>
            Relative Redirect
          </button>
        </nav>
        <div className="router" {...router}>
          <div className="info-box">
            <h3>Router</h3>
            <span data-route="/404">Fallback page</span>
            <span data-route="/">Home page</span>
            <span data-route="/page1">Page 1</span>
            <span data-route="/page2">Page 2</span>
            <span data-route="/child/child1">Child 1</span>
            <span data-route="/child/child2">Child 2</span>
            <span data-route="/child/child/grandchild1">Grandchild 1</span>
            <span data-route="/child/child/grandchild2">Grandchild 1</span>
            <span data-route="/relative-redirect/child1">
              Relative redirect
            </span>
          </div>

          <div className="info-box">
            <h3>Syntaxes</h3>
            <h4>Exclusionary</h4>
            <span data-route="!/page1">Everywhere except Page 1</span>
            <span data-route="!/page2 !/child/child2">
              Everywhere except Page 2 or Child 2
            </span>
            <h4>Starts with</h4>
            <span data-route="^/child">Any child</span>
            <h4>Child route</h4>
            <div data-route="^/child">
              <span>Any Child</span>
              <span data-route="~/child2">Child 2</span>
              <span data-route="~/child/grandchild1">Grandchild 1</span>
              <span data-route="~/child/grandchild2">Grandchild 2</span>
              <h4>Deeply nested</h4>
              <div data-route="~/child">
                <span data-route="~/grandchild1">Grandchild1</span>
                <span data-route="~/grandchild2">Grandchild2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
