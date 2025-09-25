<!-- <script setup>
import LoginForm from '@/components/Auth/LoginForm/LoginForm.vue'
import { useRouter } from 'vue-router'
import { useMutation } from '@/composables/useMutation.js'
import { useAuthService } from '@/api/authService/index.js'
const router = useRouter()
const {
  isLoading,
  error,
  mutation: handleLogin,
} = useMutation({
  mutationFn: (data) => useAuthService.login(data),
  onSuccess: () => router.replace('/map'),
})
</script>

<template>
  <LoginForm @submit="handleLogin" :is-loading="isLoading" />
  <div v-if="error" class="text-red-500">{{ error.message }}</div>
</template> -->

<script setup>
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
</template>
