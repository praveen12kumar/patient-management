import React from 'react';
import {Routes, Route} from "react-router-dom";
import Navbar from './components/navbar/Navbar';
import Patient from './features/patient/Patient';
import SinglePatient from './features/patient/SinglePatient';
import Ward from './features/ward/Ward';
import SingleWard from './features/ward/SingleWard';
import AddUpdatePatient from './components/addUpdatePatients/AddUpdatePatient';
import AddUpdateWards from './components/addUpdateWards/AddUpdateWards';


import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Patient/>} />
        <Route path='/patient/:id' element={<SinglePatient/>} />
        <Route path='addPatient' element={<AddUpdatePatient/>} />
        <Route path='/patient/edit/:id' element={<AddUpdatePatient/>} />
        <Route path='/ward' element={<Ward/>} />
        <Route path='/ward/:id' element={<SingleWard/>} />
        <Route path='/addWard' element={<AddUpdateWards/>} />
        <Route path='/ward/edit/:id' element={<AddUpdateWards/>}/>
      </Routes>
    </div>
  );
}

export default App;
