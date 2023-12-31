import Ward from "../models/ward.model.js"


const getAllWard = async(req, res)=>{
    try {
        const wards = await Ward.find({});
        res.status(200).json({
            success: true,
            wards,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while retrieving all Ward"
        })
    }
};




// add Ward

const addWard = async(req, res)=>{
  
    try {
        const {wardNumber, capacity} = req.body;
        if(!wardNumber || !capacity){
            return res.status(404).json({
                success: false,
                message:"Enter a Ward number or capacity"
            })
        }

        const existingWard = await Ward.findOne({wardNumber});

        if(existingWard){
            return res.status(403).json({
                success: false,
                message: "Ward already exists"
            })
        }


        const ward = await Ward.create(req.body);
        res.status(201).json({
            success: true,
            message:"Added Ward Successfully",
            ward
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while adding Ward",
            error: error.message,
        })
    }
};

// get a single ward

const getWardDetails = async (req, res) => {
    try {
        const ward = await Ward.findById(req.params.id);
        if(!ward){
            return res.status(404).json({
                success: false,
                message:"No Ward found"
            })
        }

        res.status(200).json({
            success: true,
            ward,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while getting Ward",
            error: error.message
        })
    }
}



// update ward

const updateWard = async(req, res)=>{
    try {
        let ward = await Ward.findById(req.params.id);
        if(!ward){
            return res.status(404).json({
                success: false,
                message:"ward not found",
            })
        }

        ward = await Ward.findByIdAndUpdate(req.params.id, req.body,{new:true});
        res.status(200).json({
            success: true,
            message:"Updated Ward successfully",
            ward,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while updating the Ward"
        })
    }
};

// delete ward
const deleteWard = async(req, res)=>{
    try {
        const ward = await Ward.findById(req.params.id);
        if(!ward){
            return res.status(404).json({
                success: false,
                message:"ward not found",
            })
        }

        await ward.deleteOne();
        res.status(200).json({
            success: true,
            message:"deleted Ward successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while deleting the Ward"
        })
    }
}



export {getAllWard, getWardDetails ,addWard, deleteWard, updateWard};