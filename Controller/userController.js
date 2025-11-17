const userModel = require("../Model/userModel");

const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const updateData = req.body;
        const { age, gender, height, weight, goal, timePerDay, dietPreference } = updateData
        if (!age) return res.status(400).json({ message: "Age is required" })
        if (!gender) return res.status(400).json({ message: "gender is required" })
        if (!height) return res.status(400).json({ message: "height is required" })
        if (!weight) return res.status(400).json({ message: "weight is required" })
        if (!goal) return res.status(400).json({ message: "goal is required" })
        if (!timePerDay) return res.status(400).json({ message: "timePerDay is required" })
        if (!dietPreference) return res.status(400).json({ message: "dietPreference is required" })

        const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User profile updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { updateUserProfile };