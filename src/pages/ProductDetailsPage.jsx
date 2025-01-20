import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom' 
import { useCart } from '../components/context/CartContext.jsx'
import ApiService from '../service/ApiService'
import '../style/productDetailsPage.css'

const ProductDetailsPage = () => {
  const { productId } = useParams()
  const [searchParams] = useSearchParams()
  const { cart, dispatch } = useCart()
  const [product, setProduct] = useState(null)
  const [extraImages, setExtraImages] = useState([]) 
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    fetchProduct()
  }, [productId])

  const fetchProduct = async () => {
    try {
      const response = await ApiService.getProductById(productId)
      setProduct(response.product)

      const response2 = await ApiService.fetchAllImagesFromProductId(productId)
      setExtraImages(response2.data || [])
    } catch (error) {
      console.error(error.message || error)
    }
  }

  const addToCart = () => {
    if (product) {
      dispatch({ type: 'ADD_ITEM', payload: product })
    }
  }

  const incrementItem = () => {
    if (product) {
      dispatch({ type: 'INCREMENT_ITEM', payload: product })
    }
  }

  const decrementItem = () => {
    if (product) {
      const cartItem = cart.find((item) => item.id === product.id)
      if (cartItem && cartItem.quantity > 1) {
        dispatch({ type: 'DECREMENT_ITEM', payload: product })
      } else {
        dispatch({ type: 'REMOVE_ITEM', payload: product })
      }
    }
  }

  const goToNextImage = () => {
    if (currentImageIndex < extraImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
    }
  }

  const goToPrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1)
    }
  }

  if (!product) {
    return <p>Loading product details...</p>
  }

  const cartItem = cart.find((item) => item.id === product.id)

  return (
    <div className="product-detail">
      <div className="image-carousel">
        <div className="carousel-buttons">
          <img
            src={extraImages[currentImageIndex]?.imageUrl || product.imageUrl}
            alt={product?.name}
            className="product-image"
          />
          <button className="carousel-button prev" onClick={goToPrevImage}>←</button>
          <button className="carousel-button next" onClick={goToNextImage}>→</button>
        </div>
      </div>

      <div className="product-info">
        <h1>{product?.name}</h1>
        <h4>WS Code : {product?.wsCode}</h4>
        <p>Description: {product?.description}</p>

        <div className="pricing">
          <span className="mrp">MRP: ${Number(product.mrp).toFixed(2)}</span>
          <span className="price">Sales Price: ${product.price.toFixed(2)}</span>
        </div>

        <p className="category">Category: {product?.category?.name}</p>
        <p className="quantity">Available Stock: {product?.qty} items</p>
        <p className="size">Package Size: {product?.productSize}</p>

        <div className="tags">
          <p>Tags: {product?.tags?.join(', ')}</p>
        </div>

        {product.qty > 0 ? (
          cartItem ? (
            <div className="quantity-controls">
              <button onClick={decrementItem}>-</button>
              <span>{cartItem.quantity}</span>
              <button onClick={incrementItem}>+</button>
            </div>
          ) : (
            <button className="add-to-cart" onClick={addToCart}>
              Add to Cart
            </button>
          )
        ) : (
          <p className="out-of-stock">Out of Stock</p>
        )}
      </div>
    </div>
  )
}

export default ProductDetailsPage