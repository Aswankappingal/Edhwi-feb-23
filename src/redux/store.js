import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './slices/dataSlice';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import addressReducer from './slices/addressSlice';

const store = configureStore({
    reducer: {
        data: dataReducer,
        auth: authReducer,
        cart: cartReducer,
        address: addressReducer
    }
});

export default store;
