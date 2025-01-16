import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../components/context/CartContext.jsx';
import '../style/cart.css';
import ApiService from '../service/ApiService.js';

const CartPage = () => {
  const { cart, dispatch } = useCart();
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const incrementItem = (product) => {
    dispatch({ type: 'INCREMENT_ITEM', payload: product });
  };

  const decrementItem = (product) => {
    const cartItem = cart.find((item) => item.id === product.id);
    if (cartItem && cartItem.quantity > 1) {
      dispatch({ type: 'DECREMENT_ITEM', payload: product });
    } else {
      dispatch({ type: 'REMOVE_ITEM', payload: product });
    }
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cart.length === 0) {
      setMessage('Your cart is empty. Add items before checkout.');
      return;
    }

    if (!ApiService.isAuthenticated()) {
      console.log('User is not authenticated');
      navigate('/login'); // Redirect to login if the user is not authenticated
      return;
    }

    navigate('/checkout');
  };

  return (
    <div className="cart-page-container">
      <div className="cart-page">
        <div className="cart-items">
          <h1>Your Cart</h1>
          {message && <p className="response-message">{message}</p>}
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>
                      <div className="quantity-controls">
                        <button onClick={() => decrementItem(item)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => incrementItem(item)}>+</button>
                      </div>
                    </td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button onClick={() => decrementItem(item)}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="total-price">Total: ${totalPrice.toFixed(2)}</div>
          <button className="checkout-button" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
