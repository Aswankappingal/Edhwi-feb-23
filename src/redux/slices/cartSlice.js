import { createSlice } from '@reduxjs/toolkit';

// Helper to load initial state from local storage
const loadCartFromStorage = () => {
    try {
        const serializedData = localStorage.getItem('cartItems');
        if (serializedData === null) {
            return [];
        }
        return JSON.parse(serializedData);
    } catch (e) {
        console.warn("Error reading cart from local storage", e);
        return [];
    }
};

const saveCartToStorage = (cartItems) => {
    try {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (e) {
        console.warn("Error saving cart to local storage", e);
    }
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: loadCartFromStorage(),
    },
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingItem = state.cartItems.find(item => item.id === product.id);

            if (existingItem) {
                // If it exists, just update quantity
                existingItem.quantity += 1;
            } else {
                // If it doesn't exist, push to array with quantity 1
                state.cartItems.push({ ...product, quantity: 1 });
            }
            saveCartToStorage(state.cartItems);
        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            state.cartItems = state.cartItems.filter(item => item.id !== id);
            saveCartToStorage(state.cartItems);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const existingItem = state.cartItems.find(item => item.id === id);
            if (existingItem) {
                if (quantity > 0) {
                    existingItem.quantity = quantity;
                }
            }
            saveCartToStorage(state.cartItems);
        },
        clearCart: (state) => {
            state.cartItems = [];
            saveCartToStorage(state.cartItems);
        }
    }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
