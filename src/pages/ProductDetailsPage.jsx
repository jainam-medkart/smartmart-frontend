import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../components/context/CartContext.jsx';
import ApiService from '../service/ApiService';
import '../style/productDetailsPage.css';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { cart, dispatch } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await ApiService.getProductById(productId);
      setProduct(response.product);
    } catch (error) {
      console.log(error.message || error);
    }
  };

  const addToCart = () => {
    if (product) {
      dispatch({ type: 'ADD_ITEM', payload: product });
    }
  };

  const incrementItem = () => {
    if (product) {
      dispatch({ type: 'INCREMENT_ITEM', payload: product });
    }
  };

  const decrementItem = () => {
    if (product) {
      const cartItem = cart.find((item) => item.id === product.id);
      if (cartItem && cartItem.quantity > 1) {
        dispatch({ type: 'DECREMENT_ITEM', payload: product });
      } else {
        dispatch({ type: 'REMOVE_ITEM', payload: product });
      }
    }
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  const cartItem = cart.find((item) => item.id === product.id);

  return (
    <div className="product-detail">
      <img src={product?.imageUrl} alt={product?.name} />
      <div className="product-info">
        <h1>{product?.name}</h1>
        <p>{product?.description}</p>
        <span className="mrp">${Number(product.mrp).toFixed(2)}</span>
        <span className="price">${product.price.toFixed(2)}</span>
        <p className="category">Category: {product?.category?.name}</p>
        <p className="quantity">Available: {product?.qty} items</p>
        
        <p className="size">Size: {product?.productSize} Per Item</p>

        {cartItem ? (
          <div className="quantity-controls">
            <button onClick={decrementItem}>-</button>
            <span>{cartItem.quantity}</span>
            <button onClick={incrementItem}>+</button>
          </div>
        ) : (
          <button className="add-to-cart" onClick={addToCart}>Add To Cart</button>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;