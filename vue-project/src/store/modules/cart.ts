import { ActionContext, Module } from 'vuex'
import { Carte } from '../../lib/axios/models/carte'

export type CartItem = Carte & {
  count: number
}

type CartState = {
  cartItems: CartItem[]
}

type CartStateActionContext = ActionContext<CartState, any>

const getters = {
  items: (s: CartState) => s.cartItems,
  count: (s: CartState) => s.cartItems.length,
}

const actions = {
  clear({ commit }: CartStateActionContext) {
    commit('clearCart')
  },
  add({ commit }: CartStateActionContext, payload: { item: CartItem }) {
    commit('addToCart', payload)
  },
  remove({ commit }: CartStateActionContext, payload: { id: string }) {
    commit('removeToCart', payload)
  },
}

const mutations = {
  clearCart(s: CartState) {
    s.cartItems = []
  },
  addToCart(s: CartState, payload: { item: CartItem }) {
    const { cartItems } = s
    const cartItem = payload.item

    const isItemAlreadyInCart = cartItems.find((item) => item.id === cartItem.id)

    if (isItemAlreadyInCart) {
      s.cartItems = cartItems.map((item) => {
        if (item.id === cartItem.id) return { ...item, count: item.count + 1 }
        return item
      })
    } else {
      const newItem = { ...cartItem, count: 1 }
      s.cartItems = [...cartItems, newItem]
    }
  },
  removeToCart(s: CartState, payload: { id: string }) {
    const { cartItems } = s
    const { id } = payload

    const itemsInCart = cartItems.find((item) => item.id === id)?.count

    if (itemsInCart && itemsInCart > 1) {
      s.cartItems = cartItems.map((item) => {
        if (item.id === id) return { ...item, count: item.count - 1 }
        return item
      })
    } else {
      s.cartItems = cartItems.filter((item) => item.id !== id)
    }
  },
}

const state: CartState = {
  cartItems: [],
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
} as Module<CartState, any>
