<script setup>
import MapWithUsers from '@/components/MapWithUsers/MapWithUsers.vue'
</script>
<template>
  <main class="responsive-layout">
    <section class="flex-1 flex justify-center items-center p-5 bg-[#f3743d]">
      <div class="text-white max-w-[500px] w-full">
        <slot></slot>
      </div>
    </section>
    <section class="flex-1">
      <MapWithUsers class="h-full w-full object-cover" />
    </section>
  </main>
</template>
