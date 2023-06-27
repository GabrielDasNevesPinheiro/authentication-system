'use client';

import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/authSlice';
import { loadState, saveState } from "./storage";

export const store = configureStore({
    reducer: {
        auth: authReducer,
    }, preloadedState: {
        auth: { value: loadState() }
    }
});

store.subscribe(() => {
    saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;