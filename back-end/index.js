import express from "express";
import cors from "cors";
import dbconnect from "./Database/database.js";
import adminRouter from "./Routes/adminRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

// Connect to MongoDB before starting the server
(async () => {
    await dbconnect();  // Ensures MongoDB is connected first
    console.log("Connected to MongoDB. Starting Server...");

    app.get("/", (req, res) => {
        res.send("Hello World!");
    });

    app.use("/admin", adminRouter);

    const PORT = process.env.PORT || 5500;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})();
