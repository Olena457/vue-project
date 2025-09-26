<script setup>
import { onMounted } from 'vue'
import { useMutation } from '@/composables/useMutation.js'
import { getUserInfo } from '@/api/user/index.js'

import UserIcon from './UserIcon.vue'
const {
  data: userInfo,
  mutation: getUser,
  isLoading,
} = useMutation({
  mutationFn: () => getUserInfo(),
})
onMounted(() => {
  getUser()
})
</script>
<template>
  <div
    class="flex sticky top-0 text-[#2C2C2C] items-center gap-3 bg-[#FFE7DC] border-b-2 border-[#fcb699] rounded-bl-2xl rounded-br-2xl px-6 py-4 mb-10"
  >
    <div class="w-10 h-10 flex item-center justify-center rounded-full pl-4">
      <UserIcon class="text-[#f3743d]" />
    </div>
    <span v-if="isLoading">Loading...</span>
    <span v-if="userInfo">{{ userInfo.data.name }}</span>
  </div>
</template>
