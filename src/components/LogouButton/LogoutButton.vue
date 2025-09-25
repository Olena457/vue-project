<script setup>
import { useMutation } from '@/composables/useMutation.js'
import { useRouter } from 'vue-router'
import { useAuthService } from '@/api/authService/index.js'
import { logout } from '@/api/user/index.js'
import LogoutIcon from './LogoutIcon.vue'

const router = useRouter()

const { mutation: logoutUser, isLoading } = useMutation({
  mutationFn: () => logout(),
  onSuccess: () => {
    useAuthService.clearToken()
    router.replace('/auth/login')
  },
})
</script>

<template>
  <button class="flex gap-2 item-center px-6 py-6 text-[#2c2c2c]" @click="logoutUser">
    <span v-if="isLoading">Loading...</span>
    <span v-else>Logout</span>
    <LogoutIcon class="text-[#2c2c2c]" />
  </button>
</template>
