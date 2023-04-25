import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    image:{
        type:String,
    },
    role:{
        type:String,
        required:true,
        default:"user"
    }
  
})

export default mongoose.models.user || mongoose.model("user",userSchema)