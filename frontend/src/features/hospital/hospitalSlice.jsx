import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    totalPatients :0,
    occupancyRate:0,
    topWard:null,
};

export const hospitalSlice = createSlice({
    name: 'hospital',
    initialState,
    reducers:{
        updateHospitalStates: (state, action)=>{
            const {totalPatients, occupancyRate, topWard} = action.payload;
            state.totalPatients = totalPatients;
            state.occupancyRate = occupancyRate;
            state.topWard = topWard;
        },
        setTopWard: (state, action)=>{
            state.topWard = action.payload;
        }
    }
});

export const {updateHospitalStates, setTopWard} = hospitalSlice.actions;
export default hospitalSlice.reducer;