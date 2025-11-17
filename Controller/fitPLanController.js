const { generateObject, generateText } = require("ai")
const { googleAi } = require("../Config/gemini")
const { aiPlanSchema } = require("../scehmas/fitnessPlanSchema")
const { fitnessPlanAiPrompt } = require("../utils/aiprompts")

const createFitnessPlan = async (req, res) => {
    try {
        const user = req.user
        const { age, gender, height, weight, goal, dietPreference, timePerDay } = user
        if (!age) return res.status(400).json({ message: "Age is required. Please update your profile." })
        if (!gender) return res.status(400).json({ message: "gender is required. Please update your profile." })
        if (!height) return res.status(400).json({ message: "height is required. Please update your profile." })
        if (!weight) return res.status(400).json({ message: "weight is required. Please update your profile." })
        if (!goal) return res.status(400).json({ message: "goal is required. Please update your profile." })
        if (!timePerDay) return res.status(400).json({ message: "timePerDay is required. Please update your profile." })
        if (!dietPreference) return res.status(400).json({ message: "dietPreference is required. Please update your profile." })
        const response = await generateObject({
            model: googleAi("gemini-2.5-flash"),
            prompt: fitnessPlanAiPrompt(user),
            schema: aiPlanSchema
        })
        res.status(200).json({ plan: response.text, response })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
}

module.exports = { createFitnessPlan };
