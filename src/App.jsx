import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import {ProtectedRoute, AdminRoute} from './service/GuardService.jsx'
import {CartProvider} from './components/context/CartContext.jsx'

function App() {
  return (
    <Router>
      <CartProvider>
        <Navbar />

        

        <Footer/>
      </CartProvider>
    </Router>
  );
}

export default App;