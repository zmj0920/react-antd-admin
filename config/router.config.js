export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        Routes: ['src/pages/Authorized'],
        // authority: ['admin', 'user'],
        routes: [
          {
            name: 'dashboard.analysis',
            icon: 'smile',
            path: '/dashboard/analysis',
            component: './DashboardAnalysis',
          },
          {
            path: '/',
            redirect: '/dashboard/analysis',
          },
          {
            path: '/welcome',
            name: 'welcome',
            icon: 'smile',
            component: './Welcome',
          },
          {
            path: '/account',
            name: 'account',
            icon: 'smile',
            routes: [
              {
                name: 'center',
                icon: 'table',
                path: '/account/center',
                component: './AccountCenter',
              },
              {
                name: 'settings',
                icon: 'smile',
                path: '/account/settings',
                component: './AccountSettings',
              },
            ],
          },
          {
            path: '/admin',
            name: 'admin',
            icon: 'crown',
            component: './Admin',
            authority: ['admin'],
            routes: [
              {
                path: '/admin/sub-page',
                name: 'sub-page',
                icon: 'smile',
                component: './Welcome',
                authority: ['admin'],
              },
            ],
          },
          {
            path: '/list',
            icon: 'table',
            name: 'list',
            routes: [
              {
                name: 'basic-list',
                icon: 'smile',
                path: '/list/basic-list',
                component: './List/basic-list',
              },
              {
                name: 'table-list',
                icon: 'table',
                path: '/list/table-list',
                component: './ListTableList',
              },
            ],
          },
          {
            name: 'modalfrom',
            icon: 'smile',
            path: '/modalfrom',
            component: './ModalFrom',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
