import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ShoppingListView from '../views/ShoppingListView.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    name: 'shoppingList',
    component: ShoppingListView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
