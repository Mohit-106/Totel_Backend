import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import usermanagementRoutes from "./routes/usermanagement.js";
import reservationmanagementRoutes from "./routes/reservationmanagement.js";
import roommanagementRoutes from "./routes/roommanagement.js";
import ratemanagementRoutes from "./routes/ratemanagement.js";
import billingmanagementRoutes from "./routes/billingmanagement.js";
import customermanagementRoutes from "./routes/customermanagement.js";
import auth from "./routes/auth.js";
import chat from "./routes/chatroom.js"
import task from "./routes/tasks.js"

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
app.use("/users", usermanagementRoutes);
app.use("/reservations", reservationmanagementRoutes);
app.use("/rooms", roommanagementRoutes);
app.use("/rates", ratemanagementRoutes);
app.use("/bills", billingmanagementRoutes);
app.use("/customers", customermanagementRoutes);
app.use("/auth",auth);
app.use("/chat",chat);
app.use("/task",task);

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("server started at port 3000");
})










