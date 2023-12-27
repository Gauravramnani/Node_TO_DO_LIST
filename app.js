// const express = require("express");

import express from "express";
import mongoose, { Schema } from "mongoose";
import userRouter from "./routes/user_routes.js";
import taskRouter from "./routes/task.js"
import { User } from "./models/user_models.js";
import { register } from "./controller/user.js";
import { connectDB } from "./data/database.js";
import { config } from "dotenv"
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors"


const app = express();

config({
    path: "./data/config.env"
})

connectDB();

// app.post("/users/new",register)
//using middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))


//using routes
app.use(userRouter)
app.use(taskRouter)


app.get("/", (req, res) => {

    res.send("wah thai gyu ho baki");
})


app.post("/", (req, res) => {

    res.send("thai gyu chhe mitra")
})


app.listen(process.env.PORT, () => {

    console.log(`server is working on port ${process.env.PORT} in ${process.env.NODE_ENV} Mode`)
})

//using Error Middleware
app.use(errorMiddleware)