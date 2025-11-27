import { Route, Routes } from "react-router-dom"
import { ProductListPage } from "./pages/product-list.page"
import { ProductdetailPage } from "./pages/product-detail.page"
import { Header } from "./components/ui/layout/header"
import { CartPage } from "./pages/cart-page"
import { SignInPage } from "./pages/signin-page"
import { SignUpPage } from "./pages/signup-page"
import { OrderPage } from "./pages/order-page"
import { FavoritesPage } from "./pages/favorites-page"
import { PrivateRoute } from "./routes/private.route"

function App() {

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <main className="bg-slate-50">
        <div className="container mx-auto flex flex-col p-4 gap-4">
          <Routes>
            <Route path="/" element={<ProductListPage />} />
            <Route path="/product/:id" element={<ProductdetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route 
              path="/orders" 
              element={
                <PrivateRoute>
                  <OrderPage />
                </PrivateRoute>
              } 
            />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default App
