import { useContext, useEffect, useState } from 'react'
import { Carte } from '../../../lib/axios/models/carte'
import { api } from '../../../lib/axios'
import { CartContext } from '../../../contexts/CartContext'

type CarteList = {
  groups: string[]
  menu: Record<string, Carte[]>
}

export function Menu() {
  const { addToCart } = useContext(CartContext)

  const [selectedCarte, setSelectedCarte] = useState(0)
  const [carte, setCarte] = useState<CarteList | null>(null)
  const [carteSize, setCarteSize] = useState(4)

  const menuItems = carte?.menu[carte.groups[selectedCarte]]

  function handleSelectCarte(index: number) {
    setSelectedCarte(index)
  }

  function handleAddToCart(item: Carte) {
    addToCart(item)
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

    setCarte(carteList)
  }

  function loadMore() {
    setCarteSize((state) => state + 4)
  }

  async function fetchMenuItems() {
    try {
      const { data } = await api.get<Carte[]>('/carte')
      groupItemByType(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchMenuItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col items-center justify-center">
      <ul className="flex gap-9 mb-16">
        {carte?.groups.map((carteItem, index) => (
          <li key={carteItem} className={`py-1 uppercase cursor-pointer text-[#be8040] hover:text-[#85592d] border-b ${selectedCarte === index ? 'border-[#be8040] hover:border-[#be8040]' : 'border-transparent'}`}>
            <span onClick={() => handleSelectCarte(index)}>{carteItem}s</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-14">
        {menuItems?.map((menuItem, index) => {
          return (
            index < carteSize && (
              <div key={menuItem.id} className="flex items-center justify-center gap-12">
                {menuItem.image && <img src={menuItem.image} className="max-w-[25%] max-h-36" />}
                <div className="flex flex-col flex-1">
                  <div className="flex">
                    <span className="text-3xl font-smoothing-auto border-b border-transparent">{menuItem.title}</span>
                    <span className="flex-1 mb-3 mx-2 border-b border-dashed border-[#aaa]"></span>
                    <span className="text-2xl font-smoothing-auto border-b border-transparent">${menuItem.price}</span>
                  </div>
                  <p className="text-base">{menuItem.description}</p>
                  <div className="mt-4">
                    <button onClick={() => handleAddToCart(menuItem)} className="font-smoothing-auto py-1 px-2 text-sm text-[#be8040] border border-[#be8040] hover:text-white hover:bg-[#be8040] transition">
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            )
          )
        })}
        {menuItems && carteSize < menuItems.length && (
          <div className="flex items-center justify-center">
            <button onClick={loadMore} className="font-smoothing-auto py-1 px-2 text-white bg-[#be8040] hover:bg-[#a16d36] transition">
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
