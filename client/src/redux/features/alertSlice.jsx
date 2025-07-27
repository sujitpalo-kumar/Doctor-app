import {createSlice}from '@reduxjs/toolkit'

export const alertSlice=createSlice({
    name:'alerts',
    initialState:{
        loading:false
    },
    reducers:{
        showLoading:(state)=>{
            state.loading=true;
        },
        HideLoading:(state)=>{
            state.loading=false;
        }

    }
})
export const {showLoading,HideLoading}= alertSlice.actions;