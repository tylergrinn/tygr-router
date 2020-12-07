module.exports.router = {
  baseUrl: process.env.BASE_URL || '',
  fallback: '404',
  pages: [
    '',
    {
      path: 'i',
      children: [
        'i0',
        'i1',
        {
          path: 'j',
          children: [
            'j0',
            'j1',
            {
              path: 'k',
              children: [
                'k0',
                'k1',
                {
                  path: 'l',
                  children: ['l0', 'l1'],
                },
              ],
            },
          ],
        },
      ],
    },
    'page1',
    'page2',
    {
      path: 'absolute-redirect',
      redirectTo: '/i/i0',
    },
    {
      path: 'relative-redirect',
      children: [
        {
          path: '',
          redirectTo: 'child1',
        },
        'child1',
        'child2',
      ],
    },
  ],
};
