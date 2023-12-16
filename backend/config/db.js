import mongoose  from "mongoose";

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database is connected to ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error connecting to ${conn.connection.host}`)        
    }
}

export default connectDB;