import React, { useState, useEffect } from 'react';
import '../../style/navbar.css';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import Logo from '../../assets/Store.svg';

const Navbar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // State for isAdmin
  const navigate = useNavigate();
  const location = useLocation(); // To track the current URL

  const isAuthenticated = ApiService.isAuthenticated();

  useEffect(() => {
    // Async call to get isAdmin
    const checkAdminStatus = async () => {
      const adminStatus = await ApiService.isAdmin();
      setIsAdmin(adminStatus);
    };

    checkAdminStatus();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value.trim()) {
      navigate(`/?search=${encodeURIComponent(value.trim())}`);
    } else {
      navigate('/');
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/?search=${encodeURIComponent(searchValue.trim())}`);
    } else {
      navigate('/');
    }
  };

  const handleLogout = () => {
    const confirm = window.confirm('Are you sure you want to logout?');
    if (confirm) {
      ApiService.logout();
      setTimeout(() => {
        navigate('/login');
      }, 500);
    }
  };

  // Reset the search value when navigating to another page
  useEffect(() => {
    setSearchValue('');
  }, [location.pathname]);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/" className="flex items-center gap-2">
          <img src={Logo} alt="Swiftmart" className="navbar-logo" />
          <h1 className="navbar-title text-black">Swiftmart</h1>
        </NavLink>
      </div>

      {/* SEARCH FORM */}
      <form className="navbar-search" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search products by Name or Placeholder"
          value={searchValue}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>

      <div className="navbar-link">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/cart">Cart</NavLink>
        <NavLink to="/categories">Categories</NavLink>
        {isAuthenticated && <NavLink to="/profile">My Account</NavLink>}
        {isAdmin && <NavLink to="/admin">Admin</NavLink>}
        {!isAuthenticated && <NavLink to="/login">Login</NavLink>}
        {isAuthenticated && <NavLink onClick={handleLogout}>Logout</NavLink>}
      </div>
    </nav>
  );
};

export default Navbar;