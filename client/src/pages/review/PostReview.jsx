import React, { useState } from 'react';
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Rating validation
    if (formData.rating === '' || parseFloat(formData.rating) <= 0 || parseFloat(formData.rating) > 5) {
      toast.error('Please enter a rating between 0 and 5');
      return;
    }

    // Date validation
    const currentDate = new Date();
    const selectedDate = new Date(formData.date);
    if (selectedDate > currentDate) {
      toast.error('Please select a date before today');
      return;
    }

    // Submit the form data to the API endpoint
    fetch('http://udemy.dev/api/reviews/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (response.ok) {
        toast.success('Review submitted successfully');
        // Optionally, reset the form fields
        setFormData({
          userName: '',
          title: '',
          date: '',
          rating: '',
          comment: ''
        });
      } else {
        toast.error('Failed to submit review');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      toast.error('An error occurred while submitting the review');
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
                value={formData.userName}
                onChange={handleChange}
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                required
              />
              <input
                type="text"
                name="title"
                placeholder="Course Title*"
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                required
              />
              <input
                type="date"
                name="date"
                placeholder="Date*"
                value={formData.date}
                onChange={handleChange}
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                required
              />
              <input
                type="number"
                name="rating"
                placeholder="Rating from 5*"
                value={formData.rating}
                onChange={handleChange}
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                min="0"
                max="5"
                step="0.1"
                required
              />
              <textarea
                name="comment"
                placeholder="Comment*"
                value={formData.comment}
                onChange={handleChange}
                className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                required
              ></textarea>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="uppercase text-sm font-bold tracking-wide bg-teal-700 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline"
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
