import { Hero } from './components/Hero'
import { Menu } from './components/Menu'

export function Home() {
  return (
    <div className="">
      <section id="hero" className="flex items-center min-h-[80vh]">
        <Hero />
      </section>
      <section id="menu" className='my-20'>
        <Menu />
      </section>
    </div>
  )
}
