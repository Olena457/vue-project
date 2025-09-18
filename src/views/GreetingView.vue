<script setup>
import IButton from '@/components/IButton/IButton.vue'
import BaseLayout from '@/BaseLayout/BaseLayout.vue'
</script>
<template>
  <BaseLayout>
    <div class="text-center">
      <img class="inline mb-6" src="../assets/image/map-pin.svg" alt="pin" />
      <h1 class="font-bold text-4xl mb-7">IT traveler</h1>
      <p class="leading-6 mb-11">
        Простий, зручний веб додаток, який дозволить тобі відмічати твої улюблені місця, також ті, в
        яких би ти дуже хотів побувати. Тож не зволікай, спробуй сам.
      </p>
      <IButton to="">Почати роботу</IButton>
    </div>
  </BaseLayout>
</template>
