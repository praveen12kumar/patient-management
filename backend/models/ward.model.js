import mongoose from "mongoose";

const wardSchema = new mongoose.Schema({
    wardNumber:{
        type:Number,
        required:true,
    },

    capacity:{
        type:Number,
        required:true,
    },
    specialization:{
        type:String,
        enum: ["General Ward", "Emergency Ward", "Intensive Care Unit", "Intensive Coronary Care Unit", "Nursery", "Special Septic Nursery", "Burns Ward", "Postoperative Ward", "Postnatal Ward"],
        default: "General Ward"
    }
},{
    timestamps:true,
})

const Ward = mongoose.model('Ward', wardSchema);

export default Ward;