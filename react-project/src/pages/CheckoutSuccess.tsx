import { useContext, useEffect, useState } from 'react'
import { CartContext, CartItem } from '../contexts/CartContext'
import { Link } from 'react-router-dom'
import { Page404 } from './404'

export function CheckoutSuccess() {
  const { cartItems, clearCart } = useContext(CartContext)
  const [checkoutCart, setCheckoutCart] = useState<CartItem[]>([])

  const cartTotalValue = checkoutCart.reduce((acc, item) => {
    acc += item.price * item.count
    return acc
  }, 0)

  useEffect(() => {
    setCheckoutCart(cartItems)
    clearCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!checkoutCart.length) {
    return <Page404 />
  }

  return (
    <div id="hero-2" className="min-w-screen min-h-screen">
      <div className="center flex flex-col items-center content-center justify-center gap-8">
        <h1 className="text-white text-5xl">Checkout completed successfully</h1>
        {checkoutCart.map((item) => (
          <div key={item.id} className="flex items-center gap-4 text-white">
            <span className="text-lg">{item.count}</span>
            <span className="text-xs">X</span>
            <span className="text-lg">{item.title}</span>
          </div>
        ))}
        <div className="flex items-center justify-center w-full text-white">
          <span className="text-lg font-smoothing-auto border-b border-transparent">Total</span>
          <span className="flex-1 mt-2 mx-2 border-b border-dashed border-[#aaa]"></span>
          <span className="text-lg font-smoothing-auto border-b border-transparent">${cartTotalValue}</span>
        </div>
        <Link to="/" className="text-xl text-white">
          Back to Menu
        </Link>
      </div>
    </div>
  )
}
