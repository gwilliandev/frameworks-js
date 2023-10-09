<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { CartItem } from '../store/modules/cart'
import Page404 from './Page404.vue';

const store = useStore()

const checkoutCart = ref([] as CartItem[])
const cartTotalValue = computed(() =>
  checkoutCart.value.reduce((acc, item) => {
    acc += item.price * item.count
    return acc
  }, 0),
)

onMounted(() => {
  const cartItems = store.getters['cart/items'] as CartItem[]
  checkoutCart.value = cartItems
  store.dispatch('cart/clear')
})
</script>

<template>
  <div v-if="checkoutCart.length" id="hero-2" class="min-w-screen min-h-screen">
    <div class="center flex flex-col items-center content-center justify-center gap-8">
      <h1 class="text-white text-5xl">Checkout completed successfully</h1>

      <div v-for="item in checkoutCart" class="flex items-center gap-4 text-white">
        <span class="text-lg">{{ item.count }}</span>
        <span class="text-xs">X</span>
        <span class="text-lg">{{ item.title }}</span>
      </div>
      <div class="flex items-center justify-center w-full text-white">
        <span class="text-lg font-smoothing-auto border-b border-transparent">Total</span>
        <span class="flex-1 mt-2 mx-2 border-b border-dashed border-[#aaa]"></span>
        <span class="text-lg font-smoothing-auto border-b border-transparent">${{ cartTotalValue }}</span>
      </div>
      <router-link to="/" class="text-xl text-white">Back to Menu</router-link>
    </div>
  </div>
  <Page404 v-else />
</template>

<style scoped lang="scss"></style>
