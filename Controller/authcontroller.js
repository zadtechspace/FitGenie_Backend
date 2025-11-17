const userModel = require("../Model/userModel")
const bcrypt = require('bcrypt');
const generateRandomString = require("../Utilities/randomString")
const jwt = require('jsonwebtoken');
const blacklistedtokenModel = require("../Model/blacklistedtokenModel");

const registerUser =async(req,res)=>{
    const {password} = req.body;
    const gensalt = await bcrypt.genSalt(10);

    const hashedpassword = await bcrypt.hash(password,gensalt);

    const verificationToken = generateRandomString(8);

    const verificationtokenExpiry = Date.now() + 10*60*1000; //10 minutes


    try {
        // const error = new Error()
        // const errorResponse = error
        const user = await userModel.create({...req.body,password:hashedpassword,isVerifiedtoken:verificationToken,isVerifiedtokenExpiry:verificationtokenExpiry})
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not registered"
            })
        }
        
        res.status(201).json({
            success:true,
            message:"User registered successfully",
            user
        })
    } catch (error) {
        console.log(error)
        if(error.errorResponse.code === 11000){
            return res.status(409).json({
                success:false,
                message:"Email already exists"
            })

        }
       
    }
}


const login = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email})

        if(!user){
            return res.status(404).json({
                success:false,
                message:"email or password is incorrect"
            })
        }

        const correctedpassword = await bcrypt.compare(password, user.password)

        if(!correctedpassword){
            return res.status(404).json({
                success:false,
                message:"email or password is incorrect"
            })
        }

        const token = jwt.sign({email,id:user._id},process.env.jwt_secret,{expiresIn:process.env.jwt_exp})

        res.status(200).json({
            success:true,
            message:"User logged in successfully",
            user:{id:user._id,name:user.firstName,email:user.email},
            token,
        })
        // console.log(req.headers)
    } catch (error) {
        console.log(error)

    }
    }



const logout = async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1];

    try {
        const blacklistedToken = await blacklistedtokenModel.create({token});
        if(blacklistedToken){
            res.status(200).json({
                success:true,
                message:"User logged out successfully"
            })
        }
    } catch (error) {
        console.log(error)
    }
}


const getSingleUser = async(req,res)=>{

        const {_id}= req.user._id
    try {
        const user = await userModel.findById({_id,...req.body})
        if(!user){
            return res.status(404).json({
                success:false,
                message:"No user found"
            })
        }
        res.status(200).json({
            success:true,
            message:"User fetched successfully",
            user
        })
    } catch (error) {
        console.log(error)
    }
}

const verifyDashboardToken =async (req,res)=>{
    try {
    const token = req.headers.authorization.split(" ")[1]
    
    if(!token){
        return res.status(404).json({
            success:false,
            message:"token is required,kindly login"
        })
    }

    const {email} = jwt.verify(token,process.env.jwt_secret)

    const blacklistedToken = await blacklistedtokenModel.findOne({token})
    if(blacklistedToken){
        return res.status(404).json({
            success:false,
            message:"Token has been blackisted"
        })

    }

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(404).json({
            success:false,
            message:"User Not found"
        })
    }

    res.status(200).json({
        success:true,
        
    })

} catch (error) {
    
           if (error.message === "jwt malformed") {
            return res.status(400).json({ success: false, message: "Token is invalid" })
        } else if (error.message === "jwt expired") {
            return res.status(400).json({ success: false, message: "Token has expired. kindly login again" })
        } else if(error.message === "jwt must be provided"){
              return res.status(400).json({ success: false, message: "Token is required. kindly login" })
        }
        else {
            return res.status(400).json({ success: false, message: error.message || "something went wrong" })
        }
    
}

}
module.exports = {registerUser,login,logout,getSingleUser,verifyDashboardToken}