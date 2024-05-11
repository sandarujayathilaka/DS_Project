import Title from "@/components/forms/chapter/Title";
import Description from "@/components/forms/chapter/Description";
import React, { useEffect, useState } from "react";
import Access from "@/components/forms/chapter/Access";
import Video from "@/components/forms/chapter/Video";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateChapter = () => {
  const { courseId, chapterId } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChapterData();
  }, []);

  const fetchChapterData = () => {
    axios
      .get(`https://udemy.dev/api/courses/${courseId}/chapters/${chapterId}`)
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
        <Access
          initialValue={data?.access}
          courseId={courseId}
          chapterId={chapterId}
          refresh={fetchChapterData}
        />
      </div>
      <div className="space-y-4">
        <Video
          initialValue={data?.video?.url}
          courseId={courseId}
          chapterId={chapterId}
          refresh={fetchChapterData}
        />
      </div>
    </div>
  );
};

export default UpdateChapter;
