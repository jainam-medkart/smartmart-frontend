import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Home from './pages/Home.jsx'
import { ProtectedRoute, AdminRoute } from './service/GuardService.jsx'
import { CartProvider } from './components/context/CartContext.jsx'

function App() {
  return (
    <Router>
      <CartProvider>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>

        {/* <Footer /> */}
      </CartProvider>
    </Router>
  )
}

export default App
