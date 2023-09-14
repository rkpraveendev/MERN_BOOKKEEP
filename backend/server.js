import express from "express";
import dotenv from "dotenv";
import mongoose from 'mongoose';
import { connectdb } from "./dbConnect.js";

dotenv.config();

const app = express();

connectdb();
 
app.get("/", (req, res) => {
  return res.status(200).send("Mern stack app");
});

const PORT = process.env.PORT || 3000; // Set a default port if PORT is not defined

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
