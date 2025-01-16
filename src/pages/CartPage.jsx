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

  const handleCheckout = async () => {
    if (!ApiService.isAuthenticated()) {
      setMessage("You need to login first before you can place an order");
      setTimeout(() => {
        setMessage('');
        navigate("/login");
      }, 3000);
      return;
    }

    if (cart.length === 0) {
      setMessage('Your cart is empty. Add items before checkout.');
      return;
    }

    if (totalPrice < 500) {
      setMessage('The total value of your cart must be at least 500 to proceed to checkout.');
      return;
    }

    const orderItems = cart.map(item => ({
      productId: item.id,
      quantity: item.quantity
    }));

    const orderRequest = {
      totalPrice,
      items: orderItems,
    };

    try {
      const response = await ApiService.createOrder(orderRequest);
      setMessage(response.message);

      setTimeout(() => {
        setMessage('');
      }, 5000);

      if (response.status === 200) {
        dispatch({ type: 'CLEAR_CART' });
      }

    } catch (error) {
      setMessage(error.response?.data?.message || error.message || 'Failed to place an order');
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
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
          <h4 className=''>Min order value is 500</h4>
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