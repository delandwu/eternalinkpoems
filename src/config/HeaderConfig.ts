export const headerConfig = {
  links: [
    {
      text: '首頁',
      href: '/',
    },
    // {
    //   text: '詩詞 + AI',
    //   href: '/ai',
    // },
    {
      text: '每日一詩 🔥',
      href: '/today',
    },
    {
      text: '詩集',
      // href: '/collections',
      links: [
        {
          text: '所有詩集 🔥',
          href: '/collections',
        },
        {
          text: '唐詩三百首',
          href: '/collections/1',
        },
        {
          text: '宋詞三百首',
          href: '/collections/2',
        },
        {
          text: '元曲三百首',
          href: '/collections/109',
        },
        {
          text: '給孩子的詩',
          href: '/collections/3',
        },
      ],
    },
    {
      text: '詩詞',
      links: [
        {
          text: '按朝代檢索 🔥',
          href: '/dynasties',
        },
        {
          text: '所有詩人',
          href: '/authors',
        },
        {
          text: '所有詩詞',
          href: '/works',
        },
      ],
    },
    // {
    //   text: '诗词百科',
    //   href: '/libai-poetic',
    // },
  ],
  actions: [
    // {
    //   text: 'Search',
    //   href: '/search',
    //   target: '_self',
    // }
  ],
};