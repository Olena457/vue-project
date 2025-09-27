<script setup>
import { useRouter } from 'vue-router'
import { computed, nextTick } from 'vue'
import LoginForm from '@/components/Auth/LoginForm/LoginForm.vue'
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
  onSuccess: () => {
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
    return 'Invalid Email or password.Please try again.'
  }

  return 'Invalid Email or password.Please try again.'
})
</script>

<template>
  <LoginForm class="flex flex-col gap-4" @submit="handleLogin" :is-loading="isLoading" />

  <div v-if="userFriendlyError" class="mt-4 text-red-500">
    {{ userFriendlyError }}
  </div>
</template>
