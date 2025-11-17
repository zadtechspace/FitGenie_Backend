const userModel = require("../Model/userModel");

    const updateUserProfile = async(req,res)=>{
        try {
            const userId = req.user._id;
            const updateData = req.body

            const{age,gender,height,weight,goal,dietPreference,timePerDay} = updateData;

            if(!age){
                return res.status(400).json({
                   
                    message:"Age is required"
                });
            }
            
            if(!gender){
                return res.status(400).json({
                  
                    message:"gender is required"
                });
            }
            if(!height){
                return res.status(400).json({
                  
                    message:"height is required"
                });
            }
            if(!weight){
                return res.status(400).json({
                   
                    message:"weight is required"
                });
            }
            if(!goal){
                return res.status(400).json({
                   
                    message:"goal is required"
                });
            }
            if(!dietPreference){
                return res.status(400).json({
                   
                    message:"dietPreference is required"
                });
            }
            if(!timePerDay){
                return res.status(400).json({
                  
                    message:"timePerDay is required"
                });
            }


            const updateUser = await userModel.findByIdAndUpdate(userId, updateData, { new: true });

            if (!updateUser) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }
            res.status(200).json({
                success: true,
                message: "User profile updated successfully",
                user: updateUser
            });

        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: "An error occurred while updating the profile"
            });
        }       
}

module.exports = updateUserProfile