import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Navbar from '../common/Navbar.jsx'
import Home from '../../pages/Home.jsx'
import { CartProvider } from '../context/CartContext.jsx'
import ProductDetailsPage from '../../pages/ProductDetailsPage.jsx'
import CategoryListPage from '../../pages/CategoryListPage.jsx'
import { ProtectedRoute, AdminRoute } from '../../service/GuardService.jsx'
import "./../../style/transitions.css"
// import './style/transitions.css'
import CartPage from '../../pages/CartPage.jsx'
import RegisterPage from '../../pages/RegisterPage.jsx'
import ProfilePage from '../../pages/ProfilePage.jsx'
import AddressPage from '../../pages/AddressPage.jsx'
// import './style/App.css'
import './../../style/App.css'
import LoginPage from '../../pages/LoginPage.jsx'
import AdminPage from './AdminPage.jsx'


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
            <Route path="/categories" element={<CategoryListPage />} />
            <Route path="/cart" element={<CartPage/>} />
            <Route path='/register' element={<RegisterPage/>} />
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/profile' element={<ProfilePage/>} />
            <Route path='/edit-address' element={<AddressPage/>}/>

            <Route path='/admin' element={<AdminPage/>} />
            <Route path='/admin/categories' element={<AdminRoute><AdminCategoryPage/></AdminRoute>} />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  )
}

export default App