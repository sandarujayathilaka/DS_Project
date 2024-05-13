import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const PostReview = () => {
  const [formData, setFormData] = useState({
    userName: '',
    title: '',
    date: '',
    rating: '',
    comment: ''
  });

  const { userName, title, date, rating, comment } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/reviews/add", formData)
      .then(() => {
        toast.success("Review submitted successfully", { position: "top-right" });
      })
      .catch((error) => {
        toast.error(`Failed to submit review: ${error}`, { position: "top-right" });
      });
  };

  return (
    <div className="flex justify-center items-center w-full h-full bg-white">
      <div className="container mx-auto my-4 px-4 lg:px-20">
        <div className="w-full p-8 my-4 md:px-12 lg:w-12/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
          <h1 className="font-bold uppercase text-5xl">Your review</h1>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
              <input
                type="text"
                name="userName"
                placeholder="User Name*"
                value={userName}
                onChange={handleChange}
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                required
              />
              <input
                type="text"
                name="title"
                placeholder="Course Title*"
                value={title}
                onChange={handleChange}
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                required
              />
              <input
                type="date"
                name="date"
                placeholder="Date*"
                value={date}
                onChange={handleChange}
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                required
              />
              <input
                type="number"
                name="rating"
                placeholder="Rating from 5*"
                value={rating}
                onChange={handleChange}
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                required
              />
              <textarea
                name="comment"
                placeholder="Comment*"
                value={comment}
                onChange={handleChange}
                className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                required
              ></textarea>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline"
              >
                Send Review
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PostReview;
