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
    <IInput label="Full name" v-model="userData.name" />
    <IInput label="Email" placeholder="email@gmail.com" v-model="userData.email" />
    <IInput label="Password" type="password" v-model="userData.password" />
    <IButton class="w-full" variant="gradient" type="submit" :is-loading="props.isLoading">
      Create account
    </IButton>
  </form>
</template>
