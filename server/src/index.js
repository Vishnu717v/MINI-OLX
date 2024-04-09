import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';

import { userRouter } from "./routes/users.js";
import { vehicleRouter } from "./routes/vehicles.js";

const app=express()

app.use(express.json());
app.use(cors());
app.use("/auth",userRouter);
app.use("/vehicles",vehicleRouter);
mongoose.connect("mongodb://127.0.0.1:27017/PROJECT",{
    useUnifiedTopology:true,
    useNewUrlParser:true,
})
.then(()=> console.log("Connected to DB"));

app.listen(3007,()=> console.log("SERVER STARTED!"))