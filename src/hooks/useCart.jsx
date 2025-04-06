
import { useSelector } from 'react-redux';

const useCart = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  return { cartItems, total };
};

export default useCart;
