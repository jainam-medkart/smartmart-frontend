import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";
import { useNavigate, useParams } from "react-router-dom";
import "../../style/addCategory.css";

const EditCategory = () => {
  const { categoryId } = useParams();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategory(categoryId);
  }, [categoryId]);

  const fetchCategory = async () => {
    try {
      const response = await ApiService.getCategoryById(categoryId);
      setName(response.category.name);
      setImage(response.category.image || "");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to get category by ID"
      );
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imageUrl = await ApiService.uploadToCloudinary(file);
        setImage(imageUrl);
        setMessage("Image uploaded successfully");
        setTimeout(() => setMessage(""), 3000);
      } catch (error) {
        setMessage(error.message || "Failed to upload image");
        setTimeout(() => setMessage(""), 3000);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedCategory = { name, image };
      const response = await ApiService.updateCategory(categoryId, updatedCategory);
      if (response.status === 200) {
        setMessage(response.message || "Category updated successfully");
        setTimeout(() => {
          setMessage("");
          navigate("/admin/categories");
        }, 3000);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || error.message || "Failed to update category"
      );
    }
  };

  return (
    <div className="add-category-page">
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="category-form">
        <h2>Edit Category</h2>
        {image && (
          <div className="image-preview">
            <img src={image} alt="Category Preview" />
          </div>
        )}
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
        
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditCategory;
