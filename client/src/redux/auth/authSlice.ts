'use client';

import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
    value: string,
}

const initialState: AuthState = {
    value: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login:  (state, action) => { state.value = action.payload },
        logout: (state) => { state.value = '' }
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;