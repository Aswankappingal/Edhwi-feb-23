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
            let initialTotalInclusive = 0;
            let couponSavings = 0;
            let delivery = 0;

            const shippingRates = action.payload || [];

            state.items.forEach(item => {
                const price = item.productDetails?.price || item.price || 0;
                const quantity = item.quantity || 1;
                initialTotalInclusive += price * quantity;
            });

            if (state.appliedCoupon) {
                const coupon = state.appliedCoupon;
                const discountValue = coupon.discountValue || 0;
                const discountType = coupon.discountType || 'PERCENTAGE';
                
                if (discountType === 'PERCENTAGE' || discountType === 'percentage' || String(coupon.discount).includes('%')) {
                    couponSavings = (initialTotalInclusive * discountValue) / 100;
                } else {
                    couponSavings = discountValue;
                }

                if (couponSavings > initialTotalInclusive) {
                    couponSavings = initialTotalInclusive;
                }
            }
            
            let totalAfterCoupon = initialTotalInclusive - couponSavings;

            if (shippingRates && shippingRates.length > 0) {
                let applicableRate = null;
                for (const rate of shippingRates) {
                    if (rate.isActive) {
                        const min = rate.minPrice || 0;
                        const max = rate.maxPrice || Infinity;
                        if (initialTotalInclusive >= min && initialTotalInclusive <= max) {
                            applicableRate = rate;
                            break; 
                        }
                    }
                }
                
                if (applicableRate) {
                   delivery = applicableRate.isFree ? 0 : applicableRate.price;
                }
            }

            const gstRate = 0.05; // 5% GST calculated on the Inclusive Prices
            
            // The applied coupon value shouldn't visually lose its value to tax math. 
            // Flat -30 stays exactly -30 on the subtotal.
            const visualCouponSavings = couponSavings;
            
            // Applicable GST is tax mathematically apportioned on the final post-discount value:
            const finalSubtotalExcludingTax = totalAfterCoupon / (1 + gstRate);
            const applicableGst = totalAfterCoupon - finalSubtotalExcludingTax;

            // To ensure the visual addition: Total = Total MRP - visualCouponSavings + applicableGst + delivery
            // We reverse-derive the visual 'Total MRP':
            const totalMrp = totalAfterCoupon - delivery + visualCouponSavings - applicableGst;

            state.summary.totalMrp = totalMrp;
            state.summary.discount = 0;
            state.summary.couponSavings = visualCouponSavings;
            state.summary.delivery = delivery;
            state.summary.gst = applicableGst;
            state.summary.total = totalAfterCoupon + delivery;
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
