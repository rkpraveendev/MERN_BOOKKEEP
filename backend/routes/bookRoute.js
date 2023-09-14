import { connectdb } from "../dbConnect.js";
import Book from "../models/dbSchema.js";
import express from "express";

const router = express.Router();

router.route("/books")

  .post( async (req, res) => {
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
  })
  
  .get(async (req, res) => {
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

  router.route("/books/:id")
  
  .get( async (req, res) => {
    try {
      const foundBook = await Book.findById(req.params.id);
      res.status(200).send({ foundBook });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  })
  
  .put( async (req, res) => {
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
  })
  
  .delete( async (req, res) => {
    try {
      const bookId = req.params.id;
  
      // Construct a query object to specify which book to delete by its ID
      const deleteBook = await Book.deleteOne({ _id: bookId });
  
      if (!deleteBook) {
        res.status(404).send({ message: "Book not found" });
      } else {
        res.status(200).send({ message: "Book deleted successfully" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });

export default router;  