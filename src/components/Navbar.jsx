
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm } from '../store/productSlice';

const Navbar = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const dispatch = useDispatch();
  const cartCount = useSelector(state => {
    const cartItems = state.cart?.cartItems || []; // Prevent undefined errors
    return cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
  });
  

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          ShoppyGlobe
        </Link>
        <div className="nav-right">
          <div className={`search-container ${isSearchVisible ? 'active' : ''}`}>
            <button 
              className="search-icon-btn" 
              onClick={() => setIsSearchVisible(!isSearchVisible)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            {isSearchVisible && (
              <input
                type="text"
                placeholder="Search products..."
                className="search-input"
                onChange={handleSearchChange}
                autoFocus
              />
            )}
          </div>
          <Link to="/cart" className="cart-wrapper">
            <div className="cart-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="cart-count">{isNaN(cartCount) ? "0" : cartCount}</span>

            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
