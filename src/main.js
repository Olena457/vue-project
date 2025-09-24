// import './assets/main.css'

// import { createApp } from 'vue'
// import { createPinia } from 'pinia'
// import { router } from './router/index.js'
// import { useAuthService, TOKEN_KEY } from './api/authService'

// import App from './App.vue'
// const token = localStorage.getItem(TOKEN_KEY)
// if (token) {
//   useAuthService.setToken(token)
// }
// const app = createApp(App)

// app.use(createPinia())
// app.use(router)
// app.mount('#app')
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './router/index.js'
import { useAuthService, TOKEN_KEY } from './api/authService'

import App from './App.vue'

const authService = useAuthService()

const token = localStorage.getItem(TOKEN_KEY)
if (token) {
  authService.setToken(token)
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
