import {createSlice} from '@reduxjs/toolkit';


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
            state.loading = false;
            state.currentUser = action.payload;
            state.error = false;
        },
        signINFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {signINStart, signINSuccess, signINFailure} = userSlice.actions;

export default userSlice.reducer;