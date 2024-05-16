import api from "@/api/build-client";
import CourseCard from "@/components/cards/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import HomeLayout from "@/layouts/HomeLayout";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/constants/categories";
import { Search } from "lucide-react";
import PageLoader from "@/components/loaders/PageLoader";
import toast from "react-hot-toast";

const CoursesCatalog = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await api.get("/courses?status=published");
      console.log(response.data);
      setCourses(response.data.courses);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const addToCart = async (courseId, title, price, chapters, image) => {
    try {
      const response = await api.post("/cart/addcart", {
        course: {
          courseId,
          title,
          enrollStatus: "pending",
          qty: "1",
          price: price,
          chapters: chapters,
          note: "",
          image,
        },
      });
      toast.success("Course added to cart");
    } catch (error) {
      toast.error("Course Already in the cart");
    }
  };

  if (loading)
    return (
      <div>
        <PageLoader />
      </div>
    );

  return (
    <HomeLayout>
      <div className="p-10">
        <div className="flex items-center justify-center mb-8 gap-6">
          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Search for courses"
              className="w-96"
            />

            <Button variant="green">
              <Search />
            </Button>
          </div>

          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem key="all" value="all">
                  All
                </SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 grid-cols-1">
          {courses.map((course) => (
            <CourseCard course={course} key={course._id} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </HomeLayout>
  );
};

export default CoursesCatalog;
