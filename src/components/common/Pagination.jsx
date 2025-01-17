import React, { useState } from 'react'
import '../../style/pagination.css'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [searchPage, setSearchPage] = useState(currentPage)

  // Handle input change for the page search
  const handlePageSearch = (e) => {
    const pageNumber = Number(e.target.value)
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setSearchPage(pageNumber)
    } else {
      setSearchPage('')
    }
  }

  // Go to the page directly based on search value
  const goToPage = () => {
    if (searchPage >= 1 && searchPage <= totalPages) {
      onPageChange(searchPage)
    }
  }

  // Handle keypress for "Enter" key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      goToPage()
    }
  }

  // Get the pages to be displayed in the pagination
  const getVisiblePages = () => {
    const visiblePages = []
    let startPage = currentPage - 2
    let endPage = currentPage + 2

    if (startPage < 1) {
      startPage = 1
      endPage = Math.min(totalPages, 5)
    }

    if (endPage > totalPages) {
      endPage = totalPages
      startPage = Math.max(1, totalPages - 4)
    }

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i)
    }

    return visiblePages
  }

  const visiblePages = getVisiblePages()

  return (
    <div className="pagination-container">
      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={() => onPageChange(currentPage - 1)}>-</button>
        )}
        {visiblePages.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={number === currentPage ? 'active' : ''}
          >
            {number}
          </button>
        ))}
        {currentPage < totalPages && (
          <button onClick={() => onPageChange(currentPage + 1)}>+</button>
        )}
      </div>
      <div className="pagination-info-search">
        <div className="pagination-info">
          Page {currentPage} of {totalPages}
        </div>
        <div className="page-search">
          <input
            type="number"
            value={searchPage}
            onChange={handlePageSearch}
            onKeyPress={handleKeyPress}
          />
          <button onClick={goToPage}>Go</button>
        </div>
      </div>
    </div>
  )
}

export default Pagination
