import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; // Ensure Link is imported
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  if (loading) return <div className="loading-container">Loading...</div>;
  if (error || !product) {
    return (
      <div className="not-found-wrapper">
        <div className="not-found-container">
          <h1>404</h1>
          <h2>Product Not Found!</h2>
          <p>The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="back-home-btn">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back
      </button>
      <div className="product-detail-card">
        <div className="product-detail-grid">
          <div className="product-image-section">
            <img src={product.thumbnail} alt={product.title} className="product-main-image" />
          </div>
          <div className="product-info-section">
            <h1 className="product-title">{product.title}</h1>
            <p className="product-brand">{product.brand}</p>
            <p className="product-description">{product.description}</p>
            <div className="price-section">
              <span className="current-price">${product.price}</span>
              {product.discountPercentage && (
                <span className="discount-tag">-{Math.round(product.discountPercentage)}% OFF</span>
              )}
            </div>
            <div className="stock-info">
              <span className={`stock-badge ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                {product.stock > 0 ? '✓ In Stock' : '× Out of Stock'}
              </span>
            </div>
            <button
              onClick={() => {
                dispatch(addToCart(product));
                const btn = document.activeElement;
                btn.innerHTML = 'Added ✓';
                setTimeout(() => {
                  btn.innerHTML = 'Add to Cart';
                }, 2000);
              }}
              className="add-to-cart-button"
              disabled={product.stock <= 0}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;