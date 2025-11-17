const express = require('express');
const { createFitnessPlan } = require('../Controller/fitPLanController');
const isloggedin = require('../middlewares/isloggedin');
const fitPlanRoute = express.Router();

fitPlanRoute.post('/create', isloggedin, createFitnessPlan)
module.exports = fitPlanRoute;