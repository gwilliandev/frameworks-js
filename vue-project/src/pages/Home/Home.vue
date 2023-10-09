<script setup lang="ts">
import Hero from './components/Hero.vue'
import Menu from './components/Menu.vue'
</script>

<template>
  <div class="">
    <section id="hero" class="flex items-center min-h-[80vh]">
      <Hero />
    </section>
    <section id="menu" class="my-20">
      <Menu />
    </section>
  </div>
</template>

<style scoped lang="scss"></style>
