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
        calculateTotals: (state) => {
            let totalMrp = 0;
            let total = 0;

            state.items.forEach(item => {
                const price = item.productDetails?.price || 0;
                const quantity = item.quantity || 1;
                // Assuming no discount fields strictly from typical cart payload unless structured so,
                // Calculate just total price for now. 
                // If the backend has originalPrice vs price, we can refine this.
                totalMrp += price * quantity;
                total += price * quantity;
            });

            // Simple GST calculation (e.g., 5% inclusive or exclusive based on requirement).
            // Assuming total is incl. GST here for simplicity or $0 GST explicit.
            state.summary.totalMrp = totalMrp;
            state.summary.total = total;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                // If API returns cart with productDetails array via Promise.all
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

export const { calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;
