import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './slices/dataSlice';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import addressReducer from './slices/addressSlice';
import orderReducer from './slices/orderSlice';
import wishlistReducer from './slices/wishlistSlice';
import couponReducer from './slices/couponSlice';

const store = configureStore({
    reducer: {
        data: dataReducer,
        auth: authReducer,
        cart: cartReducer,
        address: addressReducer,
        order: orderReducer,
        wishlist: wishlistReducer,
        coupons: couponReducer
    }
});

export default store;
