<script setup>
import IButton from '@/components/IButton/IButton.vue'
import IModal from '@/components/IModal/IModal.vue'
import { defineEmits } from 'vue'

defineProps({
  title: {
    type: String,
    defualt: '',
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['close', 'confirm'])
</script>

<template>
  <IModal v-if="isOpen" @close="emit('cansel')">
    <div class="mb-4 tex-lg">{{ title }}</div>
    <div class="flex gap-3 justify-center">
      <IButton @click="emit('cansel')">Cancel</IButton>
      <IButton variant="gradient" :is-loading="isLoading" @click="emit('confirm')">Confirm</IButton>
    </div>
    <div v-if="hasError" class="mt-4 text-red-500">Something went wrong.Please try again.</div>
  </IModal>
</template>
