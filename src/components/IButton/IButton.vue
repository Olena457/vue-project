<script setup>
import { defineProps, computed } from 'vue'
import { RouterLink } from 'vue-router'
const props = defineProps({
  variant: {
    default: 'primary',
    type: String,
    validator: (value) => {
      return ['primary', 'gradient', 'outlined'].includes(value)
    },
  },
  to: String,
  isLoading: {
    default: false,
    type: Boolean,
  },
})

const bgStyles = computed(() => {
  if (props.variant === 'gradient') {
    //  'gradient'
    return 'bg-gradient-to-r from-[#FFA279] to-[#F3743D]  border-none shadow-md hover:from-[#F3743D] hover:to-[#FFA279] transition-colors transition duration-300 ease-in-out transition-shadow'
  } else if (props.variant === 'primary') {
    //  'primary'
    return 'bg-[#FFA279] border-1 border-[#FFA279] hover:bg-[#f3682c] hover:border-[#f2f2f2] shadow-md hover:shadow-lg transition-colors transition-shadow'
  } else if (props.variant === 'outlined') {
    return 'border-2 border-[#FFA279] text-[#FFA279] bg-white hover:bg-[#FFA279] hover:text-white shadow-md hover:shadow-lg transition-colors transition-shadow'
  }
  // default
  return 'bg-[#FFA279] border-2 border-[#FFA279] hover:bg-[#F3743D] hover:border-[#F3743D] shadow-md hover:shadow-lg transition-colors transition-shadow'
})
const isLink = computed(() => !!props.to)
const componentName = computed(() => {
  return isLink.value ? RouterLink : 'button'
})
const link = computed(() => {
  return isLink.value ? props.to : undefined
})
</script>
<template>
  <component
    :is="componentName"
    class="rounded-xl py-3 px-10 text-white font-bold tracking-wider"
    :class="bgStyles"
    :to="link"
  >
    <template v-if="props.isLoading">Loading... </template>
    <template v-else>
      <slot></slot>
    </template>
  </component>
</template>
