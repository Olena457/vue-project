<template>
  <div class="relative w-full overflow-hidden">
    <img src="../../assets/image/static-map.jpg" alt="Map background" class="w-full h-auto" />

    <div class="absolute top-[12%] left-[20%] flex flex-row gap-4 items-center">
      <div
        class="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-[#f9b79b] to-[#F3743D] p-[2px]"
      >
        <img
          src="/src/assets/image/tech.png"
          alt="User 1"
          class="w-full h-full rounded-full object-contain bg-blue-200 flex items-center justify-center"
        />
      </div>
      <MarkerIcon class="w-6 h-6 -mt-2.5" />
    </div>

    <div class="absolute top-[68%] left-[60%] flex flex-row gap-5 items-center">
      <div
        class="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-r from-[#f9b79b] to-[#F3743D] p-[4px]"
      >
        <img
          src="/src/assets/image/young.png"
          alt="User 2"
          class="w-full h-full rounded-full object-contain bg-green-200 flex items-center justify-center"
        />
      </div>
      <MarkerIcon class="w-8 h-8 -mt-2.5" />
    </div>

    <div class="absolute top-[40%] left-[35%] flex gap-8 flex-row-reverse items-center">
      <div
        class="w-24 h-24 rounded-full flex items-center justify-center bg-gradient-to-r from-[#f9b79b] to-[#F3743D] p-[4px]"
      >
        <img
          src="/src/assets/image/woman.png"
          alt="User 3"
          class="w-full h-full rounded-full object-contain bg-fuchsia-200 flex items-center justify-center"
        />
      </div>
      <MarkerIcon class="w-8 h-8 -mt-2" />
    </div>
    <div class="absolute top-[75%] left-[15%] flex flex-col-reverse gap-5 items-center">
      <div
        class="w-15 h-15 rounded-full flex items-center justify-center bg-gradient-to-r from-[#f9b79b] to-[#F3743D] p-[4px]"
      >
        <img
          src="/src/assets/image/med.png"
          alt="User 3"
          class="w-full h-full rounded-full object-contain bg-yellow-200 flex items-center justify-center"
        />
      </div>
      <MarkerIcon class="w-6 h-6 -mt-2" />
    </div>

    <div class="absolute flex flex-col-reverse gap-5 top-[18%] left-[70%] items-center">
      <div
        class="w-22 h-22 rounded-full flex items-center justify-center bg-gradient-to-r from-[#f9b79b] to-[#F3743D] p-[4px]"
      >
        <img
          src="/src/assets/image/man.png"
          alt="User 4"
          class="w-full h-full rounded-full object-contain bg-orange-200 flex items-center justify-center"
        />
      </div>
      <MarkerIcon class="w-10 h-10 -mt-2.5" />
    </div>
  </div>
</template>

<script setup>
import MarkerIcon from '@/components/icons/MarkerIcon.vue'
</script>
