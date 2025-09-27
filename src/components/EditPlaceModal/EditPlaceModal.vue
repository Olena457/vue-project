<script setup>
import { ref, watch } from 'vue'
import IButton from '@/components/IButton/IButton.vue'
import IModal from '@/components/IModal/IModal.vue'
import IInput from '@/components/IInput/IInput.vue'
import InputImage from '../InputImage/InputImage.vue'
import MarkerIcon from '../icons/MarkerIcon.vue'
import fallbackImage from '../../assets/image/fallback-image.jpg'

const props = defineProps({
  isOpen: {
    default: false,
    type: Boolean,
  },
  isLoading: {
    default: false,
    type: Boolean,
  },
  place: Object,
})

const emit = defineEmits(['close', 'submit'])
const formData = ref({
  id: '',
  title: '',
  description: '',
  img: '',
  coordinates: null,
})

watch(
  () => props.place,
  () => {
    formData.value = {
      ...props.place,
    }
  },
)
const handleChangeImg = (url) => {
  formData.value.img = url
}
</script>
<template>
  <IModal v-if="props.isOpen" @close="emit('close')">
    <div class="edit-modal-container">
      <div class="flex gap-2 item-center mb-10">
        <MarkerIcon height="18" width="18" />
        <span class="font-bold text-base">Edit Place</span>
      </div>
      <form @submit.prevent="emit('submit', formData)">
        <div class="edit-modal-content">
          <div class="edit-modal-img">
            <img
              class="w-full h-[276px] object-cover rounded-md"
              :src="formData.img || fallbackImage"
              alt="place image"
            />
          </div>
          <div class="edit-modal-form flex flex-col gap-5">
            <IInput label="location" v-model="formData.title" />
            <div class="mt-4">
              <IInput label="Description" type="textarea" v-model="formData.description" />
            </div>
            <IButton class="mt-10 w-full" variant="gradient" :is-loading="isLoading">
              Save
            </IButton>
          </div>
        </div>
        <InputImage class="pt-2" @uploaded="handleChangeImg">
          <span
            class="text-xs text-[#2c2c2c] hover:text-[#f3743d] hover:underline transition-colors duration-300 cursor-pointer"
            >Upload new image</span
          >
        </InputImage>
      </form>
    </div>
  </IModal>
</template>
