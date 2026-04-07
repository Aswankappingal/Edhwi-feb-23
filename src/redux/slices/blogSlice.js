import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import BaseUrl from '../../../BaseUrl';

export const fetchBlogPosts = createAsyncThunk(
    'blog/fetchBlogPosts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BaseUrl}/get-blog-posts`);
            if (response.data.success) {
                return response.data.blogPosts;
            } else {
                return rejectWithValue(response.data.message);
            }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch blog posts');
        }
    }
);

export const fetchBlogPostById = createAsyncThunk(
    'blog/fetchBlogPostById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BaseUrl}/get-blog-post/${id}`);
            if (response.data.success) {
                return response.data.blog;
            } else {
                return rejectWithValue(response.data.message);
            }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch blog post');
        }
    }
);

const blogSlice = createSlice({
    name: 'blog',
    initialState: {
        blogs: [],
        currentBlog: null,
        loading: false,
        error: null
    },
    reducers: {
        clearCurrentBlog: (state) => {
            state.currentBlog = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // fetchBlogPosts
            .addCase(fetchBlogPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBlogPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = action.payload;
            })
            .addCase(fetchBlogPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // fetchBlogPostById
            .addCase(fetchBlogPostById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBlogPostById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentBlog = action.payload;
            })
            .addCase(fetchBlogPostById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearCurrentBlog } = blogSlice.actions;
export default blogSlice.reducer;
