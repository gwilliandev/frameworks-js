import { Fragment, useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CartContext, CartItem } from '../../../contexts/CartContext'
import { useNavigate } from 'react-router-dom'

type CartModalProps = {
  isOpen: boolean
  onCloseModal: () => void
}

export default function CartModal({ isOpen, onCloseModal }: CartModalProps) {
  const { cartItems, addToCart, removeToCart } = useContext(CartContext)

  const navigate = useNavigate()

  const handleCloseModal = onCloseModal

  const cartTotalValue = cartItems.reduce((acc, item) => {
    acc += item.price * item.count
    return acc
  }, 0)

  function handleCheckout() {
    navigate('/checkout')
  }

  function handleAddItemToCart(item: CartItem) {
    addToCart(item)
  }

  function handleRemoveItemFromCart(id: string) {
    removeToCart(id)
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleCloseModal}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title></Dialog.Title>
                <div className="flex flex-col pt-3 px-3 border-t border-[#dee2e6]">
                  {cartItems.length > 0 && (
                    <div className="flex flex-col gap-4 my-4">
                      {cartItems.map((item, index) => (
                        <div key={item.id + index} className="flex items-center gap-4">
                          {item.image && <img src={item.image} className="w-[60px]" />}
                          {!item.image && <div className="w-[60px]" />}
                          <span className="flex-[5]">{item.title}</span>
                          <span className="flex-1">${item.price}</span>
                          <div className="flex items-center justify-center gap-4 w-[60px]">
                            <button onClick={() => handleRemoveItemFromCart(item.id)} className="text-lg">
                              -
                            </button>
                            <span className="text-base">{item.count}</span>
                            <button onClick={() => handleAddItemToCart(item)} className="text-lg">
                              +
                            </button>
                          </div>
                          <span className="flex-1">${item.price * item.count}</span>
                          <button onClick={() => handleRemoveItemFromCart(item.id)} className="flex items-center justify-center w-[30px] h-[30px] p-3 text-white bg-[#dc3545] hover:bg-[#c82333] transition">
                            X
                          </button>
                        </div>
                      ))}
                      <div className="flex items-center justify-between">
                        <span className="ml-[76px]">Total</span>
                        <span className="mr-[50px]">${cartTotalValue}</span>
                      </div>
                    </div>
                  )}

                  {cartItems.length === 0 && (
                    <div className="flex">
                      <span className="flex-1 text-lg text-[#721c24] bg-[#f8d7da] border border-[#f5c6cb] px-7 py-3 my-4">Your cart is empty</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-end gap-1 pt-3 px-3 border-t border-[#dee2e6]">
                  <button onClick={handleCloseModal} className="font-smoothing-auto py-1 px-2 text-black hover:text-gray-800 transition">
                    Close
                  </button>
                  {cartItems.length > 0 && (
                    <button onClick={handleCheckout} className="font-smoothing-auto py-1 px-2 text-white bg-[#be8040] hover:bg-[#a16d36] transition">
                      Checkout
                    </button>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
