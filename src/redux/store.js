import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './slices/dataSlice';
import cartReducer from './slices/cartSlice';

const store = configureStore({
    reducer: {
        data: dataReducer,
        cart: cartReducer
    }
});

export default store;
