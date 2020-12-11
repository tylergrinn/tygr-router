const { serve, assertHidden, assertVisible, writeTestCase } = require('./util');

describe('Exclusion syntax', () => {
  const router = {
    pages: ["'/a'", "'/b'", "'/c'"],
  };
  const tests = ['!/a', '!/b', '!/c'];

  let closeServer;
  before(() => {
    closeServer = serve();
  });
  after(() => closeServer());

  it(`Sets route to '/a'`, writeTestCase(router, '/a', tests));
  it(`Hides '!/a'`, assertHidden('!/a'));
  it(`Shows '!/b' and '!/c'`, assertVisible('!/b', '!/c'));
  it(`Sets route to '/c'`, writeTestCase(router, '/c', tests));
  it(`Shows '!/a' and '!/b'`, assertVisible('!/a', '!/b'));
  it(`Hides '!/c'`, assertHidden('!/c'));
});

describe('Partial exclusion syntax', () => {
  const router = {
    pages: [
      {
        path: "'/a'",
        children: ["'/b'", "'/c'"],
      },
      "'/d'",
    ],
  };
  const tests = ['!^/a', '!^/a/b'];

  let closeServer;
  before(() => {
    closeServer = serve();
  });
  after(() => closeServer());

  it(`Sets the route to '/a'`, writeTestCase(router, '/a', tests));
  it(`Hides '!^/a'`, assertHidden('!^/a'));
  it(`Shows '!^/a/b'`, assertVisible('!^/a/b'));
  it(`Sets the route to '/a/b'`, writeTestCase(router, '/a/b', tests));
  it(`Hides '!^/a' and '!^/a/b`, assertHidden('!^/a', '!^/a/b'));
  it(`Sets the route to '/d'`, writeTestCase(router, '/d', tests));
  it(`Shows '!^/a' and '!^/a/b`, assertVisible('!^/a', '!^/a/b'));
});

describe('Relative exclusion syntax', () => {
  const router = {
    pages: [
      {
        path: "'/a'",
        children: [
          {
            path: "'/b'",
            children: ["'/c'"],
          },
        ],
      },
      "'/d'",
    ],
  };
  const tests = [
    {
      test: '^/a',
      child: '!b',
    },
    {
      test: '^/a',
      child: '!b/c',
    },
  ];

  let closeServer;
  before(() => {
    closeServer = serve();
  });
  after(() => closeServer());

  it(`Sets the route to '/a'`, writeTestCase(router, '/a', tests));
  it(`Shows '^/a -> !b' and '^/a -> !b/c'`, assertVisible('!b', '!b/c'));
  it(`Sets the route to '/a/b'`, writeTestCase(router, '/a/b', tests));
  it(`Hides '^/a -> !b`, assertHidden('!b'));
  it(`Shows '^/a -> !b/c`, assertVisible('!b/c'));
  it(`Sets the route to '/a/b/c'`, writeTestCase(router, '/a/b/c', tests));
  it(`Shows '^/a -> !b`, assertVisible('!b'));
  it(`Hides '^/a -> !b/c`, assertHidden('!b/c'));
});
