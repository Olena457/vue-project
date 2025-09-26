import { createRouter, createWebHistory } from 'vue-router'
import { useAuthService } from '../api/authService/index.js'

const GreetingPage = () => import('../views/GreetingView.vue')
const Homepage = () => import('../views/HomepageView.vue')
const AuthPage = () => import('../views/AuthView.vue')
const RegistrationPage = () => import('../views/RegistrationView.vue')
const LoginPage = () => import('../views/LoginView.vue')

const routes = [
  { path: '/', component: GreetingPage, name: 'greeting' },
  { path: '/map', component: Homepage, name: 'homepage' },
  {
    path: '/auth',
    component: AuthPage,
    redirect: '/auth/login',
    children: [
      { path: 'login', component: LoginPage, name: 'login' },
      { path: 'register', component: RegistrationPage, name: 'register' },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

const auth = useAuthService()

router.beforeEach((to, from, next) => {
  const isUserLoggedIn = auth.isLoggedIn()

  const publicRoutes = ['login', 'register', 'greeting']
  const protectedRoutes = ['homepage', 'map']

  const isAuthPage = publicRoutes.includes(to.name) && to.name !== 'greeting'

  if (isUserLoggedIn) {
    if (isAuthPage) {
      next({ name: 'homepage' })
    } else {
      next()
    }
  } else {
    if (protectedRoutes.includes(to.name)) {
      next({ name: 'login' })
    } else {
      next()
    }
  }
})
