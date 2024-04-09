import mongoose from "mongoose";


const VehicleSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    ownername:{
        type:String,required:true
    },
    informations:[{
        type:String,required:true
    }],
    imageurl:{
        type:String,required:true
    },
    model:{
        type:Number,required:true
    },
    userOwner:{type:mongoose.Schema.Types.ObjectId,ref:"users",required:true},
});
export const VehicleModel=mongoose.model("vehicles",VehicleSchema);