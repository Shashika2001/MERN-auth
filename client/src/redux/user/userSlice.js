import {createSlice} from '@reduxjs/toolkit';
import { sign } from 'jsonwebtoken';


const initialState = {
    currentUser: null,
    loading: false,
    error : false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        signINStart: (state) => {
            state.loading = true;
          
        },
        signINSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        signINFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        updateUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserStart: (state) => {
            state.loading = true;
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
        deleteUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signOUT: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        
    },
}
});

export const {signINStart,
     signINSuccess,
      signINFailure,
      updateUserStart,
      updateUserSuccess,
      updateUserFailure,
        deleteUserStart,
        deleteUserSuccess,
        deleteUserFailure,
        signOUT,
    } = userSlice.actions;

export default userSlice.reducer;