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
  <IModal v-if="isOpen" @close="emit('cancel')">
    <div class="p-6 tex-lg">{{ title }}</div>
    <div class="flex gap-3 justify-center">
      <IButton variant="gradient" @click="emit('cancel')">Cancel</IButton>
      <IButton variant="gradient" :is-loading="isLoading" @click="emit('confirm')">Confirm</IButton>
    </div>
    <div v-if="hasError" class="pt-4 text-red-500">Something went wrong.Please try again.</div>
  </IModal>
</template>
