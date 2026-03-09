import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './slices/dataSlice';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import addressReducer from './slices/addressSlice';
import orderReducer from './slices/orderSlice';
import wishlistReducer from './slices/wishlistSlice';

const store = configureStore({
    reducer: {
        data: dataReducer,
        auth: authReducer,
        cart: cartReducer,
        address: addressReducer,
        order: orderReducer,
        wishlist: wishlistReducer
    }
});

export default store;
