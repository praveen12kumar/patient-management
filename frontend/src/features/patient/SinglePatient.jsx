import React from 'react';
import {  deletePatientAsync } from './patientSlice';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';


const SinglePatient = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id} = useParams();
    const {patients} = useSelector(({patients})=> patients);
    const patient = patients.find((pat)=> pat._id === id);
   
    const handleDelete = ()=>{
        dispatch(deletePatientAsync(id));
        console.log("deletePatientAsync");
        navigate('/');
    }


  return (
    <div className='singlePatient'>
      <p><strong>Name</strong>{patient?.name}</p>
      <p><strong>Age</strong>{patient.age}</p>
      <p><strong>Gender</strong>{patient.gender}</p>
      <p><strong>Medical History</strong>{
        patient.medicalHistory.map((med, index)=> (<span key={index}>{med}{", "}</span>))
      }</p>
      <p><strong>Contact</strong>{patient.contactInfo}</p>
      <p><strong>Ward </strong>{patient.assignedWard}</p>
      <div className="">
        <NavLink to={`/patient/edit/${id}`} state={patient}>
          <button className='edit-btn'>Edit Details</button>
        </NavLink>
        <button onClick={handleDelete} >Delete</button>
      </div>
    </div>
  )
}

export default SinglePatient
