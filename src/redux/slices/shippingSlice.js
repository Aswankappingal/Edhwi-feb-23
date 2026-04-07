import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import BaseUrl from '../../../BaseUrl';

// Async thunk to fetch shipping rates from the backend
export const fetchShippingRates = createAsyncThunk(
    'shipping/fetchShippingRates',
    async (_, { rejectWithValue }) => {
        try {
            // Trying endpoint patterns based on other slices
            const response = await axios.get(`${BaseUrl}/get-shipping-rates`);

            console.log("this response",response);
            
            
            if (response.data.success) {
                return response.data.shippingRates || response.data.data || response.data;
            } else {
                return response.data;
            }
        } catch (error) {
            // Fallback
            try {
                const retryResponse = await axios.get(`${BaseUrl}/shippingRates`);
                return retryResponse.data.shippingRates || retryResponse.data.data || retryResponse.data;
            } catch (retryError) {
                return rejectWithValue(retryError.response?.data?.message || retryError.message);
            }
        }
    }
);

// Async thunk to fetch payment settings
export const fetchPaymentSettings = createAsyncThunk(
    'shipping/fetchPaymentSettings',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BaseUrl}/get-payment-settings`);
            if (response.data.success) {
                return response.data.settings;
            } else {
                return rejectWithValue('Failed to fetch payment settings');
            }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const shippingSlice = createSlice({
    name: 'shipping',
    initialState: {
        rates: [],
        codCharge: 30, // Default fallback
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchShippingRates.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchShippingRates.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.rates = Array.isArray(action.payload) ? action.payload : Object.values(action.payload || {});
            })
            .addCase(fetchShippingRates.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Payment Settings
            .addCase(fetchPaymentSettings.fulfilled, (state, action) => {
                state.codCharge = action.payload.codCharge || 30;
            });
    }
});

export default shippingSlice.reducer;
