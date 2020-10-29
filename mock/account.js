export default {
  'POST /api/account/get_menu': (req, res) => {
    const result = {
      "code": 0,
      "message": "response successful",
      "data": [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          children: [
            {
              name: 'login',
              path: '/user/login',
              component: './user/login',
            },
          ],
        },
        {
          path: '/dashboard/analysis',
          component: './DashboardAnalysis',
          name: 'dashboard.analysis',
          Routes: ['src/pages/Authorized'],
          children: [
            {
              path: '/',
              redirect: '/dashboard/analysis',
            },
          ],
        },
        {
          path: '/welcome',
          name: 'welcome',
          icon: 'smile',
          component: './Welcome',
          children: null,
        },
        {
          path: '/account',
          name: 'account',
          icon: 'smile',
          children: [
            {
              name: 'center',
              icon: 'table',
              path: '/account/center',
              component: './AccountCenter',
              children: null,
            },
            {
              name: 'settings',
              icon: 'smile',
              path: '/account/settings',
              component: './AccountSettings',
              children: null,
            },
          ],
        },
        {
          path: '/admin',
          name: 'admin',
          icon: 'crown',
          component: './Admin',
          authority: ['admin'],
          children: [
            {
              path: '/admin/sub-page',
              name: 'sub-page',
              icon: 'smile',
              component: './Welcome',
              authority: ['admin'],
              children: null,
            },
          ],
        },
        {
          name: 'list.table-list',
          icon: 'table',
          path: '/list',
          component: './ListTableList',
          children: null,
        },
      ]
    }
    return res.json(result);
  }
};
