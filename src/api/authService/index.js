import { ref } from 'vue'
import { clientFetch } from '../clientFetch'
import { router } from '../../router'
import {
  login as loginUser,
  registerUser as registerUserApi,
  logout as logoutUser,
  refresh as refreshUser,
} from '../user/index.js'

export const TOKEN_KEY = 'token'

const token = ref(null)

let isRefreshing = false
let failedQueue = []

const processQueue = (error, newToken = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(newToken)
    }
  })
  failedQueue = []
}

export function useAuthService() {
  const initializeAuth = () => {
    const storedToken = localStorage.getItem(TOKEN_KEY)
    if (storedToken) {
      token.value = storedToken
    }
  }

  const isLoggedIn = () => {
    return Boolean(token.value)
  }

  const setToken = (newToken) => {
    localStorage.setItem(TOKEN_KEY, newToken)
    token.value = newToken
  }

  const clearToken = () => {
    token.value = null
    localStorage.removeItem(TOKEN_KEY)
  }

  const login = async (body) => {
    const { data } = await loginUser(body)
    const { accessToken } = data
    setToken(accessToken)
  }

  const registerUser = async (body) => {
    const { data } = await registerUserApi(body)
    const { accessToken } = data
    setToken(accessToken)
  }

  const logout = async () => {
    await logoutUser()
    clearToken()
  }

  const refresh = async () => {
    isRefreshing = true
    try {
      const { data } = await refreshUser()
      const { accessToken } = data
      setToken(accessToken)
      processQueue(null, accessToken)
      return accessToken
    } catch (e) {
      processQueue(e, null)
      throw e
    } finally {
      isRefreshing = false
    }
  }

  return {
    token,
    isLoggedIn,
    login,
    logout,
    registerUser,
    refresh,
    setToken,
    clearToken,
    initializeAuth,
  }
}

const { refresh, clearToken } = useAuthService()

clientFetch.interceptors.request.use((request) => {
  const currentToken = localStorage.getItem(TOKEN_KEY)
  if (currentToken) {
    request.headers.Authorization = `Bearer ${currentToken}`
  }
  return request
})

clientFetch.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const errorCode = error.response?.status

    if (errorCode === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`
            return clientFetch(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true

      try {
        const newToken = await refresh()
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return clientFetch(originalRequest)
      } catch (e) {
        clearToken()
        router.push('/auth/login')
        return Promise.reject(e)
      }
    }
    return Promise.reject(error)
  },
)
