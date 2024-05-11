import Category from "@/components/forms/course/Category";
import Chapters from "@/components/forms/course/Chapters";
import Description from "@/components/forms/course/Description";
import Image from "@/components/forms/course/Image";
import Price from "@/components/forms/course/Price";
import Title from "@/components/forms/course/Title";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const UpdateCourse = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourseData();
  }, []);

  const fetchCourseData = () => {
    axios
      .get("https://udemy.dev/api/courses/" + id)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response?.data?.error?.message || error.message);
        setLoading(false);
      });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="space-y-4">
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
        <Price
          initialValue={data?.price}
          courseId={id}
          refresh={fetchCourseData}
        />
        <Chapters
          initialValue={data?.chapters}
          courseId={id}
          refresh={fetchCourseData}
        />
      </div>
    </div>
  );
};

export default UpdateCourse;
