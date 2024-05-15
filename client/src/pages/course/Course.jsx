import api from "@/api/build-client";
import HomeLayout from "@/layouts/HomeLayout";
import {
  Clock,
  Globe,
  Play,
  PlayCircle,
  Star,
  Upload,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Rating from "react-rating";
import { useNavigate, useParams } from "react-router-dom";
import PageLoader from "@/components/loaders/PageLoader";

const Course = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const navigate = useNavigate();

  const fetchCourse = async () => {
    try {
      const response = await api.get("/courses/" + id);
      console.log(response.data);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  const navigateToCourse = () => {
    navigate("/videos/" + id);
  };

  if (loading)
    return (
      <div>
        <PageLoader />
      </div>
    );

  return (
    <HomeLayout>
      <div className="py-10 px-5 lg:px-60 font-istokWeb space-y-4">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-800 font-kanit">
            {data?.title}
          </h1>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={data?.image?.url}
                className="h-[400px]"
                alt={data?.title}
              />
              <div className="absolute top-0 h-full w-full bg-black/70 "></div>
              <PlayCircle
                onClick={navigateToCourse}
                className="cursor-pointer text-white size-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
          <div className="bg-white border relative pb-16 border-main rounded-lg inline-block p-5 space-y-3 font-inter">
            <div className="flex items-center font-semibold text-sm gap-2">
              <User className="h-5" />
              <span className="">Creator:</span>
              <span className="text-main">Ismail Singh</span>
            </div>
            <div className="flex items-center font-semibold text-sm gap-2">
              <Upload className="h-5" />
              <span className="">Uploaded On:</span>
              <span className="text-main">01/12/2023</span>
            </div>
            <div className="flex items-center font-semibold text-sm gap-2">
              <Clock className="h-5" />
              <span>Duration:</span>
              <span className="text-main">12hr</span>
            </div>
            <div className="flex items-center font-semibold text-sm gap-2">
              <Globe className="h-5" />
              <span>Language:</span>
              <span className="text-main">English</span>
            </div>

            <div className="absolute bottom-0 right-0 bg-[#FF4242] p-3 text-white text-bg w-24 flex justify-center">
              $125
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div>
              <Rating
                initialRating={5}
                fullSymbol={
                  <Star className="text-yellow-500 fill-yellow-500" />
                }
                emptySymbol={<Star className="text-black/20" />}
                readonly
              />
            </div>

            <Button
              variant="green"
              className="w-[200px] h-[60px] text-2xl ml-4"
            >
              Enroll Now
            </Button>
          </div>
        </div>

        <div>
          <h2 className="text-main text-2xl font-ubunutu font-bold underline mb-4">
            Details
          </h2>
          <p>{data?.description}</p>
        </div>

        <div>
          <h2 className="text-main text-2xl font-ubunutu font-bold mb-4">
            Chapters
          </h2>
          <div className="space-y-4 pl-10">
            {data?.chapters?.map((chapter, index) => (
              <div key={chapter._id}>
                <h3 className="text-lg font-semibold mb-1.5 font-inter">
                  <span className="text-black/60">Chapter {index + 1}</span> :{" "}
                  <span className="text-main">{chapter.title}</span>
                </h3>
                <p className="text-[#636262] text-[15px] leading-[20px] font-inter">
                  {chapter.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Course;
