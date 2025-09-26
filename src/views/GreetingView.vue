<script setup>
import IButton from '@/components/IButton/IButton.vue'
import BaseLayout from '@/Layout/BaseLayout.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <BaseLayout>
    <div class="text-center flex flex-col gap-10">
      <div class="text-center">
        <img class="inline pb-6" src="../assets/image/map-pin.svg" alt="pin" />
        <h1 class="font-black text-4xl pb-7">IT Traveler</h1>
        <p class="leading-6 pb-20">
          A simple and convenient web application that lets you mark your favorite places - and also
          the ones you dream of visiting someday. So don't wait - give it a try and start exploring
          your world!
        </p>
        <IButton to="/auth/register">Get Started</IButton>
      </div>
      <p class="text-white pt-10 responsive-text">
        You don't have an account yet?

        <RouterLink
          to="/auth/register"
          class="font-bold underline text-white hover:text-[#939393] transition-colors duration-300"
        >
          Register </RouterLink
        >,

        <RouterLink
          to="/auth/login"
          class="font-bold underline text-white hover:text-[#939393] transition-colors duration-300"
        >
          Login
        </RouterLink>
      </p>
    </div>
  </BaseLayout>
</template>
