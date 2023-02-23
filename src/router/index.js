import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/DashboardView.vue'),
    children: [
      {
        path: 'products',
        name: 'AdminProducts',
        component: () => import('@/views/ProductsView.vue'),
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: () => import('@/views/OrdersView.vue'),
      },
      {
        path: 'coupons',
        name: 'AdminCoupons',
        component: () => import('@/views/CouponsView.vue'),
      },
      {
        path: 'articles',
        name: 'AdminArticles',
        component: () => import('@/views/ArticlesView.vue'),
      },
    ],
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/UserView.vue'),
    children: [
      {
        path: 'articles',
        name: 'UserArticles',
        component: () => import('@/views/UserArticlesView.vue'),
      },
      {
        path: 'cart',
        name: 'UserCart',
        component: () => import('@/views/UserCartView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
