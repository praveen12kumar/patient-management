import express from 'express';
import { addWard, getAllWard, updateWard, deleteWard } from '../controller/ward.controller.js';

const wardRouter = express.Router();


wardRouter.get('/', getAllWard);
wardRouter.post('/new', addWard);
wardRouter.put('/update/:id', updateWard);
wardRouter.delete('/delete/:id', deleteWard);

export default wardRouter;