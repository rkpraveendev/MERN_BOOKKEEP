import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectdb } from "./dbConnect.js";
import Book from "./models/dbSchema.js";
import bookRoute from "./routes/bookRoute.js"

dotenv.config();

const app = express();

app.use(express.json()); // Use express.json() for JSON parsing

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// Use the articlesRouter for the "/articles" route
app.use("/", bookRoute); 

connectdb();

const PORT = process.env.PORT || 3000; // Set a default port if PORT is not defined

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
