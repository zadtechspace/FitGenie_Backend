const express = require('express');

const app = express();

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

const authRouter = require('./Routes/authRouter');

const cors = require('cors');
const morgan = require('morgan');
const userRouter = require('./Routes/userRoute');
const { activateSubscription } = require('./Controller/subscriptionController');

app.post(
    "/api/subscription/webhook",
    express.raw({ type: "*/*" }),   // keep body as buffer
    activateSubscription
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(morgan('dev'));


const PORT = process.env.port

const URL = process.env.url

app.get('/', (req, res) => {
    res.send('Welcome to Express JS');
});

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/fit-plan", require("./Routes/fitPlanRoute"))
app.use("/api/subscription", require("./Routes/subscriptionRoute"))
// app.use("/api/paystack-webhook", require("./Routes/"))

app.listen(PORT, () => {
    mongoose.connect(URL).then(() => {
        console.log(`Server is running on port ${PORT} and connected to database`);
    }).catch((err) => {
        console.log("Error connecting to database", err);
    });
});

