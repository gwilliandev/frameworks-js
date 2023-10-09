import { Link } from 'react-router-dom'

export function Page404() {
  return (
    <div id="hero-2" className="min-w-screen min-h-screen">
      <div className="center flex flex-col items-center content-center justify-center gap-8">
        <h1 className="text-white text-5xl">404 Page Not Found</h1>
        <Link to="/" className="text-xl text-white">
          Back to Menu
        </Link>
      </div>
    </div>
  )
}
