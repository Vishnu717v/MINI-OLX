import express from "express";
import mongoose from "mongoose";
import { VehicleModel } from "../models/Vehicles.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";


const router=express.Router();


router.get("/", async (req, res) => {
    try {
        const response = await VehicleModel.find({});
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});
router.post("/",verifyToken, async (req, res) => {
    const vehicle=new VehicleModel(req.body);
    try {
        const response = await vehicle.save();
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});
router.put("/",verifyToken, async (req, res) => {
  
    try {
        const vehicle = await VehicleModel.findById(req.body.vehicleID);
        const user= await UserModel.findById(req.body.userID);
        user.savedVehicles.push(vehicle);
        await user.save();
        res.json({savedVehicles:user.savedVehicles});
    } catch (err) {
        res.json(err);
    }
});


router.get("/savedVehicles/ids/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        res.json({ savedVehicles: user?.savedVehicles });
    } catch (err) {
        res.json(err);
    }
});
router.get("/savedVehicles/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        const savedVehicles=await VehicleModel.find({
            _id:{ $in:user.savedVehicles},
        });
        res.json({ savedVehicles });
    } catch (err) {
        res.json(err);
    }
});






export{router as vehicleRouter};
