import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import "../../style/adminCategory.css"; // Correct CSS file path for adminCategory

const AdminCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await ApiService.getAllCategory();
      setCategories(response.categoryList || []);
    } catch (error) {
      console.log("Error fetching category list", error);
    }
  };

  const handleEdit = async (id) => {
    navigate(`/admin/edit-category/${id}`);
    fetchCategories(); // Re-fetch categories after editing
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this category?");
    if (confirmed) {
      try {
        await ApiService.deleteCategory(id);
        fetchCategories(); // Re-fetch categories after deletion
      } catch (error) {
        console.log("Error deleting category by id");
      }
    }
  };

  return (
    <div className="admin-category-page">
      <div className="admin-category-list">
        <div className="parent-container">
          <h2>Categories</h2>
          <button onClick={() => navigate("/admin/add-category")} className="add-category-btn">Add Category</button>
        </div>
        <ul>
          {categories.map((category, index) => (
            <li key={category.id} className="category-item">
              <span className="category-number">{index + 1}.</span>
              <span>{category.name}</span>
              <div className="admin-bt">
                <button className="admin-btn-edit" onClick={() => handleEdit(category.id)}>Edit</button>
                {/* <button className="admin-btn-delete" onClick={() => handleDelete(category.id)}>Delete</button> */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminCategoryPage;   