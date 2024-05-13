import api from "@/api/build-client";
import PageLoader from "@/components/loaders/PageLoader";
import { Banner } from "@/components/ui/banner";
import { Button } from "@/components/ui/button";
import CourseLayout from "@/layouts/CourseLayout";
import axios from "axios";
import { CheckCircleIcon, Lock } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";

const VideoDashboard = () => {
  const { courseId } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedChapter, setSelectedChapter] = useState();

  const isLocked = selectedChapter?.access !== "free";

  useEffect(() => {
    fetchChapterData();
  }, []);

  const fetchChapterData = () => {
    api
      .get(`/courses/${courseId}`)
      .then((response) => {
        console.log(response.data);
        const publishedChapters = response.data.chapters.filter(
          (chapter) => chapter.status === "published"
        );
        setData({ ...response.data, chapters: publishedChapters });
        setSelectedChapter(publishedChapters[0]);

        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response?.data?.error?.message || error.message);
        setLoading(false);
      });
  };

  if (loading)
    return (
      <div>
        <PageLoader />
      </div>
    );

  return (
    <CourseLayout
      course={data}
      selectedChapter={selectedChapter}
      setSelectedChapter={setSelectedChapter}
    >
      {isLocked && (
        <Banner label="You need to purchase this course to watch this chapter." />
      )}
      <div className="py-4 px-4 xl:px-40 space-y-6">
        {isLocked ? (
          <div className="w-full h-96 bg-black/80 text-white/90 flex gap-2 flex-col justify-center items-center">
            <Lock className="w-16 h-24" />
            This chapter is locked
          </div>
        ) : (
          <ReactPlayer
            url={selectedChapter?.video?.url}
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
            style={{
              border: "1px solid #ccc",
            }}
          />
        )}

        <div className="flex justify-between items-center flex-col sm:flex-row">
          <span className="text-3xl font-kanit">{selectedChapter?.title}</span>
          {isLocked ? (
            <Button className="bg-main">
              Enroll for
              {data.price && ` $${data.price}`}
            </Button>
          ) : (
            <Button className="bg-main">
              <CheckCircleIcon className="h-6 w-6 mr-2" />
              Mark as completed
            </Button>
          )}
        </div>
        <p className="text-gray-600">
          {selectedChapter?.description || "No description available"}
        </p>
      </div>
    </CourseLayout>
  );
};

export default VideoDashboard;
