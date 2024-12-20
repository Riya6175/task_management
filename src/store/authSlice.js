import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: JSON.parse(localStorage.getItem('currentUser')) || null,
        error: null
    },
    reducers: {
        loginUser: (state, action) => {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(
                u => u.username === action.payload.username &&
                    u.password === action.payload.password
            );

            if (user) {
                state.user = user;
                state.error = null;
                localStorage.setItem('currentUser', JSON.stringify(user));
            } else {
                state.error = 'Invalid credentials';
            }
        },
        registerUser: (state, action) => {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const exists = users.some(u => u.username === action.payload.username);

            if (exists) {
                state.error = 'Username already exists';
                return;
            }

            const newUser = {
                username: action.payload.username,
                password: action.payload.password,
            };

            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            state.error = null;
        },
        logout: (state) => {
            state.user = null;
            state.error = null;
            localStorage.removeItem('currentUser');
        },
        clearError: (state) => {
            state.error = null;
        }
    }
});

export const { loginUser, registerUser, logout, clearError } = authSlice.actions;
export default authSlice.reducer;