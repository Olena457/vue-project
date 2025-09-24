<script setup>
import IButton from '@/components/IButton/IButton.vue'
import BaseLayout from '@/Layout/BaseLayout.vue'
</script>
<template>
  <BaseLayout>
    <div class="text-center">
      <img class="inline mb-6" src="../assets/image/map-pin.svg" alt="pin" />
      <h1 class="font-bold text-4xl mb-7">IT traveler</h1>
      <p class="leading-6 mb-11">
        A simple and convenient web application that lets you mark your favorite places - and also
        the ones you dream of visiting someday. So don't wait - give it a try and start exploring
        your world!
      </p>
      <IButton :to="{ name: 'register' }">Get Started</IButton>
      <!-- <IButton to="/auth/register">Get Started</IButton> -->
    </div>
  </BaseLayout>
</template>
