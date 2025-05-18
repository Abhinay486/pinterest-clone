import express from 'express';
import dotenv from 'dotenv';
import connectDb from './database/db.js';
import cookieParser from 'cookie-parser';
import cloudinary from './config/cloudinary.js'; // ✅ Corrected
import path from "path";
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS for your frontend

app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
      ? 'http://localhost:5173' // Replace with your actual frontend domain
      : "https://frontend.vercel.app",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Set-Cookie']
  }));


// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
import userRoutes from './routes/userRoutes.js';
import pinRoutes from './routes/pinRoutes.js';

app.use("/api/user", userRoutes);
app.use("/api/pin", pinRoutes);

app.get("/", (req, res) => {
    res.send("HI THERE!");
})


// Start server
app.listen(port, async () => {
    console.log(`Server running on port ${port}`);
    await connectDb();
});
