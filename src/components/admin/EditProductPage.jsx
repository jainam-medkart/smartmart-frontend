import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ApiService from '../../service/ApiService'
import '../../style/addProduct.css'

const EditProductPage = () => {
  const { productId } = useParams() // Get the product ID from the URL
  const navigate = useNavigate()

  const [image, setImage] = useState(null)
  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState('')
  const [price, setPrice] = useState('')
  const [mrp, setMrp] = useState('')
  const [productSize, setProductSize] = useState('')
  const [qty, setQty] = useState('')
  const [tags, setTags] = useState([]) // Add state for tags

  useEffect(() => {
    ApiService.getAllCategory().then((res) => setCategories(res.categoryList))

    // Fetch existing product details to prepopulate form fields
    ApiService.getProductById(productId)
      .then((res) => {
        const product = res.product
        setCategoryId(product.category.id)
        setName(product.name)
        setDescription(product.description)
        setPrice(product.price)
        setMrp(product.mrp)
        setProductSize(product.productSize)
        setQty(product.qty)
        setImage(product.imageUrl)
        setTags(product.tags || []) // Set existing tags (if any)
      })
      .catch((error) => {
        setMessage('Failed to fetch product details')
        console.error(error)
      })
  }, [productId])

  const handleImage = async (e) => {
    const file = e.target.files[0]
    if (file) {
      try {
        const imageUrl = await ApiService.uploadToCloudinary(file)
        setImage(imageUrl)
        setMessage('Image uploaded successfully')
      } catch (error) {
        setMessage(error.message || 'Failed to upload image')
      }
    }
  }

  const handleTagChange = (e) => {
    const tagInput = e.target.value
    const tagArray = tagInput.split(',').map((tag) => tag.trim()) // Split input by commas and trim spaces
    setTags(tagArray) // Update tags state with array
  }

const handleSubmit = async (e) => {
  e.preventDefault()

  // If you have any validation checks, keep them as required

  const formData = new FormData()
  formData.append('image', image)
  formData.append('categoryId', categoryId)
  formData.append('name', name)
  formData.append('description', description)
  formData.append('price', price)
  formData.append('mrp', mrp)
  formData.append('productSize', productSize)
  formData.append('qty', qty)

  // Append each tag individually to the form data
  tags.forEach((tag, index) => {
    formData.append(`tags[${index}]`, tag)
  })

  try {
    // Call the updateProduct API with the formData
    const response = await ApiService.updateProducttg(productId, formData)
    if (response.status === 200) {
      setMessage(response.message)
      setTimeout(() => {
        setMessage('')
        navigate('/admin/products') // Redirect to products list after update
      }, 3000)
    }
  } catch (error) {
    setMessage(
      error.response?.data?.message ||
        error.message ||
        'Unable to update product'
    )
  }
}


  return (
    <div className="product-container">
      <form onSubmit={handleSubmit} className="product-form">
        <h2>Edit Product</h2>
        {message && <div className="message">{message}</div>}

        <label htmlFor="image">Image</label>
        {image && (
          <img
            src={image}
            alt="Product Preview"
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />
        )}
        <input type="file" id="image" onChange={handleImage} />

        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option value={cat.id} key={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <label htmlFor="name">Product Name</label>
        <input
          type="text"
          id="name"
          placeholder={name || 'Product name'}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder={description || 'Description'}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          placeholder={price || 'Price'}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label htmlFor="mrp">MRP</label>
        <input
          type="number"
          id="mrp"
          placeholder={mrp || 'MRP'}
          value={mrp}
          onChange={(e) => setMrp(e.target.value)}
        />

        <label htmlFor="productSize">Product Size</label>
        <input
          type="number"
          id="productSize"
          placeholder={productSize || 'Product Size'}
          value={productSize}
          onChange={(e) => setProductSize(e.target.value)}
        />

        <label htmlFor="qty">Quantity</label>
        <input
          type="number"
          id="qty"
          placeholder={qty || 'Quantity'}
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />

        <label htmlFor="tags">Tags (comma separated)</label>
        <input
          type="text"
          id="tags"
          placeholder="e.g. test, magic"
          value={tags.join(', ')} // Display tags as a comma-separated string
          onChange={handleTagChange}
        />

        <button type="submit">Update Product</button>
      </form>
    </div>
  )
}

export default EditProductPage
