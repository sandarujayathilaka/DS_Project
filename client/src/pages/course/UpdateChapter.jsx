import Title from "@/components/forms/chapter/Title";
import Description from "@/components/forms/chapter/Description";
import React, { useEffect, useState } from "react";
import Access from "@/components/forms/chapter/Access";
import Video from "@/components/forms/chapter/Video";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Eye,
  LayoutDashboard,
  Trash2,
  VideoIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog";
import InstructorLayout from "@/layouts/InstructorLayout";
import PageLoader from "@/components/loaders/PageLoader";
import api from "@/api/build-client";

const UpdateChapter = () => {
  const { courseId, chapterId } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    fetchChapterData();
  }, []);

  const fetchChapterData = () => {
    api
      .get(`/courses/${courseId}/chapters/${chapterId}`)
      .then((response) => {
        // console.log(response.data);
        setData(response.data);
        setLoading(false);
        calculateCompletedFields(response.data);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response?.data?.error?.message || error.message);
        setLoading(false);
      });
  };

  const updateStatus = (status) => {
    api
      .patch(`/courses/${courseId}/chapters/${chapterId}`, {
        status,
      })
      .then((response) => {
        fetchChapterData();
        toast.success(`Chapter ${status} successfully`);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response?.data?.error?.message || error.message);
      });
  };

  const deleteChapter = () => {
    api
      .delete(`/courses/${courseId}/chapters/${chapterId}`)
      .then((response) => {
        toast.success("Chapter deleted successfully");
        naviagteBack();
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response?.data?.error?.message || error.message);
      });
  };

  const calculateCompletedFields = (chapterData) => {
    let completedFields = 0;
    if (chapterData.title) completedFields++;
    if (chapterData.description) completedFields++;
    if (chapterData.access) completedFields++;
    if (chapterData.video && chapterData.video.url) completedFields++;
    setCompleted(completedFields);
  };

  const naviagteBack = () => {
    history.back();
  };

  return (
    <InstructorLayout>
      {loading ? (
        <PageLoader />
      ) : (
        <div className="p-4">
          <div className="space-y-5 mb-8">
            <div
              onClick={naviagteBack}
              className="flex items-center cursor-pointer gap-3 font-medium"
            >
              <ArrowLeft size={16} />
              Back to course setup
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h1 className="font-ubunutu text-4xl font-bold">
                  Chapter Setup
                </h1>
                <div>Complete all fields ({completed}/4)</div>
              </div>

              <div className="flex items-center space-x-5">
                {data?.status === "published" ? (
                  <Button onClick={() => updateStatus("unpublished")}>
                    Unpublish
                  </Button>
                ) : (
                  <Button
                    disabled={completed != 4}
                    onClick={() => updateStatus("published")}
                  >
                    Publish
                  </Button>
                )}
                <ConfirmDialog
                  trigger={
                    <Trash2
                      size={24}
                      className="cursor-pointer text-red-500 hover:text-red-600"
                    />
                  }
                  onSuccess={deleteChapter}
                  title="chapter"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 text-main rounded-full p-2">
                  <LayoutDashboard size={32} />
                </div>
                <h1 className="text-2xl text-black/70 font-semibold font-kanit">
                  Customize your course
                </h1>
              </div>
              <Title
                initialValue={data?.title}
                courseId={courseId}
                chapterId={chapterId}
                refresh={fetchChapterData}
              />
              <Description
                initialValue={data?.description}
                courseId={courseId}
                chapterId={chapterId}
                refresh={fetchChapterData}
              />
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 text-main rounded-full p-2">
                  <Eye size={32} />
                </div>
                <h1 className="text-2xl text-black/70 font-semibold font-kanit">
                  Access Settings
                </h1>
              </div>
              <Access
                initialValue={data?.access}
                courseId={courseId}
                chapterId={chapterId}
                refresh={fetchChapterData}
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 text-main rounded-full p-2">
                  <VideoIcon size={32} />
                </div>
                <h1 className="text-2xl text-black/70 font-semibold font-kanit">
                  Add a video
                </h1>
              </div>
              <Video
                initialValue={data?.video?.url}
                courseId={courseId}
                chapterId={chapterId}
                refresh={fetchChapterData}
              />
            </div>
          </div>
        </div>
      )}
    </InstructorLayout>
  );
};

export default UpdateChapter;
