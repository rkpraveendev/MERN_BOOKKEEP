import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox } from "react-icons/md";
import { Navigate, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import BookTable from "../components/home/BookTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmation, setConfirmation] = useState(false); // State for confirmation
  const [bookToDelete, setBookToDelete] = useState(null); // State to track the book to delete
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDeleteBook = async (bookId) => {
    // Set the book to delete and show the confirmation dialog
    setBookToDelete(bookId);
    setConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/books/${bookToDelete}`);
      toast.success("Book deleted successfully!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });

      // Clear the bookToDelete and hide the confirmation dialog
      setBookToDelete(null);
      setConfirmation(false);

      // Reload the books list
      axios
        .get("http://localhost:3000/books")
        .then((response) => {
          setBooks(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const cancelDelete = () => {
    // Clear the bookToDelete and hide the confirmation dialog
    setBookToDelete(null);
    setConfirmation(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
      <h1 className="text-3xl my-8">Books List</h1>

        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
        {loading ? (
           <Spinner />
        ) : (
          <BookTable booksProps={books} handleDeleteBook={handleDeleteBook} />
        )}
      </div>
      {/* Confirmation Dialog */}
      {confirmation && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <p>Are you sure you want to delete this book?</p>
            <button
              onClick={confirmDelete}
              className="bg-red-500 text-white px-4 py-2 m-2 rounded-md"
            >
              Confirm
            </button>
            <button
              onClick={cancelDelete}
              className="bg-gray-300 text-gray-700 px-4 py-2 m-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <ToastContainer />

    </div>
  );
};

export default Home;
 