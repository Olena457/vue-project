<script setup>
import { ref, watch } from 'vue'
import IButton from '@/components/UI/IButton.vue'
import IModal from '@/components/UI/IModal.vue'
import IInput from '@/components/UI/IInput.vue'
import InputImage from '../InputImage/InputImage.vue'
import MarkerIcon from '../icons/MarkerIcon.vue'
import fallbackImage from '@/assets/images/fallback-image.png'
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
    FormData.value = {
      ...props.place,
    }
  },
)
const handleChangeImg = (url) => {
  FormData.value.img = url
}
</script>
<template>
  <IModal v-if="props.isOpen" @close="emit('close')">
    <div class="w-[750px]">
      <div class="flex gap-2 item-center mb-10">
        <MarkerIcon height="18" width="18" />
        <span class="font-bold text-base">Edit Place</span>
      </div>
      <form @submit.prevent="emit('submit', formData)">
        <div class="flex gap-5">
          <div class="w-5/12">
            <img
              class="w-full h-[276px]object-cover rounded-md"
              :src="formData.img || fallbackImage"
              alt="place image"
            />
          </div>
          <div class="w-7/12">
            <IInput label="location" v-model="formData.title" />
            <div class="mt-4">
              <IInput label="Description" v-model="formData.description" />
            </div>
            <IButton class="mt-10 w-full" variant="gradient" :is-loading="isLoading">
              Save
            </IButton>
          </div>
        </div>
        <InputImage class="mt-3" @uploadede="handleChangeImg">
          <span class="text-xs">Upload new image</span>
        </InputImage>
      </form>
    </div>
  </IModal>
</template>
