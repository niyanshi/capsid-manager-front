export default [
  {
    path: '/login',
    layout: false,
    component: './login',
  },
  {
    path: '/assets',
    name: '资源管理',
    icon: '',
    component: './assets',
  },

  {
    path: '/',
    redirect: '/assets',
  },
  {
    component: './404',
  },
];
