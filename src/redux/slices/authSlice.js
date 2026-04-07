import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import BaseUrl from '../../../BaseUrl';

export const sendMobileOtp = createAsyncThunk(
    'auth/sendMobileOtp',
    async (mobileNumber, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BaseUrl}/check-mobile-send-otp`, { mobileNumber });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to send OTP');
        }
    }
);

export const verifyMobileOtp = createAsyncThunk(
    'auth/verifyMobileOtp',
    async ({ mobileNumber, otp }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BaseUrl}/verify-otp`, { mobileNumber, otp });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Verification failed');
        }
    }
);

export const sendEmailOtp = createAsyncThunk(
    'auth/sendEmailOtp',
    async (email, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BaseUrl}/send-email-otp`, { email });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to send email OTP');
        }
    }
);

export const verifyEmailOtp = createAsyncThunk(
    'auth/verifyEmailOtp',
    async ({ email, otp }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BaseUrl}/verify-email-otp`, { email, otp });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Verification failed');
        }
    }
);

export const loginWithEmail = createAsyncThunk(
    'auth/loginWithEmail',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BaseUrl}/login-user`, { email, password });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

export const signupWithEmail = createAsyncThunk(
    'auth/signupWithEmail',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BaseUrl}/signup-with-email`, userData);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Signup failed');
        }
    }
);

export const loginWithGoogle = createAsyncThunk(
    'auth/loginWithGoogle',
    async (token, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BaseUrl}/sign-up-with-google`, { token });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Google login failed');
        }
    }
);

export const verifyPasswordChangeOtp = createAsyncThunk(
    'auth/verifyPasswordChangeOtp',
    async ({ type, value, otp, newPassword }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BaseUrl}/verify-password-change-otp`, { type, value, otp, newPassword });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Password update failed');
        }
    }
);

export const softDeleteAccount = createAsyncThunk(
    'auth/softDeleteAccount',
    async (_, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.post(`${BaseUrl}/soft-delete-account`, {}, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Account deletion failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: localStorage.getItem('token') || null,
        loginTimestamp: localStorage.getItem('loginTimestamp') || null,
        loading: false,
        error: null,
        otpSessionData: null, // Stores email/mobile when moving from Login to OTP Modal
        isNewUser: false,
        isLoginModalOpen: false
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.loginTimestamp = null;
            localStorage.removeItem('token');
            localStorage.removeItem('loginTimestamp');
        },
        clearError: (state) => {
            state.error = null;
        },
        setOtpSessionData: (state, action) => {
            state.otpSessionData = action.payload; // { type: 'email' | 'mobile', value: string }
        },
        clearOtpSessionData: (state) => {
            state.otpSessionData = null;
        },
        setLoginModalOpen: (state, action) => {
            state.isLoginModalOpen = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // sendMobileOtp
            .addCase(sendMobileOtp.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(sendMobileOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.isNewUser = action.payload.isNewUser;
            })
            .addCase(sendMobileOtp.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            // verifyMobileOtp
            .addCase(verifyMobileOtp.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(verifyMobileOtp.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.user) state.user = action.payload.user;
                if (action.payload.token) {
                    state.token = action.payload.token;
                    const now = Date.now().toString();
                    state.loginTimestamp = now;
                    localStorage.setItem('loginTimestamp', now);
                }
            })
            .addCase(verifyMobileOtp.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            // sendEmailOtp
            .addCase(sendEmailOtp.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(sendEmailOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.isNewUser = action.payload.isNewUser;
            })
            .addCase(sendEmailOtp.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            // verifyEmailOtp
            .addCase(verifyEmailOtp.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(verifyEmailOtp.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.user) state.user = action.payload.user;
                if (action.payload.token) {
                    state.token = action.payload.token;
                    const now = Date.now().toString();
                    state.loginTimestamp = now;
                    localStorage.setItem('loginTimestamp', now);
                }
            })
            .addCase(verifyEmailOtp.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            // loginWithEmail
            .addCase(loginWithEmail.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(loginWithEmail.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                const now = Date.now().toString();
                state.loginTimestamp = now;
                localStorage.setItem('loginTimestamp', now);
            })
            .addCase(loginWithEmail.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            // signupWithEmail
            .addCase(signupWithEmail.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(signupWithEmail.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                const now = Date.now().toString();
                state.loginTimestamp = now;
                localStorage.setItem('loginTimestamp', now);
            })
            .addCase(signupWithEmail.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            // loginWithGoogle
            .addCase(loginWithGoogle.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(loginWithGoogle.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                const now = Date.now().toString();
                state.loginTimestamp = now;
                localStorage.setItem('loginTimestamp', now);
            })
            .addCase(loginWithGoogle.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            
            // verifyPasswordChangeOtp
            .addCase(verifyPasswordChangeOtp.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(verifyPasswordChangeOtp.fulfilled, (state) => { state.loading = false; })
            .addCase(verifyPasswordChangeOtp.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            // softDeleteAccount
            .addCase(softDeleteAccount.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(softDeleteAccount.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.token = null;
                localStorage.removeItem('token');
            })
            .addCase(softDeleteAccount.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
    }
});

export const { logout, clearError, setOtpSessionData, clearOtpSessionData, setLoginModalOpen } = authSlice.actions;
export default authSlice.reducer;
