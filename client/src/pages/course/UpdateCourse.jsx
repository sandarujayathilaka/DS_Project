import Category from "@/components/forms/course/Category";
import Chapters from "@/components/forms/course/Chapters";
import Description from "@/components/forms/course/Description";
import Image from "@/components/forms/course/Image";
import Price from "@/components/forms/course/Price";
import Title from "@/components/forms/course/Title";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  ArrowLeft,
  CircleDollarSign,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const UpdateCourse = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    fetchCourseData();
  }, []);

  const fetchCourseData = () => {
    axios
      .get("https://udemy.dev/api/courses/" + id)
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
    axios
      .patch(`https://udemy.dev/api/courses/${id}`, {
        status,
      })
      .then((response) => {
        fetchCourseData();
        toast.success(`Course ${status} successfully`);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response?.data?.error?.message || error.message);
      });
  };

  const calculateCompletedFields = (courseData) => {
    let completedFields = 0;
    // Check each field and increment completedFields if it's completed
    if (courseData.title) completedFields++;
    if (courseData.description) completedFields++;
    if (courseData.category) completedFields++;
    if (courseData.image && courseData.image.url) completedFields++;
    if (courseData.price) completedFields++;
    if (courseData.chapters) completedFields++;
    setCompleted(completedFields);
  };

  const canPublishCourse = () => {
    if (completed !== 6) return false; // Ensure all fields are completed
    if (!data || !data.chapters) return false; // Ensure chapters data is available
    return data.chapters.some((chapter) => chapter.status === "published");
  };

  return (
    <div className="p-4">
      <div className="space-y-5 mb-8">
        <div
          onClick={() => history.back()}
          className="flex items-center cursor-pointer gap-3 font-medium"
        >
          <ArrowLeft size={16} />
          Back to courses
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="font-ubunutu text-4xl font-bold">Course Setup</h1>
            <div>Complete all fields ({completed}/6)</div>
          </div>

          {data?.status === "published" ? (
            <Button onClick={() => updateStatus("unpublished")}>
              Unpublish
            </Button>
          ) : (
            <Button
              disabled={!canPublishCourse()}
              onClick={() => updateStatus("published")}
            >
              Publish
            </Button>
          )}
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
            courseId={id}
            refresh={fetchCourseData}
          />
          <Description
            initialValue={data?.description}
            courseId={id}
            refresh={fetchCourseData}
          />
          <Category
            initialValue={data?.category}
            courseId={id}
            refresh={fetchCourseData}
          />
          <Image
            initialValue={data?.image?.url}
            courseId={id}
            refresh={fetchCourseData}
          />
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="bg-blue-50 text-main rounded-full p-2">
              <CircleDollarSign size={32} />
            </div>
            <h1 className="text-2xl text-black/70 font-semibold font-kanit">
              Sell your course
            </h1>
          </div>
          <Price
            initialValue={data?.price}
            courseId={id}
            refresh={fetchCourseData}
          />
          <div className="flex items-center gap-4">
            <div className="bg-blue-50 text-main rounded-full p-2">
              <ListChecks size={32} />
            </div>
            <h1 className="text-2xl text-black/70 font-semibold font-kanit">
              Course chapters
            </h1>
          </div>
          <Chapters
            initialValue={data?.chapters}
            courseId={id}
            refresh={fetchCourseData}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateCourse;
