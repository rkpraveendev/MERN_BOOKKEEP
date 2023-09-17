import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";


const DeleteBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();


  const handleDeleteBook = () => {
 
    setLoading(true);
    axios
      .delete(`http://localhost:3000/books/${id}`)
      .then(() => {
        setLoading(false);
      navigate("/")
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Chack console');
        console.log(error);
      });
  };

  return (
    <div>
      
      DeleteBook

      <button type="submit" onClick={handleDeleteBook}>
        Delete
      </button>

    </div>
  )
}

export default DeleteBook