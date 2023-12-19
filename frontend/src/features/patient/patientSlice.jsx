import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    patients:[],
    status:"idle",
    error:null,
}

export const fetchPatients = createAsyncThunk("patients/fetchPatients",  async()=>{
    const response = await axios.get("https://patient-management-one.vercel.app/api/v1/patient");
    return response.data.patients
});

export const addPatientAsync = createAsyncThunk("patient/addPatientAsync", async(patient)=>{
    const response = await axios.post("https://patient-management-one.vercel.app/api/v1/patient/new", patient);
    return response.data.patient;
});

export const updatePatientAsync = createAsyncThunk("patient/updatePatientAsync", async({id,patient}) => {
    
    const response = await axios.put(`https://patient-management-one.vercel.app/api/v1/patient/update/${id}`, patient);
    return {id,patient};
});

export const deletePatientAsync = createAsyncThunk(
    "patients/deletePatientAsync",
    async (id) => {
      const response = await axios.delete(
        `https://patient-management-one.vercel.app/api/v1/patient/delete/${id}`
      );
      return id;
    }
  );


  export const patientSlice = createSlice({
    name:"patients",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchPatients.pending, (state)=>{
            state.status = "loading";
        })
        .addCase(fetchPatients.fulfilled,(state, action)=>{
            state.status = "success";
            state.patients = action.payload;
        })
        .addCase(fetchPatients.rejected, (state, action)=>{
            state.status = "error";
            state.error = action.error.message;
        })
        .addCase(addPatientAsync.pending, (state)=>{
            state.status = "loading";
        })

        .addCase(addPatientAsync.fulfilled, (state, action)=>{
            state.status = "success";
            state.patients.push(action.payload);
        })
        .addCase(addPatientAsync.rejected,(state, action)=>{
            state.status = "error";
            state.error = action.error.message;
        })
        .addCase(updatePatientAsync.pending, (state)=>{
            state.status = "pending";
        })
        .addCase(updatePatientAsync.fulfilled, (state, action)=>{
            state.status = "success";
            // console.log(action.payload.id);
            // console.log(action.payload.patient);
            const updatePatient = action.payload.patient;
            const index = state.patients.findIndex((patient)=>(
                patient._id === action.payload.id
            ));
            console.log("index", index);
            if(index !== -1){
                state.patients[index] = updatePatient;
                
            }
        })
        .addCase(updatePatientAsync.rejected, (state, action)=>{
            state.status = "error";
            state.error = action.error.message;
        })
        .addCase(deletePatientAsync.pending, (state)=>{
            state.status = "pending";
        })
        .addCase(deletePatientAsync.fulfilled, (state, action)=>{
            state.patients = state.patients.filter((patient)=>(
                patient._id !== action.payload
            ))
        })
        .addCase(deletePatientAsync.rejected,(state, action)=>{
            state.status = "error";
            state.error = action.error.message;
        });
    }
  });


  export default patientSlice.reducer