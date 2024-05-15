import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Button } from "@/components/ui/button";
import Header from "../Header";
import toast from "react-hot-toast";
import ReactLoading from 'react-loading';
export default function ViewCourse() {
  const [courseData, setCourseData] = useState(null);
  const [checkedChapters, setCheckedChapters] = useState({});
  const [chapterComments, setChapterComments] = useState({});
  const { id } = useParams();
  const [approvedChapterCount, setApprovedChapterCount] = useState(0);
  const [totalChapterCount, setTotalChapterCount] = useState(0);
  const [selectedChapterCount, setSelectedChapterCount] = useState(0);

  
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`https://udemy.dev/api/courses/${id}`);
        const { chapters } = response.data;

       
        const filteredChapters = chapters.filter(
          (chapter) => chapter.status !== "unpublished" && chapter.status !== "draft"
        );
        

   
        setCourseData({ ...response.data, chapters: filteredChapters });


        const initialCheckedChapters = {};
        const initialChapterComments = {};
        filteredChapters.forEach((chapter) => {
          initialCheckedChapters[chapter._id] = false; 
          initialChapterComments[chapter._id] = ""; 
        });
        setCheckedChapters(initialCheckedChapters);
        setChapterComments(initialChapterComments);

        setIsLoading(false);

      } catch (error) {
        toast.error(error);
      
      }
    };

    fetchCourse();
  }, [id]);

  useEffect(() => {
    if (courseData && courseData.chapters) {
      const approvedCount = courseData.chapters.filter((chapter) => chapter.status === "approved").length;
      setApprovedChapterCount(approvedCount);
      setTotalChapterCount(courseData.chapters.length);
    }
  }, [courseData]);



  const handleCheckboxChange = (chapterId) => {

    setCheckedChapters((prevState) => ({
      ...prevState,
      [chapterId]: !prevState[chapterId], 
    }));
    const isChecked = !checkedChapters[chapterId];

  
    setSelectedChapterCount((prevCount) =>
      isChecked ? prevCount + 1 : prevCount - 1
    );
  };


  const remaining = totalChapterCount - approvedChapterCount;
  const allChaptersChecked = selectedChapterCount === remaining;

  const handleClick = async (name) => {
    const status = name;
    const feedbackData = courseData.chapters.map((chapter) => ({
      chapterId: chapter._id,
      comment: chapterComments[chapter._id] || "", 
      isChecked: checkedChapters[chapter._id] || false, 
    }));
    try {
      
      const response = await axios.put(
        `https://udemy.dev/api/admincourse/${id}`,
        { feedback: feedbackData, status }
      );
      if(response){
        if(status === "feedback"){
          toast.success("Feedback submitted successfully.");
        }else if(status === "approve"){
          toast.success("Course approved successfully.");
        }
      
      setTimeout(() => {
        window.location.reload();
      }, 2000);
     
    }
    } catch (error) {
     
      toast.error(error.response?.data?.error?.message || error.message);
      
    }
  };

 
  const isAnyChapterChecked = Object.values(checkedChapters).some((isChecked) => isChecked);

 


return (
    <Header>
      {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-screen bg-green-100" >
           
            <ReactLoading type="spinningBubbles" color="#184B4B" height={100} width={50} />
          </div>
        ) : (
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-200">
        <div className="bg-white p-8 rounded shadow-md w-3/4 mt-2 mb-2 text-center">
          <h1 className="mb-4 text-xl font-bold">View Course</h1>
          <div className="flex items-center justify-center">
            <img
              src={courseData.image?.url || ""}
              alt="course"
              className="w-3/4 object-cover rounded-lg mb-4 items-center justify-center"
            />
          </div>
          <p className="mb-2 text-left">
            <strong>Course Title:</strong> {courseData.title}
          </p>
          <p className="mb-2 text-left">
            <strong>Category:</strong> {courseData.category}
          </p>
          <p className="mb-2 text-left">
            <strong>Description:</strong> {courseData.description}
          </p>
          <p className="mb-2 text-left">
            <strong>Price:</strong> ${courseData.price}
          </p>
          <p className="mb-2 text-left mr-2">
            <strong>Status:</strong>
            <span
              className={
                courseData.status === "published"
                  ? "bg-blue-200 text-blue-700 ml-1 px-2 py-1 rounded"
                  : courseData.status === "rejected"
                  ? "bg-red-200 text-red-700 ml-1 px-2 py-1 rounded"
                  : courseData.status === "approved"
                  ? "bg-green-200 text-green-700 ml-1 px-2 py-1 rounded"
                  : ""
              }
            >
              {courseData.status}
            </span>
          </p>
        </div>

        <div className="w-3/4 mt-4">
          <h2 className="mb-4 text-lg font-bold">Chapters</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {courseData.chapters.map((chapter) => (
              <div
                key={chapter._id}
                className="border rounded-lg p-4 bg-white flex flex-col justify-center"
              >
                <h3 className="mb-2">
                  <strong>Title:</strong> {chapter.title}
                </h3>
                <p className="mb-2">
                  <strong>Description:</strong> {chapter.description}
                </p>
                <p className="mb-2">
                  <strong>Access Type:</strong> {chapter.access}
                </p>
                <p className="mb-2">
                  <strong>Status:</strong>
                  <span
              className={
                chapter.status === "published"
                  ? "bg-blue-200 text-blue-700 ml-1 px-2 py-1 rounded"
                  : chapter.status === "rejected"
                  ? "bg-red-200 text-red-700 ml-1 px-2 py-1 rounded"
                  : chapter.status === "approved"
                  ? "bg-green-200 text-green-700 ml-1 px-2 py-1 rounded"
                  : ""
              }
            >
             {chapter.status}
            </span>
                   
                </p>
                <div className="mt-2">
                <ReactPlayer
                  url={chapter.video?.url || ""}
                  controls={true}
                  width="100%"
                  height="100%"
                  config={{
                    file: {
                      attributes: {
                        onContextMenu: (e) => e.preventDefault(),
                        controlsList: "nodownload",
                      },
                    },
                  }}
                />
              </div>
                {chapter.status === "approved" ? (
                  <p className="text-green-600 font-semibold">
                    
                  </p>
                ) : (
                  <div className="mt-2 flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`chapter-${chapter._id}`}
                      checked={checkedChapters[chapter._id]}
                      onChange={() => handleCheckboxChange(chapter._id)}
                    />
                    <label
                      htmlFor={`chapter-${chapter._id}`}
                      className="text-sm font-medium leading-none"
                    >
                      Accept this chapter
                    </label>
                    <textarea
                      id={`comment-${chapter._id}`}
                      name={`comment-${chapter._id}`}
                      rows="3"
                      className="rounded-lg"
                      placeholder="Type your comment here."
                      value={chapterComments[chapter._id] || ""}
                      onChange={(e) =>
                        setChapterComments((prevState) => ({
                          ...prevState,
                          [chapter._id]: e.target.value,
                        }))
                      }
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {courseData.status === "approved" ? (
                  <p className="text-green-600 font-semibold mb-2">
                   
                  </p>
                ) : (
        <div className="flex justify-between w-3/4 mt-4 mb-2">
     <Button className="bg-green-500 hover:bg-green-700" onClick={() => handleClick("approve")} disabled={selectedChapterCount !== remaining}>
        Approve
      </Button>
      <Button className="bg-green-500 hover:bg-green-700" onClick={() => handleClick("feedback")} disabled={isAnyChapterChecked && (selectedChapterCount === remaining)}>
        Send Feedback
      </Button>
        </div>

        )}
       
      </div>
        )}
    </Header>
  );
}
