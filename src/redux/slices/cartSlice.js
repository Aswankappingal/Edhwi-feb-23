import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import BaseUrl from '../../../BaseUrl';

// Get token helper
const getToken = () => localStorage.getItem('token');

export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (_, { rejectWithValue }) => {
        try {
            const token = getToken();
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`${BaseUrl}/get-cart`, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to fetch cart');
        }
    }
);

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ productId, quantity, variantCombination }, { dispatch, rejectWithValue }) => {
        try {
            const token = getToken();
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const payload = { productId, quantity };
            if (variantCombination) payload.variantCombination = variantCombination;

            const response = await axios.post(`${BaseUrl}/add-to-cart`, payload, config);
            dispatch(fetchCart()); // Refresh cart after adding
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to add to cart');
        }
    }
);

export const updateCartQuantity = createAsyncThunk(
    'cart/updateCartQuantity',
    async ({ productId, newQuantity }, { dispatch, rejectWithValue }) => {
        try {
            const token = getToken();
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.put(`${BaseUrl}/update-cart-quantity`, { productId, newQuantity }, config);
            dispatch(fetchCart()); // Refresh cart
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to update quantity');
        }
    }
);

export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async ({ productId }, { dispatch, rejectWithValue }) => {
        try {
            const token = getToken();
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.post(`${BaseUrl}/remove-from-cart`, { productId }, config);
            dispatch(fetchCart()); // Refresh cart
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to remove from cart');
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        appliedCoupon: null,
        summary: {
            totalMrp: 0,
            discount: 0,
            couponSavings: 0,
            gst: 0,
            delivery: 0,
            total: 0
        },
        loading: false,
        error: null
    },
    reducers: {
        applyCoupon: (state, action) => {
            state.appliedCoupon = action.payload;
        },
        removeCoupon: (state) => {
            state.appliedCoupon = null;
        },
        calculateTotals: (state, action) => {
            let totalMrp = 0;
            let total = 0;
            let couponSavings = 0;
            let delivery = 0;

            // Optional: retrieve shippingRates from action payload if passed explicitly from the component
            const shippingRates = action.payload || [];

            // 1. Calculate Initial Items Total
            state.items.forEach(item => {
                const price = item.productDetails?.price || 0;
                const quantity = item.quantity || 1;
                totalMrp += price * quantity;
                total += price * quantity;
            });

            const totalBeforeCoupon = total;

            // 2. Apply Coupon if exists
            if (state.appliedCoupon) {
                const coupon = state.appliedCoupon;
                const discountValue = coupon.discountValue || 0;
                
                // Assuming "PERCENTAGE" vs "FLAT" based on the schema
                const discountType = coupon.discountType || 'PERCENTAGE';
                
                if (discountType === 'PERCENTAGE' || discountType === 'percentage' || String(coupon.discount).includes('%')) {
                    couponSavings = (total * discountValue) / 100;
                } else {
                    couponSavings = discountValue;
                }

                // Make sure we don't discount more than the total order amount
                if (couponSavings > total) {
                    couponSavings = total;
                }
                
                total -= couponSavings;
            }

            // 3. Dynamic Delivery based on total order price
            if (shippingRates && shippingRates.length > 0) {
                 // Sort rates by minPrice ascending to logic check properly or simply find matching tier
                let applicableRate = null;
                
                for (const rate of shippingRates) {
                    if (rate.isActive) {
                        const min = rate.minPrice || 0;
                        const max = rate.maxPrice || Infinity;
                        
                        // Check if total falls within [min, max]
                        if (totalBeforeCoupon >= min && totalBeforeCoupon <= max) {
                            applicableRate = rate;
                            break; 
                        }
                    }
                }
                
                if (applicableRate) {
                   delivery = applicableRate.isFree ? 0 : applicableRate.price;
                }
            }

            state.summary.totalMrp = totalMrp;
            state.summary.couponSavings = couponSavings;
            state.summary.delivery = delivery;
            state.summary.total = total + delivery;
        },
        clearCart: (state) => {
            state.items = [];
            state.appliedCoupon = null;
            state.summary = {
                totalMrp: 0,
                discount: 0,
                couponSavings: 0,
                gst: 0,
                delivery: 0,
                total: 0
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.cart || [];
            })
            .addCase(fetchCart.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            .addCase(addToCart.pending, (state) => { state.loading = true; })
            .addCase(addToCart.fulfilled, (state) => { state.loading = false; })
            .addCase(addToCart.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            .addCase(updateCartQuantity.pending, (state) => { state.loading = true; })
            .addCase(updateCartQuantity.fulfilled, (state) => { state.loading = false; })
            .addCase(updateCartQuantity.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            .addCase(removeFromCart.pending, (state) => { state.loading = true; })
            .addCase(removeFromCart.fulfilled, (state) => { state.loading = false; })
            .addCase(removeFromCart.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
    }
});

export const { calculateTotals, clearCart, applyCoupon, removeCoupon } = cartSlice.actions;
export default cartSlice.reducer;
