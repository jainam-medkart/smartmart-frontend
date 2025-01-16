import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiService from "../../service/ApiService";
import '../../style/addProduct.css';

const EditProductPage = () => {
    const { productId } = useParams(); // Get the product ID from the URL
    const navigate = useNavigate();
    
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

    useEffect(() => {
        ApiService.getAllCategory().then((res) => setCategories(res.categoryList));

        // Fetch existing product details to prepopulate form fields
        ApiService.getProductById(productId)
            .then((res) => {
                const product = res.product; // Access product data inside the 'product' key
                setCategoryId(product.category.id); // Nested category ID
                setName(product.name);
                setDescription(product.description);
                setPrice(product.price);
                setMrp(product.mrp);
                setProductSize(product.productSize);
                setQty(product.qty);
                setImage(product.imageUrl); // Assuming the image is in 'imageUrl'
            })
            .catch((error) => {
                setMessage('Failed to fetch product details');
                console.error(error);
            });
    }, [productId]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation checks
        if (!image || !categoryId || !name || !description || !price || !mrp || !productSize || !qty) {
            setMessage('All fields are mandatory');
            return;
        }

        if (price <= 0 || mrp <= 0 || qty <= 0 || productSize <= 0) {
            setMessage('Price, MRP, Quantity, and Product Size must be positive numbers');
            return;
        }

        const formData = new FormData();
        formData.append('image', image);
        formData.append('categoryId', categoryId);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('mrp', mrp);
        formData.append('productSize', productSize);
        formData.append('qty', qty);

        try {
            // Call the updateProduct API with the formData
            const response = await ApiService.updateProduct(productId, formData);
            if (response.status === 200) {
                setMessage(response.message);
                setTimeout(() => {
                    setMessage('');
                    navigate('/admin/products'); // Redirect to products list after update
                }, 3000);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || error.message || 'Unable to update product');
        }
    };

    return (
        <div className="product-container">
            <form onSubmit={handleSubmit} className="product-form">
                <h2>Edit Product</h2>
                {message && <div className="message">{message}</div>}
                
                <label htmlFor="image">Image</label>
                {image && <img src={image} alt="Product Preview" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />}
                <input type="file" id="image" onChange={handleImage} />
                
                <label htmlFor="category">Category</label>
                <select id="category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option value={cat.id} key={cat.id}>{cat.name}</option>
                    ))}
                </select>

                <label htmlFor="name">Product Name</label>
                <input 
                    type="text" 
                    id="name" 
                    placeholder={name || "Product name"}  // Use existing name as placeholder
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />

                <label htmlFor="description">Description</label>
                <textarea 
                    id="description"
                    placeholder={description || "Description"}  // Use existing description as placeholder
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                />

                <label htmlFor="price">Price</label>
                <input 
                    type="number" 
                    id="price" 
                    placeholder={price || "Price"}  // Use existing price as placeholder
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                />

                <label htmlFor="mrp">MRP</label>
                <input 
                    type="number" 
                    id="mrp" 
                    placeholder={mrp || "MRP"}  // Use existing MRP as placeholder
                    value={mrp} 
                    onChange={(e) => setMrp(e.target.value)} 
                />

                <label htmlFor="productSize">Product Size</label>
                <input 
                    type="number" 
                    id="productSize" 
                    placeholder={productSize || "Product Size"}  // Use existing product size as placeholder
                    value={productSize} 
                    onChange={(e) => setProductSize(e.target.value)} 
                />

                <label htmlFor="qty">Quantity</label>
                <input 
                    type="number" 
                    id="qty" 
                    placeholder={qty || "Quantity"}  // Use existing quantity as placeholder
                    value={qty} 
                    onChange={(e) => setQty(e.target.value)} 
                />

                <button type="submit">Update Product</button>
            </form>
        </div>
    );
};

export default EditProductPage;
