import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectdb } from "./dbConnect.js";
import Book from "./models/dbSchema.js";

dotenv.config();

const app = express();

app.use(express.json()); // Use express.json() for JSON parsing

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.status(200).send("Mern stack app");
});

app.post("/books", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;

    if (!title || !author || !publishYear) {
      return res.status(400).json({
        message: "Please provide all fields: title, author, and publishYear",
      });
    }

    const newBook = new Book({
      title: title,
      author: author,
      publishYear: publishYear,
    });

    const savedBook = await newBook.save();

    res.status(200).send(savedBook);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

app.get("/books", async (req, res) => {
  try {
    const foundBooks = await Book.find();

    res.status(200).send({
      count: foundBooks.length,
      data: foundBooks,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const foundBook = await Book.findById(req.params.id);
    res.status(200).send({ foundBook });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

app.put("/books/:id", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;

    if (!title || !author || !publishYear) {
      res.status(400).send({
        message: "Please provide all fields: title, author, and publishYear",
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body);

    if (!updatedBook) {
      return res.status(404).send("Book not found");
    }

    res.status(200).send({ message: "Book updated successfully", updatedBook });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

connectdb();

const PORT = process.env.PORT || 3000; // Set a default port if PORT is not defined

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
