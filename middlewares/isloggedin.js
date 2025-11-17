const jwt = require('jsonwebtoken');
const blacklistedtokenModel = require("../Model/blacklistedtokenModel");
const userModel = require("../Model/userModel");



const isloggedin = async(req,res,next)=>{
    let token;

try {
    //  i checked if a token exist in the header
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Not authorized, no token"
            })
        }
    }
        // verified the token after being checked if it exist or not
    const {email} = jwt.verify(token,process.env.jwt_secret)

        // checked if the token is blacklisted or not
      const isBlacklisted = await blacklistedtokenModel.findOne({ token })
        if (isBlacklisted) {
            return res.status(403).json({
                success: false,
                message: "Token is invalid: blacklisted"
            })
        }

        // finding the user associated with the token

        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).json({
                success:false,
                message:"No user found"
            })
        }

        // modified the req object to include user info

        req.user = user;
        next();

    } catch (error) {
    console.log(error)

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


module.exports = isloggedin;