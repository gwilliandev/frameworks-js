import { createStore, useStore } from 'vuex'
import cart from './modules/cart'

export const store = createStore({
  modules: {
    cart,
  },
})

export type VuexUseStoreType = typeof useStore
export { useStore }
