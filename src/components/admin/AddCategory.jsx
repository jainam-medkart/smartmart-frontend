import React, { useState } from 'react';
import ApiService from '../../service/ApiService';
import '../../style/adminCategory.css';
import '../../style/addCategory.css'

const AddCategory = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const categoryData = { name, image };
      await ApiService.createCategory(categoryData);
      setMessage('Category added successfully');
      setName('');
      setImage('');
    } catch (error) {
      setMessage(error.response?.data?.message || error.message || 'Failed to add category');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imageUrl = await ApiService.uploadToCloudinary(file);
        console.log(imageUrl)
        setImage(imageUrl);
        setMessage('Image uploaded successfully');
      } catch (error) {
        setMessage(error.message || 'Failed to upload image');
      }
    }
  };

  return (
    <div className="add-category-page">
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="category-form">
        <h2>Add Category</h2>
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="file"
          accept=".png, .jpeg, .webp"
          onChange={handleImageUpload}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddCategory;