
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart';
import { useDispatch } from 'react-redux';
import { clearCart } from '../store/cartSlice';

const CheckoutForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const { cartItems, total } = useCart();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(clearCart());
  //   alert("Order placed successfully!");
  //   //  navigate("/");
  //    navigate("/order-success"); 
  // };


  const handleSubmit = (e) => {
    e.preventDefault();
  
    // new order create krna he and use local storage me add krna he
    const orderData = {
      customerDetails: formData,
      orderItems: cartItems,
      totalAmount: total.toFixed(2),
      orderDate: new Date().toISOString(),
    };
  
    // old orders check krne
    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
  
    // new order list me add krne
    existingOrders.push(orderData);
  
    //  localStorage me update krne
    localStorage.setItem('orders', JSON.stringify(existingOrders));
  
    // Redux cart reset krne
    dispatch(clearCart()); 
  
    alert("Order placed successfully!");
    navigate("/order-success");
  };
  

  return (
    <div className="checkout-container">
      <div className="order-summary">
        <h2>Your Order Summary</h2>
        <div className="summary-details">
          <p>Total Items: {cartItems.reduce((acc, item) => acc + item.quantity, 0)}</p>
          <p className="total-price">Total: ${total.toFixed(2)}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-section">
          <h3>Personal Information</h3>
          <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
        </div>

        <div className="form-section">
          <h3>Shipping Address</h3>
          <input type="text" name="address" placeholder="Street Address" required onChange={handleChange} />
          <div className="address-group">
            <input type="text" name="city" placeholder="City" required onChange={handleChange} />
            <input type="number" name="zipCode" placeholder="ZIP Code" required onChange={handleChange} />
          </div>
        </div>

        <div className="form-section">
          <h3>Payment Details</h3>
          <input type="number" name="cardNumber" placeholder="Card Number" required onChange={handleChange} />
          <div className="card-group">
            <input type="text" name="expiryDate" placeholder="MM/YY" required onChange={handleChange} />
            <input type="number" name="cvv" placeholder="CVV" required onChange={handleChange} />
          </div>
        </div>

        <button type="submit" className="place-order-btn">
          Place Order (${total.toFixed(2)})
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
