import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productSlice';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const dispatch = useDispatch();
  const { products, status } = useSelector(state => state.products);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      const uniqueCategories = [...new Set(products.map(p => p.category))];
      setCategories(uniqueCategories);
    }
  }, [products]);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  if (status === 'loading') return <div className="loading-container">Loading products...</div>;
  if (status === 'failed') return <div className="error-container">Failed to load products.</div>;

  return (
    <div className="home-container">
      {/* <div className="hero-section">
        <h1>Welcome to ShoppyGlobe</h1>
        <p>Discover Amazing Products at Great Prices</p>
      </div> */}
      <div className="filters-container">
        <h2>Select Category</h2>
        <div className="category-filters">
          <button onClick={() => setSelectedCategory('all')} className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}>All</button>
          {categories.map(category => (
            <button 
              key={category} 
              onClick={() => setSelectedCategory(category)} 
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="container">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-products-found">
            <h2>No products found</h2>
            <p>Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
