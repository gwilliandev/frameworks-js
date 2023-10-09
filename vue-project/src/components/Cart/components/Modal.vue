<script setup lang="ts">
import { computed, toRaw } from 'vue'
import { useStore } from 'vuex'
import { VueFinalModal } from 'vue-final-modal'
import { CartItem } from '../../../store/modules/cart'

const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'confirm'): void
}>()

const store = useStore()

const cartItems = computed(() => store.getters['cart/items'] as CartItem[])

const cartTotalValue = computed(() =>
  cartItems.value.reduce((acc, item) => {
    acc += item.price * item.count
    return acc
  }, 0),
)

function handleAddItemToCart(item: CartItem) {
  store.dispatch('cart/add', { item: toRaw(item) })
}

function handleRemoveItemFromCart(id: string) {
  store.dispatch('cart/remove', { id })
}
</script>

<template>
  <VueFinalModal class="confirm-modal" content-class="confirm-modal-content" overlay-transition="vfm-fade" content-transition="vfm-fade">
    <div class="flex flex-col pt-3 px-3 border-t border-[#dee2e6]">
      <div v-if="cartItems.length > 0" class="flex flex-col gap-4 my-4">
        <div v-for="item in cartItems" class="flex items-center gap-4">
          <img v-if="item.image" :src="item.image" class="w-[60px]" />
          <div v-if="!item.image" class="w-[60px]" />

          <span class="flex-[5]">{{ item.title }}</span>
          <span class="flex-1">${{ item.price }}</span>
          <div class="flex items-center justify-center gap-4 w-[60px]">
            <button @click="handleRemoveItemFromCart(item.id)" class="text-lg">-</button>
            <span class="text-base">{{ item.count }}</span>
            <button @click="handleAddItemToCart(item)" class="text-lg">+</button>
          </div>
          <span class="flex-1">${{ item.price * item.count }}</span>
          <button @click="handleRemoveItemFromCart(item.id)" class="flex items-center justify-center w-[30px] h-[30px] p-3 text-white bg-[#dc3545] hover:bg-[#c82333] transition">X</button>
        </div>

        <div class="flex items-center justify-between">
          <span class="ml-[76px]">Total</span>
          <span class="mr-[50px]">${{ cartTotalValue }}</span>
        </div>
      </div>

      <div v-if="cartItems.length === 0" class="flex">
        <span class="flex-1 text-lg text-[#721c24] bg-[#f8d7da] border border-[#f5c6cb] px-7 py-3 my-4">Your cart is empty</span>
      </div>
    </div>
    <div class="flex items-center justify-end gap-1 pt-3 px-3 border-t border-[#dee2e6]">
      <button @click="emit('cancel')" class="font-smoothing-auto py-1 px-2 text-black hover:text-gray-800 transition">Close</button>
      <button v-if="cartItems.length > 0" @click="emit('confirm')" class="font-smoothing-auto py-1 px-2 text-white bg-[#be8040] hover:bg-[#a16d36] transition">Checkout</button>
    </div>
  </VueFinalModal>
</template>

<style>
.confirm-modal {
  display: flex;
  justify-content: center;
  align-items: center;
}
.confirm-modal-content {
  @apply w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all;
}

.dark .confirm-modal-content {
  background: #000;
}
</style>
