import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import { useNavigate } from 'react-router';
import Loader from '../../components/loader/Loader';
import { fetchPatients } from './patientSlice';
import Table from '../../components/table/Table';


const Patient = () => {

  const navigate = useNavigate();
  const {patients, status, error} = useSelector(({patients})=> patients);
  const dispatch = useDispatch();


  useEffect(()=>{
    if(status === "idle"){
      dispatch(fetchPatients());
    }
  },[ status, dispatch]);

  return (
    <div className='patients'>
      <h2>Patients</h2>
      <div className="modal-section">
      <button onClick={()=> navigate('/addPatient')}>Add Patient</button>
      </div>
      {
        status === "loading" ? (<Loader/>) : (
          <div className="">
            {
              status === "error" ? (error) : (
                patients.length === 0 ? "No Patient Found" : 
                (
                  <div className="">
                    {
                      <Table patients={patients}/>
                    }
                  </div>
                )
              )
            }
          </div>
        )
      }
      
    </div>
  )
}

export default Patient;
