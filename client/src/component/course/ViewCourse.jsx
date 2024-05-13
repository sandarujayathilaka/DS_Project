import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"
export default function ViewCourse() {
  const [courseData, setCourseData] = useState(null);
  const [checkedChapters, setCheckedChapters] = useState({});
  const [chapterComments, setChapterComments] = useState({});
  const { id } = useParams();
  const { toast } = useToast();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://udemy.dev/api/courses/${id}`);
        setCourseData(response.data);

        // Initialize checkedChapters and chapterComments based on fetched chapters
        const initialCheckedChapters = {};
        const initialChapterComments = {};
        response.data.chapters.forEach((chapter) => {
          initialCheckedChapters[chapter._id] = false; // Initialize all as unchecked
          initialChapterComments[chapter._id] = ""; // Initialize comments as empty strings
        });
        setCheckedChapters(initialCheckedChapters);
        setChapterComments(initialChapterComments);
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
    (value) => value
  );
  const isAnyChapterChecked = Object.values(checkedChapters).some(
    (value) => value
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
      toast({
        description: "Name updated successfully.",
      });
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.error
      ) {
        // Display error message from backend in a toast or alert
        toast({
          description: error.response.data.error,
          status: "error",
        });
      } else {
        // Handle generic error message
        toast({
          description: "Failed to update name. Please try again.",
          status: "error",
        });
      }
    }
    console.log("Feedback Chapters:", feedbackData, status);
    // Add logic to handle feedback
  };

  if (!courseData) {
    return <div>Loading...</div>;
  }

  return (
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
          <strong>Added Instructor:</strong> {courseData.instructorId}
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
              <div className="mb-2">
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
                <textarea id="comment" name="comment" rows="3" cols="50"
                  className="rounded-lg"
                  placeholder="Type your comment here."
                  value={chapterComments[chapter._id]}
                  onChange={(e) =>
                    setChapterComments((prevState) => ({
                      ...prevState,
                      [chapter._id]: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between w-3/4 mt-4 mb-2">
        <Button
          onClick={() => handleClick("approve")}
          disabled={!isEveryChapterChecked}
        >
          Approve
        </Button>
        <Button
          onClick={() => handleClick("feedback")}
          disabled={!isAnyChapterChecked}
        >
          Send Feedback
        </Button>
      </div>
    </div>
  );
}
