import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ApiService from '../service/ApiService'
import '../style/categoryListPage.css'

const CategoryListPage = () => {
  const [categories, setCategories] = useState([])
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await ApiService.getAllCategory()
      setCategories(response.categoryList || [])
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Unable to fetch categories'
      )
    }
  }

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`)
  }

  return (
    <div className="category-list">
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div>
          <h2>Browse By Categories</h2>
          <ul className="category-cards">
            {categories.map((category) => (
              <li
                key={category.id}
                className="category-card"
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="category-image">
                  <img src={category.image} alt={category.name} />
                </div>
                <div className="category-details">
                  <h3>{category.name}</h3>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default CategoryListPage
