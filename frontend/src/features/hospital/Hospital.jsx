import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPatients } from '../patient/patientSlice';
import { fetchWards } from '../ward/wardSlice';


const Hospital = () => {
    const dispatch = useDispatch();
    const patients = useSelector(({patients})=>patients);
    const wards = useSelector(({wards})=>  wards);
    
    const totalPatients = patients.reduce((acc, curr)=> acc + curr.capacity, 0);
    console.log(totalPatients);


    useEffect(()=>{
        dispatch(fetchPatients());
        dispatch(fetchWards());
    },[]);

  return (
    <div>
        <h2>Hospital</h2>
        <div className="hospital-container">
            <p><strong>Total Patients:{" "}</strong></p>
            <p><strong>Current Occupancy Rate: {" "}</strong></p>
            <p><strong>Top Ward</strong></p>
        </div>
    </div>
  )
}

export default Hospital
