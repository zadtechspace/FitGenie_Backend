const express = require('express');
const { createFitnessPlan } = require('../Controller/fitPLanController');
const isloggedin = require('../middlewares/isloggedin');
const isActiveSubscriber = require('../middlewares/subscription');
const fitPlanRoute = express.Router();

fitPlanRoute.post('/create', isloggedin, isActiveSubscriber, createFitnessPlan)
module.exports = fitPlanRoute;