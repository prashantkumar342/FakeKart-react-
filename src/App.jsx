import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
const Home = lazy(() => import('./components/Home'))
const Order = lazy(() => import('./components/Order'))
const Cart = lazy(() => import('./components/Cart'))
const Wishlist = lazy(() => import('./components/Wishlist'))
const Navbar = lazy(() => import('./components/Navbar'))
const Categories = lazy(() => import('./components/Categories'))
const Productspecs = lazy(() => import('./components/Productspecs'))

function App() {


  return (
    <>
      <header>
        <Suspense fallback="loading">
          <Navbar />
        </Suspense>
      </header>
      <main>
        <Suspense fallback="loading....">
          <Routes>
            <Route path='/' exacts element={<Home />} />
            <Route path="/Order" element={<Order />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Wishlist" element={<Wishlist />} />
            <Route path="/:category" element={<Categories />} />
            <Route path="/:category/:productId" element={<Productspecs />} />
          </Routes>
        </Suspense>
      </main>
    </>
  )
}

export default App
