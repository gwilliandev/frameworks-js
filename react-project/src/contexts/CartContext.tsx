import { ReactNode, createContext, useState } from 'react'
import { Carte } from '../lib/axios/models/carte'

export type CartItem = Carte & {
  count: number
}

type CartContextType = {
  cartItems: CartItem[]
  clearCart: () => void
  addToCart: (cartItems: Carte) => void
  removeToCart: (id: string) => void
}

type CartContextProviderProps = {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextType)

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  function clearCart() {
    setCartItems([])
  }

  function addToCart(cartItem: Carte) {
    const isItemAlreadyInCart = cartItems.find((item) => item.id === cartItem.id)

    if (isItemAlreadyInCart) {
      setCartItems((state) => {
        return state.map((item) => {
          if (item.id === cartItem.id) return { ...item, count: item.count + 1 }
          return item
        })
      })
    } else {
      const newItem = { ...cartItem, count: 1 }
      setCartItems((state) => [...state, newItem])
    }
  }

  function removeToCart(id: string) {
    const itemInCart = cartItems.find((item) => item.id === id)?.count

    if (itemInCart && itemInCart > 1) {
      setCartItems((state) => {
        return state.map((item) => {
          if (item.id === id) return { ...item, count: item.count - 1 }
          return item
        })
      })
    } else {
      setCartItems((state) => state.filter((item) => item.id !== id))
    }
  }

  return <CartContext.Provider value={{ cartItems, clearCart, addToCart, removeToCart }}>{children}</CartContext.Provider>
}
