import mongoose, { connect } from "mongoose";
import { ENV_VARS } from "./envVars.js";



export const connectDB = async() =>{
    try{
       const connection= await mongoose.connect(ENV_VARS.MONGO_URI)
       console.log("Connected to MongoDB"+ connection.connection.host);
       

    }catch(error){
        console.error("Error Connecting to mongodb",error)
        process.exit(1) //1 means there was one or more errors in the code, 0 means success
    }
}