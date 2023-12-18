import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    patients:[],
    status:"idle",
    error:null,
}


export const fetchPatients = createAsyncThunk("patients/fetchPatients",  async()=>{
    const response = await axios.get("https://patient-management-one.vercel.app/api/v1/patient");
    return response.data.patient
});

export const addPatientAsync = createAsyncThunk("patient/addPatientAsync", async(patient)=>{
    const response = await axios.post("https://patient-management-one.vercel.app/api/v1/patient/new", patient);
    return response.data.patient;
});

export const updatePatientAsync = createAsyncThunk("patient/updatePatientAsync", async( id,patient) => {
    const response = await axios.put(`https://patient-management-one.vercel.app/api/v1/patient/update/${id}`, patient);
    return response.data.patient;
});

export const deletePatientAsync = createAsyncThunk(
    "patients/deletePatientAsync",
    async (id) => {
      const response = await axios.delete(
        `https://patient-management-one.vercel.app/api/v1/patient/delete/${id}`
      );
      return response.data.patient;
    }
  );


  export const patientSlice = createSlice({
    name:"patients",
    initialState,
    reducers:{},
    extraReducers: {
        [fetchPatients.pending]: (state)=>{
            state.status = "loading";
        },
        [fetchPatients.fulfilled]:(state, action)=>{
            state.status = "success";
            state.patients = action.payload;
        },
        [fetchPatients.rejected]:(state, action)=>{
            state.status = "error";
            state.error = action.error.message;
        }
    }
  })