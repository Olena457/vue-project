<!-- <script setup>
import LoginForm from '@/components/Auth/LoginForm/LoginForm.vue'
import { useRouter } from 'vue-router'
import { useMutation } from '@/composables/useMutation.js'
import { useAuthService } from '@/api/authService/index.js'

const router = useRouter()

const authService = useAuthService()

const {
  isLoading,
  error,
  mutation: handleLogin,
} = useMutation({
  mutationFn: (data) => authService.login(data),
  onSuccess: () => router.replace('/map'),
})
</script>

<template>
  <LoginForm class="flex flex-col gap-4" @submit="handleLogin" :is-loading="isLoading" />
  <div v-if="error" class="text-red-500">{{ error.message }}</div>
</template> -->
<!-- ________________________________________________________________ -->
<!-- <script setup>
import LoginForm from '@/components/Auth/LoginForm/LoginForm.vue'
import { useRouter } from 'vue-router'
import { useMutation } from '@/composables/useMutation.js'
import { useAuthService } from '@/api/authService/index.js'
import { computed } from 'vue'

const router = useRouter()
const authService = useAuthService()

const {
  isLoading,
  error,
  mutation: handleLogin,
} = useMutation({
  mutationFn: (data) => authService.login(data),
  onSuccess: () => router.replace('/map'),
})

const userFriendlyError = computed(() => {
  if (!error.value) {
    return null
  }

  const status = error.value.response?.status

  if (status === 401 || status === 400) {
    return 'Invalid Email or password. Please try again.'
  }

  return 'Invalid Email or password. Please try again.'
})
</script>

<template>
  <LoginForm class="flex flex-col gap-4" @submit="handleLogin" :is-loading="isLoading" />

  <div v-if="userFriendlyError" class="mt-4 text-red-500">
    {{ userFriendlyError }}
  </div>
</template> -->
<script setup>
import LoginForm from '@/components/Auth/LoginForm/LoginForm.vue'
import { useRouter } from 'vue-router'
import { useMutation } from '@/composables/useMutation.js'
import { useAuthService } from '@/api/authService/index.js'
import { computed, nextTick } from 'vue' // <-- 1. Імпортуємо nextTick

const router = useRouter()
const authService = useAuthService()

const {
  isLoading,
  error,
  mutation: handleLogin,
} = useMutation({
  mutationFn: (data) => authService.login(data),
  onSuccess: () => {
    // 2. Обгортаємо перенаправлення в nextTick
    nextTick(() => {
      router.replace('/map')
    })
  },
})

const userFriendlyError = computed(() => {
  if (!error.value) {
    return null
  }

  const status = error.value.response?.status

  if (status === 401 || status === 400) {
    return 'Invalid Email or password. Please try again.'
  }

  return 'Invalid Email or password. Please try again.'
})
</script>

<template>
  <LoginForm class="flex flex-col gap-4" @submit="handleLogin" :is-loading="isLoading" />

  <div v-if="userFriendlyError" class="mt-4 text-red-500">
    {{ userFriendlyError }}
  </div>
</template>
