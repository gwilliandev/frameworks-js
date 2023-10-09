import { useContext, useState } from 'react'
import { ShoppingCart } from '@phosphor-icons/react'

import CartModal from './components/Modal'
import { CartContext } from '../../contexts/CartContext'

export function Cart() {
  const { cartItems } = useContext(CartContext)
  const [isOpen, setIsOpen] = useState(false)

  function handleOpenModal() {
    setIsOpen(true)
  }

  function handleCloseModal() {
    setIsOpen(false)
  }

  return (
    <>
      <button onClick={handleOpenModal} className="flex items-center gap-2">
        {cartItems.length > 0 && <span>{cartItems.length}</span>}
        <ShoppingCart size={20} weight="light" />
      </button>
      <CartModal isOpen={isOpen} onCloseModal={handleCloseModal} />
    </>
  )
}
