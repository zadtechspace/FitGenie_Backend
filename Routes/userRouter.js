    const express = require("express");

    const userRouter = express.Router();

    const updateUserProfile  = require("../Controller/userController");

    const isloggedin = require("../middlewares/isloggedin");

    userRouter.put("/updateUserProfile/:id",isloggedin, updateUserProfile);

    module.exports = userRouter;