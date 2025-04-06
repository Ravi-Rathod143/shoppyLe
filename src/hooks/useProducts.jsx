
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProducts, setError, setLoading } from '../store/productSlice';

const useProducts = () => {
  const dispatch = useDispatch();
  const [error, setErrorState] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading(true));
      try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        dispatch(setProducts(data.products));
      } catch (err) {
        setErrorState(err.message);
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchProducts();
  }, [dispatch]);

  return { error };
};

export default useProducts;
