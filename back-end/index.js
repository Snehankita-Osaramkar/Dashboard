import express from "express";
import cors from "cors";
import dbconnect from "./Database/database.js";
import adminRouter from "./Routes/adminRoutes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dbconnect()
  .then(() => console.log("Connected"))
  .catch((error) => {
    console.error("Database connection failed:", error);
  });


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/admin", adminRouter);

app.listen(process.env.PORT);