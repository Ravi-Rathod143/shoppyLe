
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);
  const isInCart = cartItems.some(item => item.id === product.id);

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-container">
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          className="product-image"
        />
        {product.discountPercentage && (
          <span className="discount-badge">-{Math.round(product.discountPercentage)}%</span>
        )}
      </Link>
      <div className="product-details">
        <Link to={`/product/${product.id}`} className="product-title">
          <h2>{product.title}</h2>
        </Link>
        <div className="product-rating">
          <span>★ {product.rating}</span>
          <span className="product-brand">{product.brand}</span>
        </div>
        <p className="product-description">{product.description}</p>
        <div className="product-actions">
          <div className="price-container">
            <span className="current-price">${product.price}</span>
            {product.discountPercentage && (
              <span className="original-price">
                ${Math.round(product.price / (1 - product.discountPercentage / 100))}
              </span>
            )}
          </div>
          <div className="button-group">
            <Link to={`/products/${product.id}`} className="view-details-btn">
              View Details
            </Link>
            <button 
              onClick={() => dispatch(addToCart(product))}
              className={`cart-button ${isInCart ? 'added' : ''}`}
            >
              {isInCart ? 'Added ✓' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    brand: PropTypes.string,
    discountPercentage: PropTypes.number
  }).isRequired
};
