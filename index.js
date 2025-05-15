import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import route from "./routes/userRoute.js";

const app = express();
dotenv.config();

app.use(cors()); 
app.use(bodyParser.json());

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

// Database Connection
const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL).then(() => {
    console.log("Database connected successfully.");
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
}).catch(error => console.log(error));

app.use("/api/user", route);
