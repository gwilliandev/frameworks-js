<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useModal } from 'vue-final-modal'
import Modal from './components/Modal.vue'

const store = useStore()
const router = useRouter()

const cartItems = computed(() => store.getters['cart/count'])

const { open, close } = useModal({
  component: Modal,
  attrs: {
    onConfirm() {
      router.push('/checkout')
    },
    onCancel() {
      close()
    },
  }
})
</script>

<template>
  <button @click="open" class="flex items-center gap-2">
    <span v-if="cartItems > 0">{{ cartItems }}</span>
    <i class="fas fa-light fa-cart-shopping" />
  </button>
</template>

<style scoped lang="scss"></style>
