import React from "react";
import { Link } from "react-router-dom";
import '../App.css'

const OrderSuccess = () => {
  return (
    <div className="order-success-container">
      <h2 className="success-message">🎉 Your Order is Successfully Placed! 🎉</h2>
      <p className="success-details">
        Thank you for shopping with us. Your order is being processed.
      </p>
      <Link to="/" className="continue-shopping-btn">
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccess;
