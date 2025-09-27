<script setup>
import { ref } from 'vue'
import UploadIcon from './UploadIcon.vue'
const emit = defineEmits(['uploaded'])
const errorMessage = ref('')

const handleUploadImg = (event) => {
  const file = event.target.files[0]
  if (file.size > 3 * 1024 * 1024) {
    errorMessage.value = 'Too large file'
    return
  }
  const fileReader = new FileReader()
  fileReader.readAsDataURL(file)

  fileReader.onload = () => {
    errorMessage.value = ''
    emit('uploaded', fileReader.result)
  }
}
</script>
<template>
  <div>
    <label class="cursor-pointer hover:text-primary">
      <input type="file" accept="image/*" class="hidden" @change="handleUploadImg" />
      <span class="flex gap-1 items-center">
        <UploadIcon class="hover:text-[#f3743d]" />
        <span class="underline text-xs"><slot></slot></span>
      </span>
    </label>
    <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>
  </div>
</template>
