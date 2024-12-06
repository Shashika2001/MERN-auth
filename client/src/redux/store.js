import {combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';


const rootReducer = combineReducers({
    user: userReducer,
});

const persisted = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: {user: userReducer},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false}),
    });