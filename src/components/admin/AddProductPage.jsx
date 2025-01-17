import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import '../../style/addProduct.css';

const AddProductPage = () => {
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [price, setPrice] = useState('');
  const [mrp, setMrp] = useState('');
  const [productSize, setProductSize] = useState('');
  const [qty, setQty] = useState('');
  const [tags, setTags] = useState([]); // To hold tags
  const navigate = useNavigate();

  useEffect(() => {
    ApiService.getAllCategory().then((res) => setCategories(res.categoryList));
  }, []);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imageUrl = await ApiService.uploadToCloudinary(file);
        setImage(imageUrl);
        setMessage('Image uploaded successfully');
      } catch (error) {
        setMessage(error.message || 'Failed to upload image');
      }
    }
  };

  const handleTagsChange = (e) => {
    const tagValue = e.target.value;
    if (e.key === 'Enter' && tagValue) {
      setTags([...tags, tagValue]);
      e.target.value = ''; // Clear input after adding tag
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (
      !image ||
      !categoryId ||
      !name ||
      !description ||
      !price ||
      !mrp ||
      !productSize ||
      !qty ||
      tags.length === 0
    ) {
      setMessage('All fields are mandatory, including tags');
      return;
    }

    if (price <= 0 || mrp <= 0 || qty <= 0 || productSize <= 0) {
      setMessage(
        'Price, MRP, Quantity, and Product Size must be positive numbers'
      );
      return;
    }

    // Constructing the product data object
    const productData = {
      categoryId: parseInt(categoryId, 10),
      imageUrl: image,
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
      mrp: parseFloat(mrp),
      qty: parseInt(qty, 10),
      productSize: parseFloat(productSize),
      tags: tags, // Pass tags directly as an array
    };

    try {
      // Call the addProduct2 API with the productData
      const response = await ApiService.addProduct2(productData);

      if (response.status === 200) {
        setMessage(response.message || 'Product added successfully');
        setTimeout(() => {
          setMessage('');
          navigate('/admin/products');
        }, 3000);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          error.message ||
          'Unable to upload product'
      );
    }
  };

  return (
    <div className="product-container">
      <form onSubmit={handleSubmit} className="product-form">
        <h2>Add Product</h2>
        {message && <div className="message">{message}</div>}

        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          accept=".png, .jpeg, .webp"
          onChange={handleImage}
        />

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
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label htmlFor="mrp">MRP</label>
        <input
          type="number"
          id="mrp"
          placeholder="MRP"
          value={mrp}
          onChange={(e) => setMrp(e.target.value)}
        />

        <label htmlFor="productSize">Product Size</label>
        <input
          type="number"
          id="productSize"
          placeholder="Product Size"
          value={productSize}
          onChange={(e) => setProductSize(e.target.value)}
        />

        <label htmlFor="qty">Quantity</label>
        <input
          type="number"
          id="qty"
          placeholder="Quantity"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />

        <label htmlFor="tags">Tags</label>
        <input
          type="text"
          id="tags"
          placeholder="Press Enter to add tag"
          onKeyDown={handleTagsChange}
        />
        {tags.length > 0 && (
          <div className="tags-list">
            {tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
                <button type="button" onClick={() => handleTagRemove(tag)}>
                  x
                </button>
              </span>
            ))}
          </div>
        )}

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductPage;
