import express from "express";
import cookieParser from "cookie-parser";


import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";

import dotenv from "dotenv";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

import { protectRoute } from "./middleware/protectRoute.js";
dotenv.config();

const app = express();

app.use(express.json()); //Will allow us to parse request.body object
app.use(cookieParser())

const PORT = ENV_VARS.PORT;
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie",protectRoute,movieRoutes);
app.use("/api/v1/tv", protectRoute,tvRoutes)
app.use("/api/v1/search", protectRoute,searchRoutes)

app.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
  connectDB();
});

