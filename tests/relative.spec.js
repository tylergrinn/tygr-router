const { serve, writeTestCase, assertVisible, assertHidden } = require('./util');

describe('Relative routes', () => {
  const router = {
    pages: [
      {
        path: "'/a'",
        children: ["'/b'", "'/d'"],
      },
    ],
  };
  const tests = [
    {
      test: '^/a',
      child: 'b',
    },
    {
      test: '^/a',
      child: 'd',
    },
  ];

  let closeServer;
  before(() => {
    closeServer = serve();
  });
  after(() => closeServer());

  it(`Sets the route to '/a/b'`, writeTestCase(router, '/a/b', tests));
  it(`Shows '^/a -> b'`, assertVisible('b'));
  it(`Hides '^/a -> d'`, assertHidden('d'));
  it(`Sets the route to '/a/d'`, writeTestCase(router, '/a/d', tests));
  it(`Hides '^/a -> b'`, assertHidden('b'));
  it(`Shows '^/a -> d'`, assertVisible('d'));
});
