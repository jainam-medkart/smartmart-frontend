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
import CartPage from './pages/CartPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import AddressPage from './pages/AddressPage.jsx'
import './style/App.css'
import LoginPage from './pages/LoginPage.jsx'
import AdminPage from './components/admin/AdminPage.jsx'
import AdminCategoryPage from './components/admin/AdminCategoryPage.jsx'
import AddCategory from './components/admin/AddCategory.jsx'
import EditCategory from './components/admin/EditCategory.jsx'
import AdminProductPage from './components/admin/AdminProductPage.jsx'
import AddProductPage from './components/admin/AddProductPage.jsx'
import EditProductPage from './components/admin/EditProductPage.jsx'
import AdminOrdersPage from './components/admin/AdminOrderPage.jsx'
import AdminOrderDetailsPage from './components/admin/OrderDetailsPage.jsx'
import AdminRegistration from './components/admin/AdminRegistration.jsx'

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
            <Route path='/add-address' element={<ProtectedRoute element={<AddressPage/>} />} />

            {/* <Route path='/admin' element={ <AdminPage/>} /> */}
            <Route path='/admin' element={<AdminRoute element={<AdminPage/>} />} />
            <Route path='/admin/categories' element={<AdminRoute element={<AdminCategoryPage/>} />} />
            <Route path='/admin/add-category' element={<AdminRoute element={<AddCategory/>} />} />
            <Route path='/admin/edit-category/:categoryId' element={<AdminRoute element={<EditCategory/>} />} />
            <Route path='/admin/products' element={<AdminRoute element={<AdminProductPage/>} />} />
            <Route path='/admin/add-product' element={<AdminRoute element={<AddProductPage/>} />} />
            <Route path='/admin/edit-product/:productId' element={<AdminRoute element={<EditProductPage/>} />} />
            <Route path='/admin/orders' element={<AdminRoute element={<AdminOrdersPage/>} />} />
            <Route path='/admin/order-details/:itemId' element={<AdminRoute element={<AdminOrderDetailsPage/>} />} />
            <Route path='/admin/add-admin' element={<AdminRoute element={<AdminRegistration/>} />} />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  )
}

export default App
