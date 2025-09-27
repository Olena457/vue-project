import { createRouter, createWebHistory } from 'vue-router'
import { useAuthService } from '@/api/authService/index.js'

const GreetingPage = () => import('../views/GreetingView.vue')
const Homepage = () => import('../views/HomepageView.vue')
const AuthPage = () => import('../views/AuthView.vue')
const LoginPage = () => import('../views/LoginView.vue')
const RegistrationPage = () => import('../views/RegistrationView.vue')

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
  const authRoutes = ['login', 'register']
  const protectedRoutes = ['homepage', 'map']
  const { name } = to

  const isUserLoggedIn = auth.isLoggedIn()

  if (isUserLoggedIn && authRoutes.includes(name)) {
    next({ name: 'homepage' })
  } else if (!isUserLoggedIn && protectedRoutes.includes(name)) {
    next({ name: 'login' })
  } else {
    next()
  }
})
