import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CartContextProvider } from './cases/cart/context/cart-context.tsx'
import { AuthContextProvider } from './cases/auth/contexts/auth.contexts.tsx'
import { FavoritesContextProvider } from './cases/favorites/context/favorites-context.tsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <CartContextProvider>
          <FavoritesContextProvider>
            <App />
          </FavoritesContextProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </BrowserRouter>,
)