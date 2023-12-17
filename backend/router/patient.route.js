import express from 'express';
import { getAllPatients, getPatientDetials, addPatient, updatePatient, deletePatient } from '../controller/patient.controller.js';

const patientRouter = express.Router();

patientRouter.get("/", getAllPatients);
patientRouter.get("/:id", getPatientDetials);
patientRouter.post('/new', addPatient);
patientRouter.put('/update/:id', updatePatient);
patientRouter.delete('/delete/:id', deletePatient);


export default patientRouter;