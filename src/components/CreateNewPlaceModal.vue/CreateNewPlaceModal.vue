<script setup>
import { computed, reactive } from 'vue'
import IModal from '@/components/IModal/IModal.vue'
import IButton from '@/components/IButton/IButton.vue'
import IInput from '@/components/IInput/IInput.vue'
import InputImage from '@/components/InputImage/InputImage.vue'
import MarkerIcon from '../icons/MarkerIcon.vue'

const props = defineProps({
  isOpen: {
    default: false,
    type: Boolean,
  },
  isLoading: {
    default: false,
    type: Boolean,
  },
  hasError: {
    default: false,
    type: Boolean,
  },
})
const emit = defineEmits(['close', 'submit'])
const formData = reactive({
  title: '',
  description: '',
  img: '',
})
const uploadText = computed(() => {
  return formData.img ? 'Change Image' : 'Upload Image'
})
const handleUpload = (url) => {
  formData.img = url
}

const resetForm = () => {
  formData.description = ''
  formData.title = ''
  formData.img = ''
}
</script>
<template>
  <IModal v-if="props.isOpen" @close="emit('close')">
    <form @submit.prevent="emit('submit', formData, resetForm)">
      <div class="flex gap-1 justify-center font-bold text-center mb-10">
        <MarkerIcon /> Add Marker
      </div>
      <IInput label="location" class="mb-4" v-model="formData.title" />
      <IInput label="description" type="textarea" class="mb-2" v-model="formData.description" />
      <div class="flex gap-2 items-center mb-10">
        <img v-if="formData.img" :src="formData.img" alt="avatar" class="w-8 h-8 object-cover" />
        <InputImage @uploaded="handleUpload">{{ uploadText }}</InputImage>
      </div>

      <IButton class="w-full" variant="gradient" :is-loading="props.isLoading">Add</IButton>
      <div v-if="props.hasError" class="text-red-500">Щось пішло не так</div>
    </form>
  </IModal>
</template>
