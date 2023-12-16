import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import patientRouter from './router/patient.route.js';
import wardRouter from './router/ward.route.js';
config({
    path:"backend/config/config.env",
})

const app = express();

// middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Routes

app.use('/api/v1/patient', patientRouter);
app.use('/api/v1/ward', wardRouter);



export default app;