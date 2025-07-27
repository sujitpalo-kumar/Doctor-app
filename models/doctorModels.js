const  mongoose  = require("mongoose");



const doctorschema= new mongoose.Schema({

    userId:{
        type:String
    },
    firstname:{
        type:String,
        required:[true,"first name is required"]
    },
    lastname:{
        type:String,
        required:[true,"last name is required"]
    },
    phone:{
        type:Number,
        required:[true,"phone number is required"]
    },
    email:{
        type:String,
        required:[true,"first name is required"]
    },
    website:{
        type:String,
       
    },
    adress:{
        type:String,
        required:[true,"adress is required"]
    },
    specialization:{
        type:String,
        required:[true,"first name is required"]
    },
    experiance:{
        type:Number,
        required:[true,"experiance is required"]


    },
    feesperconsultation:{
        type:String,
        required:[true,"fee is required"]
    },
    status:{
        type:String,
        default: 'Pending'
    },
    timings:{
        type:[String],
        required:[true,"work time  is required"]
    },



},
{timestamps:true}
)

const doctormodel = mongoose.model("doctor",doctorschema)
module.exports=doctormodel