const express = require("express")
const isloggedin = require("../middlewares/isloggedin")
const { initializeSubscription, activateSubscription } = require("../Controller/subscriptionController")
const subscritionRouter = express.Router()

subscritionRouter.post("/initialize", isloggedin, initializeSubscription)
// subscritionRouter.post("/webhook", express.raw({type: "*/*"}), activateSubscription )

module.exports = subscritionRouter