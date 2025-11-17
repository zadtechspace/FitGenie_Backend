const express = require('express');

const app = express();

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

const authRouter = require('./Routes/authRouter');

const cors = require('cors');
<<<<<<< HEAD

const userRouter = require('./Routes/userRouter');

=======
const userRouter = require('./Routes/userRoute');
>>>>>>> 6ed115d169a130d67c21b951d76e0ae85eba14f8
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors())


PORT = process.env.port

URI = process.env.url

app.get('/', (req, res) => {
    res.send('Welcome to Express JS');
});

<<<<<<< HEAD
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
=======
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/fit-plan", require("./Routes/fitPlanRoute"))
>>>>>>> 6ed115d169a130d67c21b951d76e0ae85eba14f8

app.listen(PORT, () => {
    mongoose.connect(URI).then(() => {
        console.log(`Server is running on port ${PORT} and connected to database`);
    }).catch((err) => {
        console.log("Error connecting to database", err);
    });
});

