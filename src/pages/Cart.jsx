import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../store/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (cartId, quantity) => {
    const parsedQuantity =
      quantity === "" ? "" : Math.max(1, parseInt(quantity) || 1);
    dispatch(updateQuantity({ cartId, quantity: parsedQuantity }));
  };

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart-container">
        <div className="empty-cart-content">
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added anything to your cart yet!</p>
          <Link to="/" className="shop-now-btn">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.cartId} className="cart-item">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <h3>{item.title}</h3>
              <p className="item-price">${item.price}</p>
            </div>
            <div className="cart-item-actions">
              <input
                type="number"
                value={item.quantity === 0 ? "" : item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item.cartId, e.target.value)
                }
                className="quantity-input"
              />

              <p className="item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => dispatch(removeFromCart(item.cartId))}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className="total-section">
          <span>Total:</span>
          <span className="total-amount">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="cart-actions">
          <button
            onClick={() => dispatch(clearCart())}
            className="clear-cart-btn"
          >
            Clear Cart
          </button>
          <Link to="/checkout" className="checkout-btn">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
