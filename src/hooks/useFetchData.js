import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/dataSlice';

const useFetchData = () => {
    const dispatch = useDispatch();
    const { status, products } = useSelector((state) => state.data);

    useEffect(() => {
        // Fetch data if idle or if local storage was empty
        if (status === 'idle' || products.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, status, products.length]);
};

export default useFetchData;
