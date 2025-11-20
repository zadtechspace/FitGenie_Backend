const express = require('express');
const { createFitnessPlan, getFitnessPlanHistory, getLatestFitnessPlan } = require('../Controller/fitPLanController');
const isloggedin = require('../middlewares/isloggedin');
const isActiveSubscriber = require('../middlewares/subscription');
const fitPlanRoute = express.Router();

fitPlanRoute.post('/create', isloggedin, isActiveSubscriber, createFitnessPlan)
fitPlanRoute.get("/history", isloggedin, isActiveSubscriber, getFitnessPlanHistory);
fitPlanRoute.get("/latest", isloggedin, isActiveSubscriber, getLatestFitnessPlan);

module.exports = fitPlanRoute;