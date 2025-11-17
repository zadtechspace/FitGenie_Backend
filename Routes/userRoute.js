const express = require('express');
const userRouter = express.Router();
const {getUserProfile, updateUserProfile} = require('../Controller/userController');
const isloggedin = require('../middlewares/isloggedin');

userRouter.put('/profile', isloggedin, updateUserProfile);

module.exports = userRouter;