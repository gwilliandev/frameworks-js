export function Hero() {
  function handleScrollToMenu() {
    const element = document.getElementById('menu')
    element?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2 mx-auto text-white">
      <h1 className="animation-fade-up-1 hero-title">Bistrot Français</h1>
      <p className="animation-fade-up-2 text-xl">We are closed for the moment, but we will still deliver food at your place!</p>
      <button onClick={handleScrollToMenu} className="animation-fade-up-3 text-2xl py-1 mt-4 border-t border-b border-[#dee2e6] hover:text-gray-200">
        View Today's Menu
      </button>
    </div>
  )
}
