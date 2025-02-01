import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

async function dbconnect() {
    try {
        const uri = process.env.MONGO_URL;
        if (!uri) {
            throw new Error("MONGO_URI is not defined. Check your .env file.");
        }
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 15000, // Increase timeout (default is 10000ms)
            socketTimeoutMS: 45000,
            bufferCommands: false
        });
        console.log("Successfully connected to MongoDB!");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}

export default dbconnect;
