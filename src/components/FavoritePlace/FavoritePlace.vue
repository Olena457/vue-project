<script setup>
import { defineEmits } from 'vue'
import FavoritePlaceIconButton from './FavoritePlaceIconButton.vue'
import DeleteIcon from './DeleteIcon.vue'
import EditIcon from '../icons/EditIcon.vue'
import fallbackImage from '../../assets/image/fallback-image.jpg'

const props = defineProps({
  title: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  img: String,
  isActive: {
    required: true,
    type: Boolean,
  },
})
const emit = defineEmits(['edit', 'delete'])
</script>

<template>
  <section class="text-gray mb-6 last:mb-0">
    <div class="flex gap-4">
      <img
        class="w-[76px] h-[76px] srink-0 riunded-md"
        :src="props.img || fallbackImage"
        alt="place image"
      />
      <div class="w-full">
        <div class="flex justify-baseline items-center mb-2">
          <h2 class="font-bold text-sm text[#2C2C2C]">{{ props.title }}</h2>
          <div class="flex gap-2">
            <FavoritePlaceIconButton @click="emit('edit')">
              <EditIcon />
            </FavoritePlaceIconButton>
            <FavoritePlaceIconButton @click.stop="emit('delete')">
              <DeleteIcon />
            </FavoritePlaceIconButton>
          </div>
        </div>
        <p class="text-xs line-clamp-3">
          {{ props.description }}
        </p>
      </div>
    </div>
    <div
      class="h-[1px] w-full bg-[#ececec] mb-4"
      :class="{ 'bg-primary': props.isActive, 'bg-[#ececec]': !props.isActive }"
    ></div>
  </section>
</template>
