<script setup lang="ts">
import { ref, reactive, computed, onMounted, toRaw } from 'vue'
import { useStore } from 'vuex'
import { Carte } from '../../../lib/axios/models/carte'
import { api } from '../../../lib/axios'

type CarteList = {
  groups: string[]
  menu: Record<string, Carte[]>
}

const store = useStore()

const carteSize = ref(4)
const selectedCarte = ref(0)
const carte = reactive({} as CarteList)

const menuItems = computed(() => {
  return carte.menu ? carte.menu[carte.groups[selectedCarte.value]] : []
})

function handleSelectCarte(index: number) {
  selectedCarte.value = index
}

function handleAddToCart(item: Carte) {
  store.dispatch('cart/add', { item: toRaw(item) })
}

function loadMore() {
  carteSize.value = carteSize.value + 4
}

function groupItemByType(items: Carte[]) {
  const carteList: CarteList = {
    groups: [],
    menu: {},
  }

  carteList.groups = items
    .map((item) => item.type)
    .reduce((acc, item) => {
      if (acc.length !== 0 && acc.includes(item)) return acc
      acc.push(item)
      return acc
    }, [] as string[])

  carteList.groups.forEach((group) => {
    carteList.menu[group] = items.filter((item) => item.type === group)
  })

  carte.menu = carteList.menu
  carte.groups = carteList.groups
}

async function fetchMenuItems() {
  try {
    const { data } = await api.get<Carte[]>('/carte')
    groupItemByType(data)
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  fetchMenuItems()
})
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <ul class="flex gap-9 mb-16">
      <li
        v-for="(carteItem, index) in carte?.groups"
        class="py-1 uppercase cursor-pointer text-[#be8040] hover:text-[#85592d] border-b"
        :class="[selectedCarte === index ? 'border-[#be8040] hover:border-[#be8040]' : 'border-transparent']"
      >
        <span @click="handleSelectCarte(index)">{{ carteItem }}s</span>
      </li>
    </ul>
    <div class="flex flex-col gap-14">
      <template v-for="(menuItem, index) in menuItems">
        <div v-if="index < carteSize" class="flex items-center justify-center gap-12">
          <img v-if="menuItem.image" :src="menuItem.image" class="max-w-[25%] max-h-36" />
          <div class="flex flex-col flex-1">
            <div class="flex">
              <span class="text-3xl font-smoothing-auto border-b border-transparent">{{ menuItem.title }}</span>
              <span class="flex-1 mb-3 mx-2 border-b border-dashed border-[#aaa]"></span>
              <span class="text-2xl font-smoothing-auto border-b border-transparent">${{ menuItem.price }}</span>
            </div>
            <p class="text-base">{{ menuItem.description }}</p>
            <div class="mt-4">
              <button @click="handleAddToCart(menuItem)" class="font-smoothing-auto py-1 px-2 text-sm text-[#be8040] border border-[#be8040] hover:text-white hover:bg-[#be8040] transition">Add to cart</button>
            </div>
          </div>
        </div>
      </template>
      <div v-if="menuItems && carteSize < menuItems.length" class="flex items-center justify-center">
        <button @click="loadMore" class="font-smoothing-auto py-1 px-2 text-white bg-[#be8040] hover:bg-[#a16d36] transition">Load More</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
