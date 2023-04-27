import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

//Configuration
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//ROUTES 
app.use("/usermanagement", usermanagementRoutes);
app.use("/reservationmanagement", reservationmanagementRoutes);
app.use("/roommanagement", roommanagementRoutes);
app.use("/ratemanagement", ratemanagementRoutes);
app.use("/billingmanagement", billingmanagementRoutes);
app.use("/customermanagement", customermanagementRoutes);
app.use("/maintenance", maintenanceRoutes);











