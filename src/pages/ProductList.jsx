import React, { useState } from 'react';
import useProducts from '../hooks/useProducts';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';

const ProductList = () => {
  const { categories } = useSelector(state => state.products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const categoryList = ['all', ...Object.keys(categories || {})];

  const { data, loading, error } = useProducts();

  const filteredProducts = (data || []).filter(product => {
    const matchesSearch = 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) return <div className="loading-container">Loading products...</div>;
  if (error) return <p>Failed to load products.</p>;

  return (
    <div className="container">
      <div className="filters-container">
        <h1>Discover Amazing Products</h1>
        <div className="search-section">
          <input
            type="text"
            placeholder="Search products by name, brand or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="category-filters">
          {categoryList.map(category => (
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
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="no-products-found">
          <p>Product not found</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
