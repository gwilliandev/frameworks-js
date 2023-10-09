<script setup lang="ts">
import Cart from '../../../components/Cart/Cart.vue'

function handleScrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleScrollToMenu() {
  const element = document.getElementById('menu')
  element?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
}
</script>

<template>
  <header>
    <nav class="flex items-center z-[1] bg-white py-3 px-7 w-full fixed top-0 left-0 z-[1030] border-b border-gray-200">
      <router-link to="/" class="mr-8">
        <img src="https://wowthemesnet.github.io/template-fooddelivery-bootstrap-html/img/logo.png" alt="logotipo" class="max-w-full max-h-[40px]" />
      </router-link>
      <div class="flex-1 flex items-center">
        <div class="flex-1 flex items-center gap-4">
          <button @click="handleScrollToTop" class="text-black">Welcome</button>
          <button @click="handleScrollToMenu" class="text-[#00000080] hover:text-black transition">Today's Menu</button>
        </div>
        <div class="mx-auto">
          <Cart />
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped lang="scss"></style>
