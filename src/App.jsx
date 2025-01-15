import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Home from './pages/Home.jsx'
import { ProtectedRoute, AdminRoute } from './service/GuardService.jsx'
import { CartProvider } from './components/context/CartContext.jsx'
import ProductDetailsPage from './pages/ProductDetailsPage.jsx'
import CategoryListPage from './pages/CategoryListPage.jsx'
import './style/transitions.css'
import CategoryProductsPage from './pages/CategoryProductsPage';

const App = () => {
  return (
    <Router>
      <CartProvider>
        <div className="app-container">
          <Navbar />
          <TransitionWrapper />
          {/* <Footer /> */}
        </div>
      </CartProvider>
    </Router>
  )
}

const TransitionWrapper = () => {
  const location = useLocation()

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <div className="route-section">
          <Routes location={location}>
            <Route exact path="/" element={<Home />} />
            <Route
              path="/product/:productId"
              element={<ProductDetailsPage />}
            />
            <Route path="/categories" element={<CategoryListPage />} />
            <Route path="/category/:categoryId" element={<CategoryProductsPage />} />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  )
}

export default App
