
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found-wrapper">
      <div className="not-found-container">
        <h1>404</h1>
        <h2>Product Not Found!</h2>
        <p>Sorry, the product you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="back-home-btn">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
