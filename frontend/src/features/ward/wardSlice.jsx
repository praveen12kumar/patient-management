import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    wards:[],
    status: "idle",
    error:null,
};

export const fetchWards = createAsyncThunk("wards/fetchWards", async()=>{
    
    const response = await axios.get("https://patient-management-one.vercel.app/api/v1/ward");
    return response.data.wards;
} );

export const addWardAsync = createAsyncThunk("wards/addWardAsync", async(ward)=>{
    const response = await axios.post("https://patient-management-one.vercel.app/api/v1/ward/new", ward);
    return response.data.wards;
});

export const updateWardAsync = createAsyncThunk("ward/updateWardAsync", async(id, ward)=>{
    const response = await axios.put(`https://patient-management-one.vercel.app/api/v1/ward/update/${id}`, ward);
    return response.data.wards;
});

export const deleteWardAsync = createAsyncThunk("ward/deleteWardAsync", async(id)=>{
    const respone = await axios.delete(`https://patient-management-one.vercel.app/api/v1/ward/delete/${id}`);
    return id;
});


export const wardSlice = createSlice({
    name:"wards",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchWards.pending, (state)=>{
            state.status = "pending";
        })
        .addCase(fetchWards.fulfilled, (state, action)=>{
            state.status = "success";
            state.wards = action.payload;
        })
        .addCase(fetchWards.rejected, (state, action)=>{
            state.status = "error";
            state.error = action.error.message;
        })
        .addCase(addWardAsync.pending, (state)=>{
            state.status = "pending";
        })
        .addCase(addWardAsync.fulfilled, (state, action)=>{
            state.status = "success";
            state.wards.push(action.payload);
        })
        .addCase(addWardAsync.rejected,(state, action)=>{
            state.status = "error";
            state.error = action.error.message;
        })
        .addCase(updateWardAsync.pending,(state)=>{
            state.status = "pending";
        })
        .addCase(updateWardAsync.fulfilled,(state,action)=>{
            state.status = "success";
            const updateWard = action.payload;
            const index = state.wards.findIndex((ward)=> ward._id === updateWard._id);
            if(index !== -1){
                state.wards[index] = updateWard;
            }
        })
        .addCase(updateWardAsync.rejected,(state,action)=>{
            state.status = "error";
            state.error = action.error.message;
        })
        .addCase(deleteWardAsync.pending, (state) => {
            state.status = "loading";
          })
        .addCase(deleteWardAsync.fulfilled,(state, action) => {
            state.status = "success";
            state.wards = state.wards.filter(
              (ward) => ward._id !== action.payload
            );
          })
        .addCase(deleteWardAsync.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message;
        })
    }
});

export default wardSlice.reducer;