<script setup>
import { reactive, toRaw } from 'vue'
import IInput from '@/components/IInput/IInput.vue'
import IButton from '@/components/IButton/IButton.vue'

const props = defineProps({
  isLoading: {
    default: false,
    type: Boolean,
  },
})
const emit = defineEmits(['submit'])
const userData = reactive({
  name: '',
  email: '',
  password: '',
})
</script>

<template>
  <form @submit.prevent="emit('submit', toRaw(userData))">
    <IInput class="mb-12" label="Full name" v-model="userData.name" />
    <IInput class="mb-12" label="Email" placeholder="email@gmail.com" v-model="userData.email" />
    <IInput class="mb-12" label="Password" type="password" v-model="userData.password" />
    <IButton class="mt-12 w-full" variant="gradient" type="submit" :is-loading="props.isLoading">
      Create account
    </IButton>
  </form>
</template>
