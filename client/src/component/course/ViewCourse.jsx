import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Header from "../Header";
import toast from "react-hot-toast";
import ReactLoading from 'react-loading';
export default function ViewCourse() {
  const [courseData, setCourseData] = useState(null);
  const [checkedChapters, setCheckedChapters] = useState({});
  const [chapterComments, setChapterComments] = useState({});
  const { id } = useParams();
  // const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://udemy.dev/api/courses/${id}`);
        const { chapters } = response.data;

        // Filter out chapters with status !== 'draft'
        const filteredChapters = chapters.filter(
          (chapter) => chapter.status !== "draft"
        );

        // Set course data with filtered chapters
        setCourseData({ ...response.data, chapters: filteredChapters });

        // Initialize checkedChapters and chapterComments based on filtered chapters
        const initialCheckedChapters = {};
        const initialChapterComments = {};
        filteredChapters.forEach((chapter) => {
          initialCheckedChapters[chapter._id] = false; // Initialize all as unchecked
          initialChapterComments[chapter._id] = ""; // Initialize comments as empty strings
        });
        setCheckedChapters(initialCheckedChapters);
        setChapterComments(initialChapterComments);
        setIsLoading(false);
      } catch (error) {
        console.error("Error occurred while fetching course:", error);
      }
    };

    fetchCourse();
  }, [id]);

  const handleCheckboxChange = (chapterId) => {
    setCheckedChapters((prevState) => ({
      ...prevState,
      [chapterId]: !prevState[chapterId], // Toggle checkbox value
    }));
  };

  const isEveryChapterChecked = Object.values(checkedChapters).every(
    (isChecked) => isChecked
  );
  const isAnyChapterChecked = Object.values(checkedChapters).some(
    (isChecked) => isChecked
  );

  const handleClick = async (name) => {
    const status = name;
    const feedbackData = courseData.chapters.map((chapter) => ({
      chapterId: chapter._id,
      comment: chapterComments[chapter._id] || "", // Use empty string if comment is undefined
      isChecked: checkedChapters[chapter._id] || false, // Default to false if isChecked is undefined
    }));
    try {
      const response = await axios.put(
        `https://udemy.dev/api/admincourse/${id}`,
        { feedback: feedbackData, status }
      );
      if(response){
      toast.success("Feedback submitted successfully.");
      // toast({
      //   description: "Feedback submitted successfully.",
      // });
    }
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      toast.error(error.response?.data?.error?.message || error.message);
      // toast({
      //   description: "Failed to submit feedback. Please try again.",
      //   status: "error",
      // });
    }
  };

  if (!courseData) {
    return <div>Loading...</div>;
  }

  return (
    <Header>
      {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100" >
           
            <ReactLoading type="spinningBubbles" color="#0000FF" height={100} width={50} />
          </div>
        ) : (
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-200">
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
          <p className="mb-2 text-left">
            <strong>Status:</strong> {courseData.status}
          </p>
        </div>

        <div className="w-3/4 mt-4">
          <h2 className="mb-4 text-lg font-bold">Chapters</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {courseData.chapters.map((chapter) => (
              <div
                key={chapter._id}
                className="border rounded-lg p-4 bg-blue-100 flex flex-col justify-center"
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
                  <strong>Status:</strong> {chapter.status}
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
                {chapter.status === "approved" || chapter.status === "published" ? (
                  <p className="text-green-600 font-semibold">
                    Chapter {chapter.status}
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

        <div className="flex justify-between w-3/4 mt-4 mb-2">
          <Button
            onClick={() => handleClick("approve")}
            disabled={!isAnyChapterChecked}
          >
            Approve
          </Button>
          <Button onClick={() => handleClick("feedback")}>Send Feedback</Button>
        </div>
      </div>
        )}
    </Header>
  );
}
