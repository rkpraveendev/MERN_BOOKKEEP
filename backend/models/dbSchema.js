import mongoose from "mongoose";

// Defining a Mongoose schema for the User model.

const BookSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: [true, "Please provide the username"],
        },
        author:{
            type: String,
            require: [true, "Please provide the author"],
        },
        publishYear:{
            type: String,
            require: [true, "Please provide the publish year"],
        },
    
    },
    {
    timestamp: true,
    }

)

// Defining the User model based on the UserSchema.
const Book = mongoose.models.books || mongoose.model('books', BookSchema);

export default Book;