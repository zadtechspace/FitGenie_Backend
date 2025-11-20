const express = require('express');
const userRouter = express.Router();
const {viewUserProfile, updateUserProfile} = require('../Controller/userController');
const isloggedin = require('../middlewares/isloggedin');

userRouter.put('/updateprofile', isloggedin, updateUserProfile);
userRouter.get('/viewprofile/:_id', isloggedin, viewUserProfile);

module.exports = userRouter;