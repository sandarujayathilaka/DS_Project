import React, { useEffect, useState } from 'react';
import remove from '../../assets/delete.png';

const ReviewCard = ({ courseId }) => {
  const [userName, setUserName] = useState('');
  const [ratings, setRatings] = useState(0);
  const [comment, setComment] = useState('');
  const [createdAt, setCreatedAt] = useState('');

  useEffect(() => {
    // Fetch review data based on courseId
    const fetchReviewData = async () => {
      try {
        const reviewRef = firestore.collection('reviews').where('courseId', '==', courseId);
        const snapshot = await reviewRef.get();
        if (!snapshot.empty) {
          const reviewData = snapshot.docs[0].data();
          setUserName(reviewData.userName);
          setRatings(reviewData.ratings);
          setComment(reviewData.comment);
          setCreatedAt(reviewData.createdAt.toDate().toLocaleDateString());
        }
      } catch (error) {
        console.error('Error fetching review data:', error);
      }
    };

    fetchReviewData();
  }, [courseId]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="px-10">
        <div className="bg-white max-w-xl rounded-2xl px-10 py-8 shadow-lg hover:shadow-2xl transition duration-500">
          <div className="mt-4">
            <div className="flex mt-2">
              {[...Array(ratings)].map((_, index) => (
                <svg key={index} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="mt-4 text-md text-gray-600">{comment}</p>
            <div className="flex justify-between items-center">
              <div className="mt-4 flex items-center space-x-4 py-6">
                <div>
                  <img className="w-10 h-10 mb-0 rounded-full" src={`https://ui-avatars.com/api/?name=${userName}`} alt={userName} />
                </div>
                <div className="text-sm font-semibold">{userName} • <span className="font-normal">{createdAt}</span></div>
              </div>
              <div>
                <button className="p-2 bg-teal-400 hover:bg-red-400 rounded-full h-8 w-8 flex items-center justify-center mt-4 shadow-lg cursor-pointer">
                    <img className="w-4 h-4" src={remove} alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
