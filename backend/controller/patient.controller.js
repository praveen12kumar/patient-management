import Patient from "../models/patient.model.js"

const getAllPatients = async(req, res)=>{
    try {
        const patients = await Patient.find({});
        res.status(200).json({
            success:true,
            patients,
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error in fetch all patients"
        })
    }
}


// add a new patient
const addPatient = async(req, res)=>{
    
    try {
        const {name, age, gender, contactInfo, assignedWard} = req.body;
        if(!name || !age || !gender || !contactInfo || !assignedWard){
            return res.status(404).json({
                success:false,
                message:"Enter name or age or gender or contactInfo or assigned Ward",
            })
        }
        const patient = await Patient.create(req.body);
        
        res.status(201).json({
            success:true,
            message:"Patient added successfully",
            patient,
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error in adding patient",
            error: error.message
        })
    }
}

// update a patient
const updatePatient = async(req, res)=>{
    try {
        let patient = await Patient.findById(req.params.id);
        if(!patient){
            return res.status(404).json({
                success:false,
                message:"Patient not found"
            })
        }

        await patient.updateOne(req.body);
        res.status(200).json({
            success:true,
            message:"Patient updated successfully",
            
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update the patient',
            error: error.message
        })
    }
}

// delete the patient

const deletePatient = async(req, res)=>{
    try {
        const patient = await Patient.findById(req.params.id);
        if(!patient){
            return res.status(404).json({
                success:false,
                message:"Patient not found"
            })
        }

        await patient.deleteOne();
        res.status(200).json({
            success:true,
            message:"Patient deleted successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete the patient',
            error: error.message
          })
    }
}




export {getAllPatients, addPatient, updatePatient, deletePatient}