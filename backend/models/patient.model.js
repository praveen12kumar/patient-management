import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    gender:{
        type:String,
        enum:["male", "female","other"],
        default:"male",
    },
    medicalHistory:{
        type:[String],
        default: null,
    },
    contactInfo:{
        type:Number,
        required:true,
    },
    assignedWard:{
        type:Number,
        required:true,
    }
},{
    timestamps:true,
});

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;