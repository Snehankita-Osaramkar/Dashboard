import express from "express";
import cors from "cors";
import dbconnect from "./Database/database.js";
import adminRouter from "./Routes/adminRoutes.js";
import dotenv from "dotenv";
dotenv.config();


dbconnect()
  .then(() => console.log("Connected"))
  .catch((error) => {
    console.error("Database connection failed:", error);
  });


const app = express();
app.use(cors({
    origin :"https://vendor-dashboard-server.vercel.app/",
    credentials:true
}));
app.use(express.json());
app.use(express.urlencoded());
app.get("/",(req, res)=>{
    res.send("hello world")
})
app.use("/admin", adminRouter);

app.listen(process.env.PORT);