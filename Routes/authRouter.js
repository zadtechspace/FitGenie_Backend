const express = require('express');

const authRouter = express.Router();
const {registerUser,login, getSingleUser, verifyDashboardToken}  = require('../Controller/authcontroller');
const isloggedin = require('../middlewares/isloggedin');

authRouter.post('/register', registerUser);
authRouter.post('/login', login);
authRouter.post('/verifyDashboardToken', verifyDashboardToken);
authRouter.get('/getSingleUser/:id',isloggedin, getSingleUser);


module.exports = authRouter