<template>
  <div class="relative w-full overflow-hidden">
    <img src="../../assets/image/static-map.jpg" alt="Map background" class="w-full h-auto" />

    <div class="absolute top-[12%] left-[25%] flex flex-row gap-4 items-center">
      <div
        class="w-10 h-10 rounded-full bg-pink-300 bg-opacity-70 flex items-center justify-center"
      >
        <img
          src="/src/assets/image/tech.png"
          alt="User 1"
          class="w-full h-full object-fit rounded-full ring-4 ring-pink-400"
        />
      </div>
      <MarkerIcon class="w-6 h-6 -mt-2.5" />
    </div>

    <div class="absolute top-[62%] left-[60%] flex flex-col gap-15 items-center">
      <div
        class="w-17 h-17 rounded-full bg-green-300 bg-opacity-70 flex items-center justify-center"
      >
        <img
          src="/src/assets/image/young.png"
          alt="User 2"
          class="w-full h-full object-contain rounded-full ring-4 ring-green-400"
        />
      </div>
      <MarkerIcon class="w-8 h-8 -mt-2.5" />
    </div>

    <div class="absolute top-[40%] left-[35%] flex gap-8 flex-row-reverse items-center">
      <div
        class="w-20 h-20 rounded-full bg-fuchsia-300 bg-opacity-70 flex items-center justify-center"
      >
        <img
          src="/src/assets/image/woman.png"
          alt="User 3"
          class="w-full h-full object-contain rounded-full ring-4 ring-fuchsia-400"
        />
      </div>
      <MarkerIcon class="w-8 h-8 -mt-2" />
    </div>
    <div class="absolute top-[75%] left-[15%] flex flex-col-reverse gap-5 items-center">
      <div
        class="w-14 h-14 rounded-full bg-yellow-200 bg-opacity-70 flex items-center justify-center"
      >
        <img
          src="/src/assets/image/med.png"
          alt="User 3"
          class="w-full h-full object-contain rounded-full ring-4 ring-yellow-400"
        />
      </div>
      <MarkerIcon class="w-5 h-5 -mt-2" />
    </div>

    <div class="absolute flex flex-col gap-8 top-[20%] left-[75%] items-center">
      <div
        class="w-24 h-24 rounded-full bg-orange-300 bg-opacity-70 flex items-center justify-center"
      >
        <img
          src="/src/assets/image/man.png"
          alt="User 4"
          class="w-full h-full rounded-full object-scale-down ring-4 ring-orange-400"
        />
      </div>
      <MarkerIcon class="w-10 h-10 -mt-2.5" />
    </div>
  </div>
</template>

<script setup>
import MarkerIcon from '@/components/icons/MarkerIcon.vue'
</script>
