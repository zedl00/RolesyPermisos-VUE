import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Admin from '../views/admin/Admin.vue'
import Perfil from '../views/admin/Perfil.vue'
import AppLayout from '../layout/AppLayout.vue'
import Inicio from '../views/Inicio.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Inicio',
      component: Inicio
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/auth/Login.vue'),
      meta: {
        redirectIfAuth: true
      }
    },
    {
      path: '/admin',
      component: AppLayout,
      meta: { requireAuth: true },
      children: [
        {
          path: '',
          name: 'Admin',
          component: Admin,
          meta: { requireAuth: true }
        },
        {
          path: 'perfil',
          name: 'Perfil',
          component: Perfil,
          meta: { requireAuth: true }
        },
        {
          path: 'usuario',
          name: 'Usuario',
          component: () => import('../views/admin/usuario/Usuario.vue'),
          meta: { requireAuth: true }
        }
      ] 
    },
  ]
})

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token');

  // Verifica las rutas que necesita autenticacion para loguear
  if(to.meta.requireAuth) {
    if(!token)
      return next({name: 'Login'});
    return next();
  }

  // Verifica si esta logueado para que no presente el form de login nuevamnete
  if(to.meta.redirectIfAuth && token) {
    return next({name: 'Admin'});
  }

  return next();
})

export default router
