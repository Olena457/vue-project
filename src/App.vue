<script setup>
import { RouterView } from 'vue-router'
import MarkerIcon from './Layout/MarkerIcon.vue'
</script>

<template>
  <router-link
    to="/"
    class="fixed top-[2px] left-[2px] z-[50] p-2 hover:text-[#ffff] transition-colors"
    title="Go to Greeting Page"
  >
    <MarkerIcon />
  </router-link>
  <router-view />
</template>
