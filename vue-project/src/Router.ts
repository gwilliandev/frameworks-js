import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from './layouts/DefaultLayout/DefaultLayout.vue'

import Home from './pages/Home/Home.vue'
import CheckoutSuccess from './pages/CheckoutSuccess.vue'
import Page404 from './pages/Page404.vue'

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: DefaultLayout,
    children: [{ name: 'Home', path: '', component: Home }],
  },
  { name: 'CheckoutSuccess', path: '/checkout', component: CheckoutSuccess },
  { name: 'Page404', path: '/*', component: Page404 },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
