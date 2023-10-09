import { Routes, Route } from 'react-router-dom'

import { DefaultLayout } from './layouts/DefaultLayout'
import { Home } from './pages/Home'
import { CheckoutSuccess } from './pages/CheckoutSuccess'
import { Page404 } from './pages/404'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/checkout" element={<CheckoutSuccess />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  )
}
