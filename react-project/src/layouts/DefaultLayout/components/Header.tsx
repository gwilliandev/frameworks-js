import { Link } from 'react-router-dom'
import { Cart } from '../../../components/Cart'

export function Header() {
  function handleScrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleScrollToMenu() {
    const element = document.getElementById('menu')
    element?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
  }

  return (
    <header>
      <nav className="flex items-center bg-white py-3 px-7 w-full fixed top-0 left-0 z-[1030] border-b border-gray-200">
        <Link to="/" className="mr-8">
          <img src="https://wowthemesnet.github.io/template-fooddelivery-bootstrap-html/img/logo.png" alt="logotipo" className="max-w-full max-h-[40px]" />
        </Link>
        <div className="flex-1 flex items-center">
          <div className="flex-1 flex items-center gap-4">
            <button onClick={handleScrollToTop} className="text-black">
              Welcome
            </button>
            <button onClick={handleScrollToMenu} className="text-[#00000080] hover:text-black transition">
              Today's Menu
            </button>
          </div>
          <div className="mx-auto">
            <Cart />
          </div>
        </div>
      </nav>
    </header>
  )
}
