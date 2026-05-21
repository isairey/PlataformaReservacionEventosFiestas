import { Schema, model } from "mongoose";
import { Roles } from "./Roles";
const userSchema= new Schema({
    name:{
        type:String,
        required:true,
        minLength:3
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        reuquired:true
    },
    role:{
        type:String,
        enum:Object.values(Roles),
        default:Roles.USER
    }
})
export let User= model("User",userSchema)