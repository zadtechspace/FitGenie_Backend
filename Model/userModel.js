const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        trim:true,
        required:true,
        
    },
    lastName:{
        type:String,
        trim:true,
        required:true,
        
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        trim:true,
        required:true,

    },
    age:{
        type:Number,
        trim:true,
        // required:true,

    },
    gender:{
        type:String,
        trim:true,
        enum:["male","female"]

    },
    height:{
        type:String,
        trim:true,
        // required:true,

    },
    weight:{
        type:String,
        trim:true,
        // required:true,

    },
    goal:{
        type:String,
        trim:true,
        enum:["lose weight","maintain weight","gain weight"],

    },
    dietPreference:{
        type:String,
        trim:true,
        enum:[
            "none",
            "balanced",
            "high protein",
            "vegetarian",
            "vegan",
            "gluten free",
            ],
        

    },
    timePerDay:{
        type:String,
        trim:true,
        min:10

    },
    planAccess:{
        type:String,
        trim:true,
        enum:['free','premium','pro'],
        default:'free'
    },
    isVerified:{
        type:Boolean,
       default:false

    },
    isVerifiedtoken:{
        type:String,
        trim:true,
        default:null
    },
    isVerifiedtokenExpiry:{
        type:Date,
        default:null
    }
  
},{timestamps:true})


const userModel = mongoose.model("user",userSchema)

module.exports = userModel